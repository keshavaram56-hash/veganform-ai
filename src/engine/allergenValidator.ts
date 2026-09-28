import { CandidateFormulation, BatchIngredient } from '../types/formulation';
import { resolveIngredient, INGREDIENT_DATABASE } from '../data/ingredientDatabase';
import { calculateNutrition } from './nutritionEngine';
import { calculateCost } from './costEngine';
import { calculateSustainability } from './sustainabilityEngine';
import { buildFunctionalSubstitutions } from './substitutionEngine';

export type AllergenType = 'Soy' | 'Gluten' | 'Nuts' | 'Dairy' | 'Egg';

/**
 * Normalizes user-specified allergen constraints into standard AllergenType keys.
 * Handles variations like: "No Soy", "Soy", "no-soy", "exclude-soy", "Gluten-Free", etc.
 */
export function normalizeAllergens(constraints: string[] = []): AllergenType[] {
  const set = new Set<AllergenType>();
  for (const c of constraints) {
    if (!c) continue;
    const lower = c.toLowerCase().trim();
    if (lower.includes('soy') || lower.includes('soya')) set.add('Soy');
    if (lower.includes('gluten') || lower.includes('wheat') || lower.includes('seitan')) set.add('Gluten');
    if (lower.includes('nut') || lower.includes('cashew') || lower.includes('almond') || lower.includes('peanut')) set.add('Nuts');
    if (lower.includes('dairy') || lower.includes('milk') || lower.includes('whey') || lower.includes('casein') || lower.includes('lactose')) set.add('Dairy');
    if (lower.includes('egg') || lower.includes('albumin') || lower.includes('yolk') || lower.includes('ovalbumin')) set.add('Egg');
  }
  return Array.from(set);
}

/**
 * Rigorously inspects an ingredient name and functional role for declared or intrinsic allergens.
 */
export function detectIngredientAllergens(name: string, functionalRole: string = ''): AllergenType[] {
  const detected = new Set<AllergenType>();
  const lower = name.toLowerCase().trim();
  const roleLower = functionalRole.toLowerCase().trim();

  // 1. Structured database record check
  const dbRecord = resolveIngredient(name);
  if (dbRecord && dbRecord.allergens) {
    for (const a of dbRecord.allergens) {
      const aLower = a.toLowerCase();
      if (aLower.includes('soy')) detected.add('Soy');
      if (aLower.includes('gluten') || aLower.includes('wheat')) detected.add('Gluten');
      if (aLower.includes('nut')) detected.add('Nuts');
      if (aLower.includes('dairy')) detected.add('Dairy');
      if (aLower.includes('egg')) detected.add('Egg');
    }
  }

  // 2. SOY keyword check
  // Matches: Soy, Soya, Edamame, Tofu, Tempeh, Shoyu, Tamari, Soy Protein, Soy Isolate, Soy Milk, Soy Flour, Soy Lecithin
  if (/\b(soy|soya|edamame|tofu|tempeh|shoyu|tamari)\b/i.test(lower) ||
      lower.includes('soy') ||
      lower.includes('soya')) {
    detected.add('Soy');
  }

  // 3. GLUTEN keyword check
  // Matches: Wheat, Gluten, Vital Wheat Gluten, Seitan, Barley, Rye, Spelt, Triticale, Semolina, Kamut, Oat Flour
  if (/\b(wheat|gluten|seitan|barley|rye|spelt|triticale|semolina)\b/i.test(lower) ||
      lower.includes('gluten') ||
      lower.includes('wheat') ||
      lower.includes('seitan') ||
      lower.includes('oat flour')) {
    detected.add('Gluten');
  }

  // 4. TREE NUTS & PEANUTS keyword check
  // Matches: Cashew, Almond, Walnut, Pecan, Pistachio, Hazelnut, Macadamia, Peanut, Brazil Nut
  // Explicitly ignore "coconut", "nutritional yeast", "butternut"
  const nutCleaned = lower
    .replace(/coconut/gi, '')
    .replace(/nutritional\s*yeast/gi, '')
    .replace(/butternut/gi, '');
  if (/\b(nut|nuts|cashew|almond|walnut|pecan|pistachio|hazelnut|macadamia|peanut|peanuts|brazil\s*nut)\b/i.test(nutCleaned) ||
      nutCleaned.includes('cashew') ||
      nutCleaned.includes('almond') ||
      nutCleaned.includes('walnut') ||
      nutCleaned.includes('peanut')) {
    detected.add('Nuts');
  }

  // 5. DAIRY keyword check
  // Matches: Dairy, Milk, Whey, Casein, Caseinate, Lactose, Bovine, Cow Milk, Cream, Butter
  // Explicitly ignore plant milks: coconut milk, oat milk, soy milk, plant milk
  const dairyCleaned = lower
    .replace(/coconut\s*milk/gi, '')
    .replace(/oat\s*milk/gi, '')
    .replace(/soy\s*milk/gi, '')
    .replace(/almond\s*milk/gi, '')
    .replace(/plant\s*milk/gi, '')
    .replace(/cashew\s*butter/gi, '')
    .replace(/cocoa\s*butter/gi, '');
  if (/\b(dairy|whey|casein|caseinate|lactose|bovine|cow\s*milk|cheese\s*curd)\b/i.test(dairyCleaned)) {
    detected.add('Dairy');
  }

  // 6. EGG keyword check
  // Matches: Egg, Egg Yolk, Egg White, Ovalbumin
  // Explicitly ignore aquafaba chickpea extract
  const eggCleaned = lower.replace(/aquafaba/gi, '');
  if (/\b(egg|eggs|ovalbumin|yolk|egg\s*white)\b/i.test(eggCleaned)) {
    detected.add('Egg');
  }

  return Array.from(detected);
}

/**
 * Standard validation function as required by requirement 9:
 * validateFormulation(candidate, constraints)
 * 
 * Returns { valid: boolean, violations: string[] }
 */
export function validateFormulation(
  candidate: CandidateFormulation,
  constraints: string[] = []
): {
  valid: boolean;
  violations: string[];
} {
  const normalizedConstraints = normalizeAllergens(constraints);
  if (normalizedConstraints.length === 0) {
    return { valid: true, violations: [] };
  }

  const violations: string[] = [];

  // 1. Inspect EVERY ingredient in batchMatrix
  if (candidate.batchMatrix && Array.isArray(candidate.batchMatrix)) {
    for (const ing of candidate.batchMatrix) {
      const ingAllergens = detectIngredientAllergens(ing.name, ing.function);
      for (const allergen of ingAllergens) {
        if (normalizedConstraints.includes(allergen)) {
          violations.push(`Ingredient '${ing.name}' violates constraint: No ${allergen}`);
        }
      }
    }
  }

  // 2. Inspect candidate baseIsolate
  if (candidate.baseIsolate) {
    const baseAllergens = detectIngredientAllergens(candidate.baseIsolate);
    for (const allergen of baseAllergens) {
      if (normalizedConstraints.includes(allergen)) {
        violations.push(`Base isolate '${candidate.baseIsolate}' violates constraint: No ${allergen}`);
      }
    }
  }

  // 3. Inspect candidate name
  if (candidate.name) {
    const nameAllergens = detectIngredientAllergens(candidate.name);
    for (const allergen of nameAllergens) {
      if (normalizedConstraints.includes(allergen)) {
        violations.push(`Candidate title '${candidate.name}' references restricted allergen: ${allergen}`);
      }
    }
  }

  // Deduplicate violations
  const uniqueViolations = Array.from(new Set(violations));

  return {
    valid: uniqueViolations.length === 0,
    violations: uniqueViolations
  };
}

/**
 * Automatically repairs an invalid formulation by substituting forbidden ingredients
 * with compatible botanical alternatives that preserve the functional role.
 */
export function repairFormulation(
  candidate: CandidateFormulation,
  constraints: string[],
  productKnowledge: any,
  costCeiling: number = 250
): CandidateFormulation | null {
  const normalized = normalizeAllergens(constraints);
  if (normalized.length === 0) return candidate;

  const initialValidation = validateFormulation(candidate, constraints);
  if (initialValidation.valid) {
    return {
      ...candidate,
      constraintCompliant: true,
      validationViolations: []
    };
  }

  const noSoy = normalized.includes('Soy');
  const noGluten = normalized.includes('Gluten');
  const noNuts = normalized.includes('Nuts');

  // Clone batchMatrix
  const repairedMatrix: BatchIngredient[] = candidate.batchMatrix.map(ing => {
    const ingAllergens = detectIngredientAllergens(ing.name, ing.function);
    const hasViolation = ingAllergens.some(a => normalized.includes(a));

    if (!hasViolation) return { ...ing };

    // Find appropriate substitute based on violating allergen and functional role
    let newName = ing.name;
    let newFunction = ing.function;

    if (ingAllergens.includes('Soy')) {
      if (ing.name.toLowerCase().includes('milk')) {
        newName = noGluten
          ? 'Coconut Milk (18% Medium Chain Lipid)'
          : 'Oat Milk (Enzymatically Hydrolyzed)';
        newFunction = 'Botanical Liquid Protein Carrier';
      } else {
        // Protein isolate / scaffold
        if (!noGluten) {
          newName = 'Pea Protein Isolate 85%';
          newFunction = 'High-Purity Botanical Protein Scaffold';
        } else {
          newName = 'Pea Protein Isolate 85%';
          newFunction = 'Allergen-Safe Protein Scaffold';
        }
      }
    } else if (ingAllergens.includes('Gluten')) {
      if (ing.name.toLowerCase().includes('flour')) {
        newName = 'Chickpea Flour (Besan)';
        newFunction = 'Gluten-Free Cohesive Grain Matrix';
      } else {
        newName = 'Pea Protein Isolate 85%';
        newFunction = 'Gluten-Free Anisotropic Protein Network';
      }
    } else if (ingAllergens.includes('Nuts')) {
      newName = 'Refined Coconut Oil';
      newFunction = 'Solid Plant Lipid (Nut-Free Colloid)';
    }

    return {
      ...ing,
      name: newName,
      function: newFunction
    };
  });

  // Consolidate duplicate ingredients if any and normalize wt% to 100
  const mergedMap = new Map<string, BatchIngredient>();
  for (const item of repairedMatrix) {
    const existing = mergedMap.get(item.name);
    if (existing) {
      existing.wtPercent = Math.round((existing.wtPercent + item.wtPercent) * 10) / 10;
      if (item.highlight) existing.highlight = true;
    } else {
      mergedMap.set(item.name, { ...item });
    }
  }

  const consolidatedMatrix = Array.from(mergedMap.values());
  const sumWeights = consolidatedMatrix.reduce((s, i) => s + i.wtPercent, 0) || 100;
  consolidatedMatrix.forEach(i => {
    i.wtPercent = Math.round((i.wtPercent / sumWeights) * 1000) / 10;
  });

  // Repair name, tagline, baseIsolate
  let repairedName = candidate.name;
  let repairedTagline = candidate.tagline;
  let repairedBaseIsolate = candidate.baseIsolate;

  if (noSoy) {
    repairedName = repairedName.replace(/soy\s*protein/gi, 'Pea Protein')
      .replace(/soy\s*milk/gi, 'Pea & Oat')
      .replace(/soy/gi, 'Botanical');
    repairedTagline = repairedTagline.replace(/soy/gi, 'pure botanical');
    repairedBaseIsolate = repairedBaseIsolate.replace(/soy\s*protein/gi, 'Pea Isolate')
      .replace(/soy/gi, 'Pea');
  }

  if (noGluten) {
    repairedName = repairedName.replace(/vital\s*wheat\s*gluten/gi, 'Pea Isolate')
      .replace(/seitan/gi, 'Botanical')
      .replace(/gluten/gi, 'Pea & Chickpea');
    repairedBaseIsolate = repairedBaseIsolate.replace(/wheat\s*gluten/gi, 'Chickpea Flour')
      .replace(/gluten/gi, 'Chickpea');
  }

  if (noNuts) {
    repairedName = repairedName
      .replace(/\bcashew\b/gi, 'Coconut')
      .replace(/\balmond\b/gi, 'Oat')
      .replace(/\bwalnut\b/gi, 'Sunflower')
      .replace(/\bpeanut\b/gi, 'Sunflower')
      .replace(/\btree\s*nuts?\b/gi, 'Seeds')
      .replace(/\bnuts?\b/gi, 'Botanical');
    repairedBaseIsolate = repairedBaseIsolate
      .replace(/\bcashew\b/gi, 'Coconut')
      .replace(/\balmond\b/gi, 'Coconut')
      .replace(/\bnuts?\b/gi, 'Seed & Botanical');
  }

  // Recalculate deterministic nutrition, cost, sustainability
  const nutrition = calculateNutrition(consolidatedMatrix, productKnowledge);
  const cost = calculateCost(consolidatedMatrix, costCeiling, productKnowledge?.benchmarks?.referenceCostPerKg || 220);
  const sustainability = calculateSustainability(consolidatedMatrix, productKnowledge?.benchmarks?.referenceCarbonKgPerKg || 12.0);
  const substitutions = buildFunctionalSubstitutions(productKnowledge, consolidatedMatrix);

  const repairedCandidate: CandidateFormulation = {
    ...candidate,
    name: repairedName,
    tagline: repairedTagline,
    baseIsolate: repairedBaseIsolate,
    batchMatrix: consolidatedMatrix,
    costPerKg: cost.costPerKg,
    caloriesKcal: nutrition.caloriesKcal,
    proteinPer100g: nutrition.proteinPer100g,
    fatPer100g: nutrition.fatPer100g,
    carbsPer100g: nutrition.carbsPer100g,
    fiberPer100g: nutrition.fiberPer100g,
    ironPer100g: nutrition.ironPer100g,
    b12Per100g: nutrition.b12Per100g,
    sustainabilityLca: sustainability.sustainabilityScore,
    carbonFootprintDelta: sustainability.carbonFootprintDelta,
    nutritionalProfile: nutrition.nutritionalProfile,
    costAllocation: cost.costAllocation,
    substitutionMap: substitutions,
    detectedAllergens: [],
    allergenWarning: undefined,
    constraintCompliant: true,
    validationViolations: []
  };

  // Final sanity verification
  const finalCheck = validateFormulation(repairedCandidate, constraints);
  if (!finalCheck.valid) {
    console.warn('[Allergen Validator] Candidate could not be repaired cleanly:', finalCheck.violations);
    return null;
  }

  return repairedCandidate;
}

/**
 * Filter and enforce hard allergen constraints on a candidate list before ranking.
 * Removes violating candidates or repairs them. Returns strictly compliant candidates.
 */
export function filterAndEnforceConstraints(
  candidates: CandidateFormulation[],
  constraints: string[] = [],
  productKnowledge: any,
  costCeiling: number = 250
): {
  compliantCandidates: CandidateFormulation[];
  removedCandidates: CandidateFormulation[];
  repairedCount: number;
} {
  const normalized = normalizeAllergens(constraints);
  if (normalized.length === 0) {
    return {
      compliantCandidates: candidates.map(c => ({
        ...c,
        constraintCompliant: true,
        validationViolations: []
      })),
      removedCandidates: [],
      repairedCount: 0
    };
  }

  const compliant: CandidateFormulation[] = [];
  const removed: CandidateFormulation[] = [];
  let repairedCount = 0;

  for (const cand of candidates) {
    const validation = validateFormulation(cand, constraints);
    if (validation.valid) {
      compliant.push({
        ...cand,
        constraintCompliant: true,
        validationViolations: []
      });
    } else {
      // Attempt repair
      const repaired = repairFormulation(cand, constraints, productKnowledge, costCeiling);
      if (repaired && validateFormulation(repaired, constraints).valid) {
        compliant.push(repaired);
        repairedCount++;
      } else {
        removed.push(cand);
      }
    }
  }

  return {
    compliantCandidates: compliant,
    removedCandidates: removed,
    repairedCount
  };
}
