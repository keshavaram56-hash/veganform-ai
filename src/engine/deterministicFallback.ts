import { CandidateFormulation, FormulationRequest } from '../types/formulation';
import { getProductKnowledge } from '../data/productKnowledge';
import { calculateNutrition } from './nutritionEngine';
import { calculateCost } from './costEngine';
import { calculateSustainability } from './sustainabilityEngine';
import { buildFunctionalSubstitutions } from './substitutionEngine';
import { calculateMultiObjectiveScore, rankFormulationCandidates } from './rankingEngine';
import { NUGGET_TEXTURE_IMAGE, CELLULAR_HERO_IMAGE } from '../data/mockData';
import { normalizeAllergens, filterAndEnforceConstraints, detectIngredientAllergens } from './allergenValidator';

/**
 * Deterministic Fallback Generator for DEMO MODE or offline / missing API key operation.
 * Guarantees zero blank screens and high-fidelity prototype formulation data.
 */
export function generateDeterministicFormulations(
  request: FormulationRequest
): {
  candidates: CandidateFormulation[];
  productAnalysis: {
    productName: string;
    category: string;
    functionalProperties: string[];
    keyAnimalDerivedComponents: string[];
  };
  isUnknownProduct: boolean;
} {
  const { record: productKnowledge, isKnown } = getProductKnowledge(request.productName);
  const normalizedConstraints = normalizeAllergens(request.allergenRestrictions || []);
  const hasSoyAllergen = normalizedConstraints.includes('Soy');
  const hasGlutenAllergen = normalizedConstraints.includes('Gluten');
  const hasNutAllergen = normalizedConstraints.includes('Nuts');
  const hasDairyAllergen = normalizedConstraints.includes('Dairy');
  const hasEggAllergen = normalizedConstraints.includes('Egg');

  // Determine candidate recipes adapted to target product and allergen constraints
  const productNameLower = request.productName.toLowerCase();

  let candidateTemplates: {
    name: string;
    code: string;
    tagline: string;
    baseIsolate: string;
    tasteMatch: number;
    textureParity: number;
    rawIngredients: { name: string; function: string; wtPercent: number; highlight?: boolean }[];
    rationales: { title: string; icon: string; description: string }[];
  }[] = [];

  if (productNameLower.includes('chicken') || productNameLower.includes('nugget') || productNameLower.includes('poultry')) {
    // CHICKEN NUGGET CANDIDATES
    const candidate1Scaffold = hasGlutenAllergen
      ? [
          { name: 'Pea Protein Isolate 85%', function: 'Primary Fibrillar Scaffold', wtPercent: 22.0, highlight: true },
          { name: 'Chickpea Flour (Besan)', function: 'Cohesive Crumb & Crisp Coating', wtPercent: 12.0 },
        ]
      : [
          { name: 'Pea Protein Isolate 85%', function: 'Primary Fibrillar Scaffold', wtPercent: 18.5, highlight: true },
          { name: 'Vital Wheat Gluten (Seitan Base)', function: 'Elastic Viscoelastic Cross-linking', wtPercent: 9.5, highlight: true },
        ];

    candidateTemplates = [
      {
        name: 'Pea Protein Crispy Nugget',
        code: 'VFA-CHK-092',
        tagline: 'Best Overall Balance • Thermomechanically texturized botanical poultry analog with clean-label hydrocolloid binder',
        baseIsolate: hasGlutenAllergen ? 'Pea + Chickpea' : 'Pea + Wheat Gluten',
        tasteMatch: Math.min(96, Math.max(78, Math.round(request.tastePriority * 0.94))),
        textureParity: Math.min(97, Math.max(80, Math.round(request.texturePriority * 0.96))),
        rawIngredients: [
          ...candidate1Scaffold,
          { name: 'Purified Hydration Water', function: 'Moisture Phase Solvent', wtPercent: 51.5 },
          { name: 'High-Oleic Sunflower Oil', function: 'Lipid Dispersion & Juiciness', wtPercent: 4.5 },
          { name: 'Refined Coconut Oil', function: 'Thermal Melt Solid Fat Mimic', wtPercent: 2.0 },
          { name: 'Shiitake & Button Mushroom Extract', function: '5\'-GMP Nucleotide Umami Synergist', wtPercent: 1.0 },
          { name: 'Methylcellulose (Thermal Gel Grade)', function: 'Thermal Gelation & Water Sealing', wtPercent: 0.8 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Saline Balance & Osmotic Modulation', wtPercent: 0.2 }
        ],
        rationales: [
          {
            title: 'Anisotropic Shear Extrusion',
            icon: 'sync_alt',
            description: 'HMEC twin-screw barrel at 145°C denatures 7S/11S legumin globulins, inducing longitudinal lamellar phase alignment that mimics poultry pectoralis major fiber bundles.'
          },
          {
            title: 'Biphasic Lipid Melting Kinetics',
            icon: 'opacity',
            description: 'Combining high-oleic sunflower oil with solid lauric coconut lipid simulates the biphasic release profile of broiler chicken adipose tissue without off-flavor tallow notes.'
          },
          {
            title: 'Nucleotide Umami Potentiation',
            icon: 'auto_awesome',
            description: 'Shiitake mushroom guanylate synergizes with free amino acids to activate human T1R1/T1R3 umami taste receptors at 8x the efficacy of isolated monosodium glutamate.'
          }
        ]
      },
      {
        name: 'Myco-Fiber Botanical Nugget',
        code: 'VFA-CHK-108',
        tagline: 'High Texture Fidelity • Whole mycelium natural branching web with zero methylcellulose additive',
        baseIsolate: 'Mycelium + Pea Isolate',
        tasteMatch: Math.min(94, Math.max(75, Math.round(request.tastePriority * 0.90))),
        textureParity: Math.min(98, Math.max(84, Math.round(request.texturePriority * 0.98))),
        rawIngredients: [
          { name: 'Young Green Jackfruit (Shredded Pulp)', function: 'Whole Fiber Striation Core', wtPercent: 18.0, highlight: true },
          { name: 'Pea Protein Isolate 85%', function: 'Protein Densification Scaffold', wtPercent: 16.0, highlight: true },
          { name: 'Potato Starch', function: 'Moisture Binder & Crisp Fry Shell', wtPercent: 5.5 },
          { name: 'Purified Hydration Water', function: 'Cellular Hydration Matrix', wtPercent: 52.0 },
          { name: 'Canola Oil (Low Erucic Acid)', function: 'Omega-3 Balanced Lipid Emulsion', wtPercent: 5.0 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Savory Broth & Vitamin B12 Fortification', wtPercent: 2.0 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Flavor Synergy', wtPercent: 1.5 }
        ],
        rationales: [
          {
            title: 'Natural Cellulosic Striations',
            icon: 'nature',
            description: 'Unripened green jackfruit fibers provide pre-existing longitudinal bundles that integrate seamlessly with hydrated pea proteins for natural bite resistance.'
          },
          {
            title: 'Starch Retrogradation Adhesion',
            icon: 'scatter_plot',
            description: 'Potato starch gelatinizes at 65°C and retrogrades into a glassy crystalline matrix during frying, generating 22 N tensile adhesion for crispy breading.'
          },
          {
            title: 'Clean-Label Hydrocolloid Elimination',
            icon: 'verified',
            description: 'Eliminates synthetic gums and modified starches by utilizing native starches and cold-milled plant binders.'
          }
        ]
      },
      {
        name: 'Economy Legume Crunch Nugget',
        code: 'VFA-CHK-074',
        tagline: 'Maximum Cost Efficiency • High-speed low-moisture extrusion blend optimized for commercial scaling',
        baseIsolate: hasSoyAllergen ? 'Chickpea + Pea' : 'Defatted Soy + Chickpea',
        tasteMatch: Math.min(90, Math.max(72, Math.round(request.tastePriority * 0.85))),
        textureParity: Math.min(89, Math.max(74, Math.round(request.texturePriority * 0.88))),
        rawIngredients: [
          hasSoyAllergen
            ? { name: 'Chickpea Flour (Besan)', function: 'Cost-Effective Flour Base', wtPercent: 20.0, highlight: true }
            : { name: 'Soy Protein Isolate 90%', function: 'High-Density Protein Scaffold', wtPercent: 18.0, highlight: true },
          { name: 'Pea Protein Isolate 85%', function: 'Secondary Protein Fortifier', wtPercent: 12.0 },
          { name: 'Corn Starch', function: 'Viscosity & Bulk Texturizer', wtPercent: 6.0 },
          { name: 'Purified Hydration Water', function: 'Hydration Carrier', wtPercent: 56.0 },
          { name: 'High-Oleic Sunflower Oil', function: 'Lipid Dispersion', wtPercent: 4.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Seasoning & Osmolality', wtPercent: 1.5 }
        ],
        rationales: [
          {
            title: 'Low-Cost Commercial Scalability',
            icon: 'trending_down',
            description: 'Engineered for high-throughput single-screw texturizers using widely available commodity botanical isolates.'
          },
          {
            title: 'Rapid Hydration Capacity',
            icon: 'water_drop',
            description: 'Pre-gelatinized flour and starch absorb 2.8x their weight in water within 90 seconds under high-shear mixing.'
          },
          {
            title: 'Maillard Crust Formation',
            icon: 'local_fire_department',
            description: 'Reducing sugars and amino acids in chickpea flour drive rapid golden-brown caramelization at 170°C frying temps.'
          }
        ]
      }
    ];
  } else if (productNameLower.includes('mozzarella') || productNameLower.includes('cheese')) {
    // MOZZARELLA CHEESE CANDIDATES
    const nutFreeLipid = hasNutAllergen
      ? { name: 'Refined Coconut Oil', function: 'Solid Fat Grate/Melt Matrix', wtPercent: 21.0, highlight: true }
      : { name: 'Raw Cashew Butter / Paste', function: 'Dairy Fat Colloid Emulsion', wtPercent: 18.0, highlight: true };

    candidateTemplates = [
      {
        name: 'Cashew & Tapioca Stretch Mozzarella',
        code: 'VFA-MOZ-201',
        tagline: 'Artisanal Neapolitan Melt • Biaxial thermoreversible curd stretch with cultured lactic profile',
        baseIsolate: hasNutAllergen ? 'Coconut + Tapioca' : 'Cashew + Tapioca',
        tasteMatch: Math.min(96, Math.max(76, Math.round(request.tastePriority * 0.95))),
        textureParity: Math.min(97, Math.max(80, Math.round(request.texturePriority * 0.96))),
        rawIngredients: [
          nutFreeLipid,
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Thermoreversible Stretch & Stringing', wtPercent: 14.5, highlight: true },
          { name: 'Potato Starch', function: 'Firm Gel Body & Melt Stability', wtPercent: 4.5 },
          { name: 'Purified Hydration Water', function: 'Moisture Phase', wtPercent: 54.0 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Cultured Lactic Umami Note', wtPercent: 2.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Lactic Saline Flavoring', wtPercent: 1.5 },
          { name: 'Calcium Carbonate & B12 Micro-Premix', function: 'Ionic Cross-linking & Mineral Fortification', wtPercent: 2.0 }
        ],
        rationales: [
          {
            title: 'Amylopectin Biaxial Stretch',
            icon: 'cable',
            description: 'Tapioca starch high amylopectin-to-amylose ratio creates continuous elastic filaments that stretch over 15cm at 65°C pizza baking temps.'
          },
          {
            title: 'Biphasic Oil Separation Control',
            icon: 'invert_colors',
            description: 'Submicron lipid droplets are encapsulated within the starch gel, preventing premature oiling-off on molten cheese surfaces.'
          },
          {
            title: 'Cultured Lactic Acidity',
            icon: 'science',
            description: 'Organic fermentation acids recreate the characteristic mild diacetyl and fresh mozzarella tang.'
          }
        ]
      },
      {
        name: hasSoyAllergen ? 'Pea & Tapioca Melt Curd' : 'Soy Milk Protein Melt Curd',
        code: 'VFA-MOZ-188',
        tagline: hasSoyAllergen
          ? 'High Protein Pizzeria Spec • Coagulated pea protein curd engineered for high-temperature deck ovens'
          : 'High Protein Pizzeria Spec • Coagulated plant protein curd engineered for high-temperature deck ovens',
        baseIsolate: hasSoyAllergen ? 'Pea Protein + Tapioca' : 'Soy Milk + Tapioca',
        tasteMatch: Math.min(92, Math.max(74, Math.round(request.tastePriority * 0.90))),
        textureParity: Math.min(94, Math.max(78, Math.round(request.texturePriority * 0.92))),
        rawIngredients: [
          hasSoyAllergen
            ? { name: 'Pea Protein Isolate 85%', function: 'Coagulated Protein Network', wtPercent: 12.0, highlight: true }
            : { name: 'Soy Milk (Whole Bean Extract)', function: 'Coagulated Protein Carrier', wtPercent: 45.0, highlight: true },
          { name: 'Refined Coconut Oil', function: 'Fat Solidification & Grating Body', wtPercent: 19.0, highlight: true },
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Melt & Elastic Stretch', wtPercent: 13.0 },
          { name: 'Purified Hydration Water', function: 'Hydration Phase', wtPercent: hasSoyAllergen ? 49.0 : 18.0 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Salt & Mineral Balance', wtPercent: 1.5 },
          { name: 'Calcium Carbonate & B12 Micro-Premix', function: 'Divalent Calcium Bridging', wtPercent: 1.5 }
        ],
        rationales: [
          {
            title: 'Thermally Induced Coagulation',
            icon: 'thermostat',
            description: 'Simulates traditional curd formation by controlled thermal and mineral gelation of botanical proteins.'
          },
          {
            title: 'Deck Oven Browning Resistance',
            icon: 'local_fire_department',
            description: 'Calibrated protein-to-sugar ratio prevents premature charring at 300°C commercial deck temperatures.'
          },
          {
            title: 'Clean Shredding Integrity',
            icon: 'grid_view',
            description: 'Chilled block firmness allows uniform shredding on industrial cheese cutters without gumming up blades.'
          }
        ]
      },
      {
        name: 'Clean Label Oat & Seed Mozzarella',
        code: 'VFA-MOZ-155',
        tagline: 'Allergen-Free Formulation • 100% nut-free, soy-free, gluten-free whole food emulsion',
        baseIsolate: 'Oat + Coconut + Chia',
        tasteMatch: Math.min(89, Math.max(70, Math.round(request.tastePriority * 0.86))),
        textureParity: Math.min(90, Math.max(74, Math.round(request.texturePriority * 0.88))),
        rawIngredients: [
          { name: 'Refined Coconut Oil', function: 'Solid Lipid Base', wtPercent: 22.0, highlight: true },
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Elastic Stretch Polymer', wtPercent: 13.5, highlight: true },
          { name: 'Chia Seed Flour / Hydrated Gel', function: 'Mucilage Binder & Fiber Network', wtPercent: 3.5 },
          { name: 'Purified Hydration Water', function: 'Continuous Water Phase', wtPercent: 56.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Dairy Saline Note', wtPercent: 1.5 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Savory Umami Depth', wtPercent: 1.5 },
          { name: 'Calcium Carbonate & B12 Micro-Premix', function: 'Mineral Fortifier', wtPercent: 1.5 }
        ],
        rationales: [
          {
            title: 'Top-9 Allergen Exclusion',
            icon: 'health_and_safety',
            description: 'Completely free from soy, nuts, gluten, and sesame while matching mainstream mozzarella melt performance.'
          },
          {
            title: 'Seed Mucilage Hydration',
            icon: 'water_drop',
            description: 'Hydrophilic chia mucilage retains up to 12x its weight in water, preventing syneresis (liquid separation) during cold storage.'
          },
          {
            title: 'Neutral Dairy Canvas',
            icon: 'clean_hands',
            description: 'Ultra-refined botanical base acts as a blank sensory canvas that adopts herbs, garlic, and tomato aromatics seamlessly.'
          }
        ]
      }
    ];
  } else if (productNameLower.includes('milk') || productNameLower.includes('dairy')) {
    // MILK CANDIDATES
    candidateTemplates = [
      {
        name: 'Whole Protein Barista Blend',
        code: 'VFA-MLK-304',
        tagline: 'Barista Master Spec • Micro-foaming capable plant milk with bovine nutritional parity',
        baseIsolate: hasSoyAllergen ? 'Oat + Pea Protein' : 'Oat + Whole Soy',
        tasteMatch: Math.min(96, Math.max(78, Math.round(request.tastePriority * 0.94))),
        textureParity: Math.min(97, Math.max(80, Math.round(request.texturePriority * 0.96))),
        rawIngredients: [
          { name: 'Oat Milk (Enzymatically Hydrolyzed)', function: 'Naturally Sweet Liquid Carrier', wtPercent: 62.0, highlight: true },
          hasSoyAllergen
            ? { name: 'Pea Protein Isolate 85%', function: 'Protein Fortification & Foam Stability', wtPercent: 3.5, highlight: true }
            : { name: 'Soy Milk (Whole Bean Extract)', function: 'Casein-Equivalent Protein Suspension', wtPercent: 28.0, highlight: true },
          { name: 'High-Oleic Sunflower Oil', function: 'Lipid Homogenization (Whole Milk Fat)', wtPercent: 3.2 },
          { name: 'Purified Hydration Water', function: 'Viscosity Balancer', wtPercent: hasSoyAllergen ? 28.5 : 4.0 },
          { name: 'Calcium Carbonate & B12 Micro-Premix', function: '120mg Ca / 100g Mineral Equivalence', wtPercent: 1.2 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Electrolyte Balance', wtPercent: 0.1 }
        ],
        rationales: [
          {
            title: 'High-Pressure Micro-Homogenization',
            icon: 'grain',
            description: 'Sub-micron fat droplets (d50 < 0.8 μm) mimic bovine milk fat globule scattering, yielding authentic dairy whiteness and mouthfeel.'
          },
          {
            title: 'Steam Foam Elastic Stability',
            icon: 'cloud',
            description: 'Soluble plant protein globulins create flexible viscoelastic membranes that stabilize 65°C espresso micro-foam without curdling.'
          },
          {
            title: 'Acidity Buffer System',
            icon: 'science',
            description: 'Dipotassium phosphate buffering prevents protein coagulation when poured into acidic light-roast specialty coffee.'
          }
        ]
      },
      {
        name: 'Creamy Cashew & Oat Elixir',
        code: 'VFA-MLK-318',
        tagline: 'Silk Creaminess • Rich whole nut and grain colloid for drinking and cereals',
        baseIsolate: hasNutAllergen ? 'Oat + Coconut' : 'Cashew + Oat',
        tasteMatch: Math.min(94, Math.max(75, Math.round(request.tastePriority * 0.91))),
        textureParity: Math.min(95, Math.max(78, Math.round(request.texturePriority * 0.93))),
        rawIngredients: [
          { name: 'Oat Milk (Enzymatically Hydrolyzed)', function: 'Liquid Sweet Base', wtPercent: 78.0, highlight: true },
          hasNutAllergen
            ? { name: 'Coconut Milk (18% Medium Chain Lipid)', function: 'Rich Lipid Creaminess', wtPercent: 12.0, highlight: true }
            : { name: 'Raw Cashew Butter / Paste', function: 'Nutrient-Dense Colloid Body', wtPercent: 7.0, highlight: true },
          { name: 'Purified Hydration Water', function: 'Dilution Phase', wtPercent: hasNutAllergen ? 8.5 : 13.5 },
          { name: 'Calcium Carbonate & B12 Micro-Premix', function: 'Micro-nutrient Fortifier', wtPercent: 1.2 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Trace Mineral Enhancer', wtPercent: 0.3 }
        ],
        rationales: [
          {
            title: 'Whole Food Milling',
            icon: 'nature',
            description: 'Colloidal wet milling suspends intact nut starches and lipids, providing natural body without added xanthan or gellan gums.'
          },
          {
            title: 'Low Glycemic Enzyme Hydrolysis',
            icon: 'biotech',
            description: 'Alpha-amylase enzyme conversion produces mild complex maltose without adding cane sugars or artificial syrups.'
          },
          {
            title: 'Clean Mouth Clearance',
            icon: 'water_drop',
            description: 'Rapid saliva clearance avoids the heavy chalky coating common in traditional plant-based milk alternatives.'
          }
        ]
      },
      {
        name: 'Pure Plant Standard 2% Milk',
        code: 'VFA-MLK-290',
        tagline: 'Daily Family Standard • Cost-optimized 2% fat milk with neutral cereal compatibility',
        baseIsolate: 'Oat Base + Canola',
        tasteMatch: Math.min(91, Math.max(72, Math.round(request.tastePriority * 0.88))),
        textureParity: Math.min(92, Math.max(75, Math.round(request.texturePriority * 0.89))),
        rawIngredients: [
          { name: 'Oat Milk (Enzymatically Hydrolyzed)', function: 'Liquid Base', wtPercent: 88.0, highlight: true },
          { name: 'Canola Oil (Low Erucic Acid)', function: '2% Reduced Fat Emulsion', wtPercent: 2.2 },
          { name: 'Pea Protein Isolate 85%', function: 'Protein Standardizer', wtPercent: 2.0 },
          { name: 'Purified Hydration Water', function: 'Process Water', wtPercent: 6.5 },
          { name: 'Calcium Carbonate & B12 Micro-Premix', function: 'Fortification Premix', wtPercent: 1.1 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Mineral Balance', wtPercent: 0.2 }
        ],
        rationales: [
          {
            title: 'High-Volume Production Efficiency',
            icon: 'factory',
            description: 'Direct continuous in-line blending and UHT aseptic sterilization at 140°C for 4 seconds ensures 12-month ambient stability.'
          },
          {
            title: 'Nutritional 1:1 Parity',
            icon: 'scale',
            description: 'Matches 2% dairy milk on protein (3.2g), fat (2.0g), calcium (125mg), and vitamin B12 (0.5mcg) per 100ml.'
          },
          {
            title: 'Ultra-Low Carbon Intensity',
            icon: 'eco',
            description: 'Emits 76% less CO2e and consumes 92% less water per liter than conventional bovine dairy farming.'
          }
        ]
      }
    ];
  } else if (productNameLower.includes('ice') || productNameLower.includes('cream') || productNameLower.includes('gelato')) {
    // ICE CREAM CANDIDATES
    const nutFreeFat = hasNutAllergen
      ? { name: 'Coconut Milk (18% Medium Chain Lipid)', function: 'Cryogenic Fat Crystal Matrix', wtPercent: 35.0, highlight: true }
      : { name: 'Raw Cashew Butter / Paste', function: 'Creamy Submicron Emulsion', wtPercent: 22.0, highlight: true };

    candidateTemplates = [
      {
        name: 'Velvet Cashew Gelato Base',
        code: 'VFA-ICR-401',
        tagline: 'Artisanal Gelato Mouthfeel • Ultra-low ice crystal diameter with luxurious thermal meltdown',
        baseIsolate: hasNutAllergen ? 'Coconut + Oat' : 'Cashew + Coconut',
        tasteMatch: Math.min(97, Math.max(80, Math.round(request.tastePriority * 0.96))),
        textureParity: Math.min(96, Math.max(80, Math.round(request.texturePriority * 0.95))),
        rawIngredients: [
          nutFreeFat,
          { name: 'Oat Milk (Enzymatically Hydrolyzed)', function: 'Freezing Depression Liquid Carrier', wtPercent: 32.0, highlight: true },
          { name: 'Refined Coconut Oil', function: 'Fat Matrix Solidification', wtPercent: 14.0 },
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Cryoprotectant & Viscosity Builder', wtPercent: 5.0 },
          { name: 'Aquafaba (Chickpea Albumin Extract)', function: 'Overrun Air Cell Stabilization', wtPercent: 4.0 },
          { name: 'Purified Hydration Water', function: 'Hydration Balance', wtPercent: hasNutAllergen ? 8.5 : 21.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Flavor Contrast & Freezing Depression', wtPercent: 0.5 }
        ],
        rationales: [
          {
            title: 'Cryoprotective Glass Transition',
            icon: 'ac_unit',
            description: 'Low-molecular-weight botanical saccharides depress freezing point to -2.8°C, preventing ice recrystallization during storage.'
          },
          {
            title: 'Micro-Air Cell Overrun Entrapment',
            icon: 'bubble_chart',
            description: 'Chickpea albumin peptides form elastic boundary layers around 30-50 micron air bubbles during churning for 60% overrun.'
          },
          {
            title: 'Smooth Thermal Meltdown',
            icon: 'water',
            description: 'Coconut medium-chain triglycerides melt at body temperature (37°C), leaving a rich velvety mouthfeel without greasy wax.'
          }
        ]
      },
      {
        name: 'Pure Coconut Custard Scoop',
        code: 'VFA-ICR-415',
        tagline: 'Dairy-Free Custard Spec • Heavy cream parity utilizing refined deodorized coconut lipid scaffolding',
        baseIsolate: 'Coconut Cream + Oat',
        tasteMatch: Math.min(93, Math.max(76, Math.round(request.tastePriority * 0.91))),
        textureParity: Math.min(94, Math.max(78, Math.round(request.texturePriority * 0.92))),
        rawIngredients: [
          { name: 'Coconut Milk (18% Medium Chain Lipid)', function: 'Heavy Cream Equivalent', wtPercent: 42.0, highlight: true },
          { name: 'Oat Milk (Enzymatically Hydrolyzed)', function: 'Liquid Phase Base', wtPercent: 34.0, highlight: true },
          { name: 'Refined Coconut Oil', function: 'Hard Fat Structure', wtPercent: 12.0 },
          { name: 'Corn Starch', function: 'Pudding-Like Custard Viscosity', wtPercent: 4.0 },
          { name: 'Purified Hydration Water', function: 'Process Water', wtPercent: 7.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Flavor Balancer', wtPercent: 0.5 }
        ],
        rationales: [
          {
            title: 'Fat Partial Coalescence',
            icon: 'grain',
            description: 'Controlled shearing during freezing induces partial agglomeration of coconut fat globule crystals, providing structural resistance.'
          },
          {
            title: 'Zero Syneresis Freeze-Thaw',
            icon: 'shield',
            description: 'Gelatinized corn starch traps unfreezable water molecules, eliminating puddle separation upon room-temperature melting.'
          },
          {
            title: 'Deodorized Lipid Technology',
            icon: 'air',
            description: 'Multi-stage steam distillation strips volatile lactones and aldehydes, providing a 100% neutral dairy canvas.'
          }
        ]
      },
      {
        name: 'Protein Soft-Serve Plant Swirl',
        code: 'VFA-ICR-380',
        tagline: 'High Protein / Lower Sugar • Soft-serve formulation with 8g plant protein per serving',
        baseIsolate: 'Pea Isolate + Oat',
        tasteMatch: Math.min(88, Math.max(70, Math.round(request.tastePriority * 0.85))),
        textureParity: Math.min(91, Math.max(74, Math.round(request.texturePriority * 0.88))),
        rawIngredients: [
          { name: 'Oat Milk (Enzymatically Hydrolyzed)', function: 'Liquid Base', wtPercent: 52.0, highlight: true },
          { name: 'Pea Protein Isolate 85%', function: 'Protein Densification (8g/serving)', wtPercent: 9.5, highlight: true },
          { name: 'High-Oleic Sunflower Oil', function: 'Creamy Liquid Lipid', wtPercent: 8.0 },
          { name: 'Refined Coconut Oil', function: 'Freezing Crystal Backbone', wtPercent: 6.0 },
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Soft-Serve Elastic Flow', wtPercent: 3.5 },
          { name: 'Purified Hydration Water', function: 'Hydration Carrier', wtPercent: 20.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Flavor Polisher', wtPercent: 0.5 }
        ],
        rationales: [
          {
            title: 'Micro-Fluidized Protein Suspension',
            icon: 'motion_photos_on',
            description: 'Micro-fluidization breaks pea protein aggregates below 5 microns, eliminating chalky tongue friction.'
          },
          {
            title: 'Continuous Soft-Serve Extrusion',
            icon: 'reorder',
            description: 'Maintains ideal viscosity at -7°C barrel dispensing temperature for ribbon-like swirl patterns.'
          },
          {
            title: 'Balanced Macro Nutrition',
            icon: 'fitness_center',
            description: 'Delivers 2.5x the protein and 40% less saturated fat than standard dairy commercial soft-serve.'
          }
        ]
      }
    ];
  } else if (productNameLower.includes('egg') || productNameLower.includes('scramble') || productNameLower.includes('omelet')) {
    // EGG CANDIDATES
    candidateTemplates = [
      {
        name: 'Chickpea & Aquafaba Scramble Matrix',
        code: 'VFA-EGG-502',
        tagline: 'Curd & Scramble Master • Thermally co-gelled plant albumin with moist fluffy curd structure',
        baseIsolate: 'Chickpea + Aquafaba',
        tasteMatch: Math.min(95, Math.max(76, Math.round(request.tastePriority * 0.94))),
        textureParity: Math.min(96, Math.max(78, Math.round(request.texturePriority * 0.95))),
        rawIngredients: [
          { name: 'Chickpea Flour (Besan)', function: 'Coagulating Protein Body (Ovalbumin Analog)', wtPercent: 22.0, highlight: true },
          { name: 'Aquafaba (Chickpea Albumin Extract)', function: 'Air Cell Aeration & Emulsification', wtPercent: 18.0, highlight: true },
          { name: 'Purified Hydration Water', function: 'Hydration Medium', wtPercent: 44.0 },
          { name: 'High-Oleic Sunflower Oil', function: 'Yolk Lipid Richness & Pan Sizzle', wtPercent: 8.0 },
          { name: 'Ground Cold-Milled Flaxseed', function: 'Lecithin-Equivalent Binding', wtPercent: 3.5 },
          { name: 'Corn Starch', function: 'Tender Curd Plasticizer', wtPercent: 2.5 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Sulfur/Savory Yolk Aroma', wtPercent: 1.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Saline Balance (Kala Namak sulfur hint)', wtPercent: 0.5 }
        ],
        rationales: [
          {
            title: 'Heat-Set Globular Gelation',
            icon: 'egg_alt',
            description: 'Chickpea globulins denature at 68°C to form delicate soft curds that replicate scrambled egg foldability.'
          },
          {
            title: 'Sulfurous Yolk Sensory Mimicry',
            icon: 'science',
            description: 'Trace mineral salts and nutritional yeast simulate cysteine sulfur volatile release during hot pan cooking.'
          },
          {
            title: 'Lecithin Emulsion Replacement',
            icon: 'merge_type',
            description: 'Cold-milled flaxseed arabinoxylans suspend dietary oil droplets into fine droplets resembling native egg yolk.'
          }
        ]
      },
      {
        name: 'Soy Protein Omelet Batter',
        code: 'VFA-EGG-518',
        tagline: 'High-Tensile Sheet Strength • Pours and flips on hot griddle like beaten whole egg',
        baseIsolate: hasSoyAllergen ? 'Pea + Chickpea' : 'Defatted Soy + Chickpea',
        tasteMatch: Math.min(92, Math.max(74, Math.round(request.tastePriority * 0.90))),
        textureParity: Math.min(94, Math.max(77, Math.round(request.texturePriority * 0.92))),
        rawIngredients: [
          hasSoyAllergen
            ? { name: 'Pea Protein Isolate 85%', function: 'Structural Protein', wtPercent: 14.0, highlight: true }
            : { name: 'Soy Protein Isolate 90%', function: 'Dense Coagulating Protein', wtPercent: 15.0, highlight: true },
          { name: 'Chickpea Flour (Besan)', function: 'Golden Crumb & Sweetness', wtPercent: 10.0 },
          { name: 'Purified Hydration Water', function: 'Liquid Phase', wtPercent: 57.0 },
          { name: 'Canola Oil (Low Erucic Acid)', function: 'Pan Lubrication & Yolk Fat', wtPercent: 9.0 },
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Pliable Sheet Extensibility', wtPercent: 3.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Savory Salt Synergy', wtPercent: 1.5 }
        ],
        rationales: [
          {
            title: 'Griddle Skin Tensile Strength',
            icon: 'layers',
            description: 'Forms a cohesive surface film within 30 seconds at 160°C that allows spatulas to flip thin crepe-like omelets.'
          },
          {
            title: 'Zero Cholesterol Formulation',
            icon: 'favorite',
            description: 'Eliminates 186mg of dietary cholesterol per 50g egg while delivering equivalent 6.3g protein.'
          },
          {
            title: 'Stable Refrigerated Shelf-Life',
            icon: 'lock_clock',
            description: 'Liquid bottle format remains homogenous for 45 days under refrigeration without microbial salmonella risk.'
          }
        ]
      },
      {
        name: 'Baking Binder & Emulsion Powder',
        code: 'VFA-EGG-480',
        tagline: 'Pastry & Baking Spec • 1:1 replacement for whole eggs in cakes, cookies, and brioche',
        baseIsolate: 'Aquafaba + Flax + Tapioca',
        tasteMatch: Math.min(91, Math.max(72, Math.round(request.tastePriority * 0.88))),
        textureParity: Math.min(93, Math.max(76, Math.round(request.texturePriority * 0.90))),
        rawIngredients: [
          { name: 'Tapioca Starch (Modified Cassava)', function: 'Cake Crumb Structure', wtPercent: 35.0, highlight: true },
          { name: 'Ground Cold-Milled Flaxseed', function: 'Fat Binding Mucilage', wtPercent: 28.0, highlight: true },
          { name: 'Aquafaba (Chickpea Albumin Extract)', function: 'Leavening & Foam Retention', wtPercent: 22.0 },
          { name: 'Potato Starch', function: 'High Moisture Gelation', wtPercent: 12.0 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Baking Mineral Balancer', wtPercent: 3.0 }
        ],
        rationales: [
          {
            title: 'Oven Rise Steam Expansion',
            icon: 'expand',
            description: 'Entrapped chickpea saponins stretch with thermal steam expansion, yielding light spongy crumb in baked goods.'
          },
          {
            title: 'Shelf-Stable Dry Blend',
            icon: 'inventory_2',
            description: 'Dehydrated powder activates instantly when whisked with 3 parts water, replacing raw shell eggs in bakeries.'
          },
          {
            title: 'Maillard Browning Precursor',
            icon: 'flare',
            description: 'Enriched with plant amino groups that brown pastry crusts to deep golden hues under oven heat.'
          }
        ]
      }
    ];
  } else if (productNameLower.includes('mayo') || productNameLower.includes('mayonnaise')) {
    // MAYONNAISE CANDIDATES
    candidateTemplates = [
      {
        name: 'Aquafaba Silk Emulsion Mayo',
        code: 'VFA-MYO-601',
        tagline: 'Classic Delicatessen Standard • Yield stress and creamy spoon-cut matching real egg yolk mayonnaise',
        baseIsolate: 'Aquafaba + High-Oleic Sunflower',
        tasteMatch: Math.min(97, Math.max(82, Math.round(request.tastePriority * 0.97))),
        textureParity: Math.min(98, Math.max(84, Math.round(request.texturePriority * 0.98))),
        rawIngredients: [
          { name: 'High-Oleic Sunflower Oil', function: 'Continuous Oil Droplet Phase (68%)', wtPercent: 68.0, highlight: true },
          { name: 'Aquafaba (Chickpea Albumin Extract)', function: 'Interfacial Emulsifier (Egg Yolk Substitute)', wtPercent: 14.0, highlight: true },
          { name: 'Purified Hydration Water', function: 'Continuous Water Phase', wtPercent: 12.5 },
          { name: 'Potato Starch', function: 'Droplet Packing Stabilizer', wtPercent: 2.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Vinegar, Mustard & Saline Balance', wtPercent: 2.5 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Rich Savory Depth', wtPercent: 0.5 }
        ],
        rationales: [
          {
            title: 'High Internal Phase Droplet Packing',
            icon: 'blur_on',
            description: 'Rotor-stator homogenization shears oil droplets to 3.2 microns, forming a close-packed viscoelastic gel with 48 Pa yield stress.'
          },
          {
            title: 'Amphiphilic Peptide Stabilization',
            icon: 'shield',
            description: 'Aquafaba proteins orient at the oil-water interface, lowering interfacial tension to 8.4 mN/m and resisting creaming.'
          },
          {
            title: 'Tangy Lactic / Acetic Equilibrium',
            icon: 'taste',
            description: 'Calibrated acidity (pH 3.6) preserves safety and delivers the clean culinary snap expected from deli mayonnaise.'
          }
        ]
      },
      {
        name: 'Light Canola & Flax Cold-Press Mayo',
        code: 'VFA-MYO-615',
        tagline: 'Heart-Healthy Spec • 40% reduced fat with cold-milled plant mucilage body',
        baseIsolate: 'Canola + Flaxseed Mucilage',
        tasteMatch: Math.min(93, Math.max(75, Math.round(request.tastePriority * 0.91))),
        textureParity: Math.min(94, Math.max(77, Math.round(request.texturePriority * 0.93))),
        rawIngredients: [
          { name: 'Canola Oil (Low Erucic Acid)', function: 'Omega-3 Rich Lipid Dispersion', wtPercent: 45.0, highlight: true },
          { name: 'Purified Hydration Water', function: 'Continuous Phase', wtPercent: 37.0 },
          { name: 'Ground Cold-Milled Flaxseed', function: 'Viscoelastic Hydrocolloid Emulsifier', wtPercent: 6.0, highlight: true },
          { name: 'Potato Starch', function: 'Creamy Spoon Body', wtPercent: 5.5 },
          { name: 'Aquafaba (Chickpea Albumin Extract)', function: 'Fine Droplet Surface Active Agent', wtPercent: 4.0 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Flavor & Acidity Balance', wtPercent: 2.5 }
        ],
        rationales: [
          {
            title: 'Non-Newtonian Shear Thinning',
            icon: 'speed',
            description: 'Flax arabinoxylans provide high apparent viscosity at rest on a knife, but thin instantly upon spreading across bread.'
          },
          {
            title: '40% Lower Caloric Density',
            icon: 'monitor_weight',
            description: 'Traps water within a swollen starch matrix, achieving mayonnaise spreadability with only 420 kcal/100g.'
          },
          {
            title: 'Omega-3 Fatty Acid Fortification',
            icon: 'favorite_border',
            description: 'Supplies 1.8g plant ALA omega-3 per 15g serving from native cold-pressed canola and golden flaxseed.'
          }
        ]
      },
      {
        name: 'Commercial Foodservice Aioli Base',
        code: 'VFA-MYO-590',
        tagline: 'High Thermal Stability • Resistant to heat breakdown on hot burgers and paninis',
        baseIsolate: 'High-Oleic Sunflower + Starch Binder',
        tasteMatch: Math.min(91, Math.max(72, Math.round(request.tastePriority * 0.88))),
        textureParity: Math.min(92, Math.max(75, Math.round(request.texturePriority * 0.90))),
        rawIngredients: [
          { name: 'High-Oleic Sunflower Oil', function: 'Thermal Stable Lipid', wtPercent: 62.0, highlight: true },
          { name: 'Purified Hydration Water', function: 'Water Matrix', wtPercent: 21.0 },
          { name: 'Aquafaba (Chickpea Albumin Extract)', function: 'Primary Emulsifier', wtPercent: 9.0 },
          { name: 'Corn Starch', function: 'Thermal Resistance Binder', wtPercent: 5.0 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Seasoning & Garlic Note', wtPercent: 3.0 }
        ],
        rationales: [
          {
            title: 'Thermal Breakdown Resistance',
            icon: 'whatshot',
            description: 'Will not separate into clear grease when spread on 85°C burger patties fresh off the grill.'
          },
          {
            title: 'High-Speed Dispenser Compatibility',
            icon: 'dispenser',
            description: 'Engineered for commercial pump dispensers and squeeze bottles with zero nozzle clogging or crusting.'
          },
          {
            title: 'Cost-Effective Volume Scaling',
            icon: 'currency_rupee',
            description: 'Substantially lower unit production cost than egg-based commercial mayonnaise.'
          }
        ]
      }
    ];
  } else {
    // UNKNOWN / CUSTOM PRODUCT
    candidateTemplates = [
      {
        name: `Precision ${request.productName} Analog A-1`,
        code: `VFA-GEN-01`,
        tagline: `Biochemical Scaffold Formulation • Calibrated for ${request.productName} functional bio-parity`,
        baseIsolate: hasSoyAllergen ? 'Pea Protein + Whole Botanical' : 'Pea + Soy Protein',
        tasteMatch: Math.min(93, Math.max(75, Math.round(request.tastePriority * 0.92))),
        textureParity: Math.min(94, Math.max(76, Math.round(request.texturePriority * 0.93))),
        rawIngredients: [
          { name: 'Pea Protein Isolate 85%', function: 'Primary Protein Scaffold', wtPercent: 24.0, highlight: true },
          hasSoyAllergen
            ? { name: 'Chickpea Flour (Besan)', function: 'Cohesive Binder', wtPercent: 12.0 }
            : { name: 'Soy Protein Isolate 90%', function: 'Secondary Fibril Network', wtPercent: 10.0 },
          { name: 'Purified Hydration Water', function: 'Moisture Phase', wtPercent: 51.0 },
          { name: 'Refined Coconut Oil', function: 'Solid Lipid Phase', wtPercent: 5.5 },
          { name: 'High-Oleic Sunflower Oil', function: 'Fluid Lipid Emulsion', wtPercent: 3.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Mineral & Flavor Matrix', wtPercent: 2.0 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Savory Umami Backbone', wtPercent: 2.0 }
        ],
        rationales: [
          {
            title: 'Conceptual Functional Mapping',
            icon: 'psychology',
            description: `Identified primary cellular and lipid functions of ${request.productName} and matched against high-purity botanical biopolymers.`
          },
          {
            title: 'Thermomechanical Stabilization',
            icon: 'tune',
            description: 'Balances cohesive protein interactions with plasticizing moisture to replicate the target mouthfeel.'
          },
          {
            title: 'Preliminary R&D Blueprint',
            icon: 'science',
            description: 'Serves as an exploratory simulation model. Wet-lab rheological verification recommended.'
          }
        ]
      },
      {
        name: `Artisanal Whole Botanical ${request.productName} B-2`,
        code: `VFA-GEN-02`,
        tagline: `Clean-Label Formulation • Focused on natural fiber texture with zero artificial binders`,
        baseIsolate: 'Whole Botanical Blend',
        tasteMatch: Math.min(90, Math.max(72, Math.round(request.tastePriority * 0.88))),
        textureParity: Math.min(91, Math.max(74, Math.round(request.texturePriority * 0.89))),
        rawIngredients: [
          { name: 'Young Green Jackfruit (Shredded Pulp)', function: 'Natural Fiber Striation', wtPercent: 26.0, highlight: true },
          { name: 'Pea Protein Isolate 85%', function: 'Protein Densification', wtPercent: 16.0, highlight: true },
          { name: 'Purified Hydration Water', function: 'Hydration Phase', wtPercent: 44.0 },
          { name: 'High-Oleic Sunflower Oil', function: 'Lipid Lubrication', wtPercent: 6.0 },
          { name: 'Potato Starch', function: 'Moisture Sealing Binder', wtPercent: 4.5 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Flavor Balancer', wtPercent: 2.0 },
          { name: 'Shiitake & Button Mushroom Extract', function: 'Natural Umami Booster', wtPercent: 1.5 }
        ],
        rationales: [
          {
            title: 'Whole Plant Fiber Synergy',
            icon: 'spa',
            description: 'Leverages intact vegetable macrostructures to simulate natural chew and cutting resistance.'
          },
          {
            title: 'Clean Sensory Profile',
            icon: 'clean_hands',
            description: 'Minimizes off-flavors by selecting neutralized botanical cultivars.'
          },
          {
            title: 'Sustainable Ingredient Sourcing',
            icon: 'eco',
            description: 'Prioritizes upcycled agricultural fibers with verified low water footprints.'
          }
        ]
      },
      {
        name: `Value Scaled ${request.productName} C-3`,
        code: `VFA-GEN-03`,
        tagline: `Industrial Scale Prototype • Cost-effective raw material blend designed for commercial extrusion`,
        baseIsolate: hasGlutenAllergen ? 'Chickpea Flour' : 'Wheat Gluten + Flour',
        tasteMatch: Math.min(88, Math.max(70, Math.round(request.tastePriority * 0.85))),
        textureParity: Math.min(89, Math.max(71, Math.round(request.texturePriority * 0.86))),
        rawIngredients: [
          hasGlutenAllergen
            ? { name: 'Chickpea Flour (Besan)', function: 'Primary Flour Matrix', wtPercent: 25.0, highlight: true }
            : { name: 'Vital Wheat Gluten (Seitan Base)', function: 'Elastic Protein Chew', wtPercent: 18.0, highlight: true },
          { name: 'Oat Flour (De-hulled Whole Oat)', function: 'Crumb Softness & Body', wtPercent: 12.0 },
          { name: 'Purified Hydration Water', function: 'Solvent & Hydration', wtPercent: 52.0 },
          { name: 'Canola Oil (Low Erucic Acid)', function: 'Cost-Effective Lipid', wtPercent: 6.0 },
          { name: 'Corn Starch', function: 'Starch Thickener', wtPercent: 4.0 },
          { name: 'Sea Salt & Natural Flavor Synergy', function: 'Seasoning', wtPercent: 2.0 },
          { name: 'Nutritional Yeast (Fortified Flakes)', function: 'Flavor Enhancer', wtPercent: 1.0 }
        ],
        rationales: [
          {
            title: 'Economical Raw Material Cost',
            icon: 'payments',
            description: 'Built around scalable agricultural grains and starches to keep raw material costs under commercial targets.'
          },
          {
            title: 'High Extrusion Throughput',
            icon: 'precision_manufacturing',
            description: 'Flow properties tuned for high-shear twin-screw extruders operating at 400 kg/hr pilot capacity.'
          },
          {
            title: 'Versatile Culinary Behavior',
            icon: 'restaurant',
            description: 'Tolerates varied domestic preparation methods including pan-searing, boiling, and deep-frying.'
          }
        ]
      }
    ];
  }

  // Calculate deterministic properties for each candidate
  const evaluatedCandidates: CandidateFormulation[] = candidateTemplates.map((template, idx) => {
    const nutrition = calculateNutrition(template.rawIngredients, productKnowledge);
    const cost = calculateCost(template.rawIngredients, request.costCeiling, productKnowledge.benchmarks.referenceCostPerKg);
    const sustainability = calculateSustainability(template.rawIngredients, productKnowledge.benchmarks.referenceCarbonKgPerKg);
    const substitutions = buildFunctionalSubstitutions(productKnowledge, template.rawIngredients);

    // Nutrition density score (0-100) based on protein target proximity
    const targetProtein = request.proteinTarget || productKnowledge.benchmarks.proteinPer100g || 18;
    const proteinRatio = Math.min(1.2, nutrition.proteinPer100g / (targetProtein || 1));
    const nutritionDensity = Math.min(99, Math.max(70, Math.round(proteinRatio * 85 + (nutrition.fiberPer100g > 2 ? 10 : 0))));

    // Cost efficiency score (0-100) based on distance under cost ceiling
    const costRatio = Math.max(0.4, Math.min(1.5, cost.costPerKg / (request.costCeiling || 250)));
    const costEfficiency = Math.min(99, Math.max(60, Math.round((1.5 - costRatio) * 70 + 30)));

    const weights = {
      tasteWeight: request.tastePriority,
      textureWeight: request.texturePriority,
      nutritionWeight: request.nutritionPriority,
      costWeight: request.costPriority,
      sustainabilityWeight: request.sustainabilityPriority
    };

    const scoreBreakdown = calculateMultiObjectiveScore(
      {
        tasteMatch: template.tasteMatch,
        textureParity: template.textureParity,
        nutritionDensity,
        costEfficiency,
        sustainabilityLca: sustainability.sustainabilityScore
      },
      weights
    );

    // Sensory metrics
    const flavorChemistry = [
      { name: 'Volatile Umami Intensity', value: template.tasteMatch, targetLabel: 'Target 90%' },
      { name: 'Lipid Salivary Lubrication', value: Math.min(98, template.tasteMatch + 2), targetLabel: 'Target 92%' },
      { name: 'Off-Flavor Masking Index', value: 94, targetLabel: 'Target 90%' },
      { name: 'Sweet/Saline Balance', value: 91, targetLabel: 'Target 88%' }
    ];

    const rheologyTexture = [
      { name: 'Warner-Bratzler Cut Resistance', value: template.textureParity, targetLabel: '18.2 N Control' },
      { name: 'Anisotropic Fiber Alignment (λ)', value: Math.min(98, template.textureParity + 1), targetLabel: 'λ = 0.74 Target' },
      { name: 'Moisture Retention on Cooking', value: 92, targetLabel: '54% Target' },
      { name: 'Elastic Recovery After Chew', value: 89, targetLabel: '88% Target' }
    ];

    // Allergen detection
    const detectedAllergens: string[] = [];
    template.rawIngredients.forEach(ing => {
      const ingAllergens = detectIngredientAllergens(ing.name, ing.function);
      ingAllergens.forEach(allg => {
        if (!detectedAllergens.includes(allg)) detectedAllergens.push(allg);
      });
    });

    const allergenWarning = detectedAllergens.length > 0
      ? `Contains declared allergen: ${detectedAllergens.join(', ')}`
      : undefined;

    return {
      id: `candidate-${idx + 1}`,
      code: template.code,
      name: template.name,
      tagline: template.tagline,
      rank: idx + 1,
      rankBadge: `RANK #${idx + 1}`,
      rankBadgeColor: idx === 0 ? 'bg-primary text-black' : 'bg-[#18241e] text-[#8da396]',
      aiScore: scoreBreakdown.overallScore,
      qScore: scoreBreakdown.overallScore,
      costPerKg: cost.costPerKg,
      currencySymbol: cost.currencySymbol,
      proteinPer100g: nutrition.proteinPer100g,
      baseIsolate: template.baseIsolate,
      sustainabilityLca: sustainability.sustainabilityScore,
      tasteMatch: template.tasteMatch,
      textureParity: template.textureParity,
      nutritionDensity,
      costEfficiency,
      carbonFootprintDelta: sustainability.carbonFootprintDelta,
      functionalParity: Math.round((template.tasteMatch + template.textureParity) / 2),
      tasteDescriptor: template.tasteMatch > 90 ? 'High Umami Parity' : 'Mild Savory',
      textureDescriptor: template.textureParity > 90 ? 'Anisotropic Fibrous Bite' : 'Cohesive Tender Chew',
      caloriesKcal: nutrition.caloriesKcal,
      fatPer100g: nutrition.fatPer100g,
      carbsPer100g: nutrition.carbsPer100g,
      fiberPer100g: nutrition.fiberPer100g,
      ironPer100g: nutrition.ironPer100g,
      b12Per100g: nutrition.b12Per100g,
      crossSectionTextureImage: idx === 0 ? NUGGET_TEXTURE_IMAGE : CELLULAR_HERO_IMAGE,
      cellularMatchPercent: Math.min(99, Math.round((template.tasteMatch + template.textureParity) / 2 * 1.02)),

      detectedAllergens,
      allergenWarning,
      isLimitedCoverage: !isKnown,
      coverageNote: !isKnown ? 'Limited knowledge-base coverage — Physical laboratory validation is strictly required.' : undefined,

      batchMatrix: template.rawIngredients,
      substitutionMap: substitutions,
      nutritionalProfile: nutrition.nutritionalProfile,
      costAllocation: cost.costAllocation,
      flavorChemistry,
      rheologyTexture,
      aiRationales: template.rationales,
      processingDirectives: {
        technology: request.extrusionTech === 'spinning' ? 'Wet Fiber Spinning' : request.extrusionTech === 'bioprint' ? 'Multi-Nozzle 3D Food Printing' : 'HMEC Twin-Screw High-Moisture Extrusion',
        temperatures: [
          { zone: 'Zone 1 (Feeding)', temp: '48°C', note: 'Dry blend hydration' },
          { zone: 'Zone 2 (Conveying)', temp: '92°C', note: 'Pre-gelatinization' },
          { zone: 'Zone 3 (Melting)', temp: '138°C', note: 'Protein denaturation' },
          { zone: 'Zone 4 (Shearing)', temp: '152°C', note: 'Fibril formation' },
          { zone: 'Cooling Die', temp: '62°C', note: 'Anisotropic matrix fixation' }
        ],
        screwSpeedRpm: 320,
        smeEnergyKjKg: 112,
        diePressureMpa: 2.2
      }
    };
  });

  // Enforce hard allergen constraints BEFORE ranking (Requirements 2, 3, 4, 5, 8)
  const { compliantCandidates } = filterAndEnforceConstraints(
    evaluatedCandidates,
    request.allergenRestrictions,
    productKnowledge,
    request.costCeiling
  );

  // Re-rank using user weights
  const ranked = rankFormulationCandidates(compliantCandidates, {
    tasteWeight: request.tastePriority,
    textureWeight: request.texturePriority,
    nutritionWeight: request.nutritionPriority,
    costWeight: request.costPriority,
    sustainabilityWeight: request.sustainabilityPriority
  });

  return {
    candidates: ranked.slice(0, 3), // Return top 3 compliant formulations
    productAnalysis: {
      productName: productKnowledge.name,
      category: productKnowledge.category,
      functionalProperties: productKnowledge.functionalProperties,
      keyAnimalDerivedComponents: productKnowledge.keyAnimalDerivedComponents
    },
    isUnknownProduct: !isKnown
  };
}
