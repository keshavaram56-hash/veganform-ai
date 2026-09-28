import { CandidateFormulation, FormulationRequest } from '../types/formulation';
import { generateDeterministicFormulations } from './deterministicFallback';

export interface FormulationResponse {
  candidates: CandidateFormulation[];
  productAnalysis: {
    productName: string;
    category: string;
    functionalProperties: string[];
    keyAnimalDerivedComponents: string[];
  };
  isUnknownProduct: boolean;
  engineTelemetry: {
    isDemoFallback: boolean;
    processingTimeMs: number;
    modelUsed: string;
  };
}

export const SIMULATION_STEPS = [
  'ANALYZING TARGET PRODUCT',
  'IDENTIFYING FUNCTIONAL INGREDIENTS',
  'OPTIMIZING FORMULATION',
  'CHECKING CONSTRAINTS',
  'CALCULATING NUTRITION',
  'ESTIMATING COST',
  'ANALYZING SUSTAINABILITY',
  'RANKING CANDIDATES'
];

/**
 * Standard formulation service interface:
 * generateFormulations(product, requirements)
 * 
 * Accepts the user's animal-based product (string or FormulationRequest)
 * and optional constraints/priorities, returns structured candidate formulations.
 */
export async function generateFormulations(
  product: string | FormulationRequest,
  requirements?: Partial<FormulationRequest>
): Promise<CandidateFormulation[]> {
  const req: FormulationRequest = typeof product === 'string'
    ? {
        productName: product,
        tastePriority: requirements?.tastePriority ?? 94,
        texturePriority: requirements?.texturePriority ?? 96,
        nutritionPriority: requirements?.nutritionPriority ?? 88,
        costPriority: requirements?.costPriority ?? 76,
        sustainabilityPriority: requirements?.sustainabilityPriority ?? 85,
        costCeiling: requirements?.costCeiling ?? 250,
        proteinTarget: requirements?.proteinTarget ?? 18,
        allergenRestrictions: requirements?.allergenRestrictions ?? [],
        additionalRequirements: requirements?.additionalRequirements ?? '',
        primaryBase: requirements?.primaryBase ?? 'pea',
        extrusionTech: requirements?.extrusionTech ?? 'hmec'
      }
    : {
        ...product,
        ...requirements
      };

  const response = await requestFormulation(req);
  return response.candidates;
}

/**
 * Full formulation request with progress step notifications for UI animations
 */
export async function requestFormulation(
  request: FormulationRequest,
  onStepProgress?: (step: string, index: number, total: number) => void
): Promise<FormulationResponse> {
  const startTime = performance.now();

  // Run visual step transitions smoothly for user feedback
  const stepInterval = 280; // ms per step
  let currentStepIdx = 0;

  const timer = setInterval(() => {
    if (currentStepIdx < SIMULATION_STEPS.length) {
      onStepProgress?.(SIMULATION_STEPS[currentStepIdx], currentStepIdx + 1, SIMULATION_STEPS.length);
      currentStepIdx++;
    }
  }, stepInterval);

  try {
    // Call server-side Express proxy which executes Gemini reasoning
    const response = await fetch('/api/formulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    clearInterval(timer);
    
    // Ensure all steps played
    onStepProgress?.(SIMULATION_STEPS[SIMULATION_STEPS.length - 1], SIMULATION_STEPS.length, SIMULATION_STEPS.length);

    return {
      candidates: data.candidates || [],
      productAnalysis: data.productAnalysis || {
        productName: request.productName,
        category: 'Food Matrix',
        functionalProperties: [],
        keyAnimalDerivedComponents: []
      },
      isUnknownProduct: Boolean(data.isUnknownProduct),
      engineTelemetry: {
        isDemoFallback: Boolean(data.isDemoFallback),
        processingTimeMs: Math.round(performance.now() - startTime),
        modelUsed: data.modelUsed || 'gemini-2.5-flash'
      }
    };
  } catch (err) {
    // Graceful fallback to deterministic engine (demo mode / offline / rate-limited)
    console.warn('[VeganForm AI] API route /api/formulate unavailable or error occurred, using deterministic demo engine:', err);
    
    // Allow brief time for user to see the simulation steps
    await new Promise(resolve => setTimeout(resolve, Math.max(1200, SIMULATION_STEPS.length * stepInterval - (currentStepIdx * stepInterval))));
    clearInterval(timer);

    const fallbackResult = generateDeterministicFormulations(request);

    return {
      candidates: fallbackResult.candidates,
      productAnalysis: fallbackResult.productAnalysis,
      isUnknownProduct: fallbackResult.isUnknownProduct,
      engineTelemetry: {
        isDemoFallback: true,
        processingTimeMs: Math.round(performance.now() - startTime),
        modelUsed: 'deterministic-demo-engine'
      }
    };
  }
}
