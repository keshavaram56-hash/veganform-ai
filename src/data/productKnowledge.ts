import { ProductKnowledgeRecord } from '../types/formulation';

export const PRODUCT_KNOWLEDGE_BASE: Record<string, ProductKnowledgeRecord> = {
  'chicken-nugget': {
    name: 'Chicken Nugget',
    category: 'Poultry Emulsion Matrix',
    functionalProperties: [
      'Oriented fibrillar actomyosin protein network (shear alignment)',
      'Water-holding capacity (54% internal moisture)',
      'Juiciness from dispersed intramuscular lipid droplets',
      'Cohesive thermal gelation upon heating (>68°C)',
      'Savory, brothy, pyrazine-driven umami flavor'
    ],
    keyAnimalDerivedComponents: [
      'Myofibrillar actin & myosin (muscle fibers)',
      'Intramuscular animal fat (tallow/poultry lipid)',
      'Connective collagen matrix',
      'Albumin / batter binder'
    ],
    benchmarks: {
      proteinPer100g: 18.2,
      caloriesPer100g: 225,
      fatPer100g: 13.5,
      carbsPer100g: 7.8,
      fiberPer100g: 0.8,
      ironPer100g: 1.1,
      b12Per100g: 0.35,
      waterContentPercent: 54,
      referenceCarbonKgPerKg: 6.8, // kg CO2e / kg broiler chicken
      referenceCostPerKg: 240
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Myofibrillar actomyosin muscle fibers',
        functionalRole: 'Fibrillar scaffold & tensile cutting chew',
        suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Vital Wheat Gluten', 'Young Green Jackfruit'],
        mechanisticReasoning: 'High-moisture extrusion (HMEC) uncoils globular pea globulins and glutenin chains into parallel longitudinal fibers with Warner-Bratzler shear resistance matching breast meat.'
      },
      {
        animalComponent: 'Animal intramuscular fat droplets',
        functionalRole: 'Thermal melt juiciness & mouth-coating lubricity',
        suggestedVeganIngredients: ['Refined Coconut Oil', 'High-Oleic Sunflower Oil'],
        mechanisticReasoning: 'Biphasic lipid blend: coconut oil provides a crisp melt at 24°C mimicking animal fat, while sunflower oil ensures lingering juiciness without post-chew waxiness.'
      },
      {
        animalComponent: 'Connective tissue & heat-set binding',
        functionalRole: 'Structural integrity during deep-frying',
        suggestedVeganIngredients: ['Methylcellulose (Thermal Gel)', 'Potato Starch'],
        mechanisticReasoning: 'Methylcellulose undergoes reversible thermal gelation above 55°C, sealing in volatile moisture steam during hot frying while potato starch retrogrades to preserve crust adhesion.'
      },
      {
        animalComponent: 'Brothy poultry umami volatiles',
        functionalRole: 'Savory depth & peptide mouthfeel',
        suggestedVeganIngredients: ['Shiitake & Button Mushroom Extract', 'Nutritional Yeast'],
        mechanisticReasoning: 'Naturally occurring 5\'-GMP nucleotide from shiitake acts synergistically with free glutamates in yeast to trigger salivary umami receptors without poultry stock.'
      }
    ]
  },

  'mozzarella-cheese': {
    name: 'Mozzarella Cheese',
    category: 'Cultured Dairy Emulsion',
    functionalProperties: [
      'Casein micelle cross-linked hydrophobic matrix',
      'Biaxial thermoreversible stretch and fiber drawing (>58°C)',
      'Free fat oiling-off on baking (controlled release)',
      'Moisture retention in acidified gel network',
      'Milky, lactic, subtle cultured diacetyl flavor'
    ],
    keyAnimalDerivedComponents: [
      'Bovine casein micelle network (alpha-s1, beta, kappa)',
      'Bovine milk fat globules (high palmitic/oleic ratio)',
      'Whey proteins & lactose',
      'Lactic acid bacteria culture acids'
    ],
    benchmarks: {
      proteinPer100g: 22.0,
      caloriesPer100g: 300,
      fatPer100g: 22.4,
      carbsPer100g: 2.2,
      fiberPer100g: 0.0,
      ironPer100g: 0.4,
      b12Per100g: 2.3,
      waterContentPercent: 50,
      referenceCarbonKgPerKg: 9.5, // kg CO2e / kg dairy cheese
      referenceCostPerKg: 380
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Casein micelle stretching strands',
        functionalRole: 'Biaxial thermoreversible stretch & melt',
        suggestedVeganIngredients: ['Tapioca Starch (Modified Cassava)', 'Soy Milk / Pea Protein'],
        mechanisticReasoning: 'Pregelatinized amylopectin in tapioca forms long intermolecular entanglements when heated with water and lipids, replicating the continuous molten stringiness of curd fibers.'
      },
      {
        animalComponent: 'Bovine milk fat globules',
        functionalRole: 'Firm chilled block + creamy melt release',
        suggestedVeganIngredients: ['Refined Coconut Oil', 'Raw Cashew Butter / Paste'],
        mechanisticReasoning: 'Coconut oil solidifies at refrigeration temperatures for clean grating/shredding, while cashew butter micro-droplets contribute natural dairy-like colloidal richness.'
      },
      {
        animalComponent: 'Calcium-phosphate bridging',
        functionalRole: 'Curd gel firmness & ionic cross-linking',
        suggestedVeganIngredients: ['Calcium Carbonate & B12 Micro-Premix', 'Sea Salt & Natural Flavor Synergy'],
        mechanisticReasoning: 'Divalent Ca2+ ions cross-link botanical hydrocolloids and plant proteins, stabilizing the emulsion against oil separation during pizza baking.'
      }
    ]
  },

  'milk': {
    name: 'Dairy Milk',
    category: 'Bovine Liquid Dispersion',
    functionalProperties: [
      'Submicellar colloidal dispersion in water',
      'Subtle lactose carbohydrate sweetness',
      'Light mouthfeel viscosity (2.0 cP at 20°C)',
      'Steam micro-foaming capability (protein-stabilized bubbles)',
      'Neutral, fresh, creamy volatile profile'
    ],
    keyAnimalDerivedComponents: [
      'Soluble whey & colloidal casein protein',
      'Milk fat globule membrane (MFGM)',
      'Lactose disaccharide sugar',
      'Bioavailable calcium & Vitamin B12'
    ],
    benchmarks: {
      proteinPer100g: 3.4,
      caloriesPer100g: 61,
      fatPer100g: 3.3,
      carbsPer100g: 4.8,
      fiberPer100g: 0.0,
      ironPer100g: 0.1,
      b12Per100g: 0.45,
      waterContentPercent: 88,
      referenceCarbonKgPerKg: 3.2,
      referenceCostPerKg: 70
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Casein & whey protein suspension',
        functionalRole: 'Protein density & barista micro-foaming',
        suggestedVeganIngredients: ['Soy Milk (Whole Bean Extract)', 'Pea Protein Isolate 85%'],
        mechanisticReasoning: 'Soluble botanical globulins create interfacial films around injected steam bubbles, producing velvety micro-foam with elastic foam stability.'
      },
      {
        animalComponent: 'Milk fat globules',
        functionalRole: 'Mouth-coating creaminess and opacity',
        suggestedVeganIngredients: ['High-Oleic Sunflower Oil', 'Oat Milk'],
        mechanisticReasoning: 'High-pressure homogenization shears botanical oil into sub-micron droplets (d50 < 0.8 μm), mimicking whole milk opacity and non-viscous light creaminess.'
      },
      {
        animalComponent: 'Lactose & dairy minerals',
        functionalRole: 'Natural sweet balance & daily mineral parity',
        suggestedVeganIngredients: ['Oat Milk (Enzymatically Hydrolyzed)', 'Calcium Carbonate & B12 Micro-Premix'],
        mechanisticReasoning: 'Enzymatic amylase treatment yields natural maltose sweetness with zero added cane sugar, fortified with calcium carbonate to 120mg/100g.'
      }
    ]
  },

  'ice-cream': {
    name: 'Ice Cream',
    category: 'Cryogenic Frozen Foam & Emulsion',
    functionalProperties: [
      'Partially coalesced fat globule crystal network',
      'Viscous concentrated sugar-water matrix freezing depression',
      'Overrun air cell stabilization (micro-air bubbles)',
      'Slow thermal meltdown rate without iciness',
      'Smooth, creamy, velvety mouthfeel at -15°C'
    ],
    keyAnimalDerivedComponents: [
      'Heavy dairy cream fat (36% milk fat)',
      'Skim milk solids-non-fat (MSNF protein)',
      'Dairy sucrose & lactose balance',
      'Egg yolk lecithin (custard styles)'
    ],
    benchmarks: {
      proteinPer100g: 3.5,
      caloriesPer100g: 207,
      fatPer100g: 11.0,
      carbsPer100g: 23.6,
      fiberPer100g: 0.7,
      ironPer100g: 0.2,
      b12Per100g: 0.4,
      waterContentPercent: 61,
      referenceCarbonKgPerKg: 4.8,
      referenceCostPerKg: 180
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Heavy dairy cream fat',
        functionalRole: 'Fat crystal network preventing ice crystal growth',
        suggestedVeganIngredients: ['Coconut Milk (18% Medium Chain Lipid)', 'Refined Coconut Oil'],
        mechanisticReasoning: 'Solid fat content at -18°C creates a rigid scaffolding that physically blocks ice recrystallization, ensuring smooth scoopability.'
      },
      {
        animalComponent: 'Milk solids non-fat & egg yolk',
        functionalRole: 'Emulsification & air cell overrun entrapment',
        suggestedVeganIngredients: ['Raw Cashew Butter / Paste', 'Aquafaba'],
        mechanisticReasoning: 'Cashew paste provides fine natural emulsified solids, while aquafaba peptides stabilize tiny air pockets during cryogenic churning.'
      },
      {
        animalComponent: 'Dairy sugar cryoprotectant',
        functionalRole: 'Freezing point depression & creamy scoop',
        suggestedVeganIngredients: ['Tapioca Starch (Modified Cassava)', 'Oat Milk'],
        mechanisticReasoning: 'Low-molecular weight plant oligosaccharides depress freezing point to -2.5°C, ensuring a soft scoop without brittle crystal shards.'
      }
    ]
  },

  'egg': {
    name: 'Whole Egg',
    category: 'Avian Colloid & Emulsion',
    functionalProperties: [
      'Thermally induced irreversible protein coagulation (62°C–70°C)',
      'Phospholipid-rich amphiphilic emulsification (lecithin)',
      'Surface-active foaming and expansion',
      'Water entrapment in tight 3D gel mesh',
      'Rich, fatty, sulfurous/savory custard notes'
    ],
    keyAnimalDerivedComponents: [
      'Egg white ovalbumin & ovotransferrin (coagulating proteins)',
      'Egg yolk vitellin & high-density lipoproteins',
      'Yolk lecithin (phosphatidylcholine emulsifier)',
      'Carotenoid lutein / zeaxanthin pigment'
    ],
    benchmarks: {
      proteinPer100g: 12.6,
      caloriesPer100g: 143,
      fatPer100g: 9.5,
      carbsPer100g: 0.7,
      fiberPer100g: 0.0,
      ironPer100g: 1.8,
      b12Per100g: 1.1,
      waterContentPercent: 75,
      referenceCarbonKgPerKg: 4.2,
      referenceCostPerKg: 150
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Ovalbumin heat-set coagulation',
        functionalRole: 'Thermal gelation & scrambles/baking binding',
        suggestedVeganIngredients: ['Chickpea Flour (Besan)', 'Soy Protein Isolate 90%'],
        mechanisticReasoning: 'Legume 7S and 11S globulins denature at 68°C, forming a coherent continuous protein gel that holds moisture without separating into curds.'
      },
      {
        animalComponent: 'Egg yolk lecithin emulsification',
        functionalRole: 'Binding water and oil phases in culinary matrices',
        suggestedVeganIngredients: ['Ground Cold-Milled Flaxseed', 'Aquafaba'],
        mechanisticReasoning: 'Flaxseed arabinoxylans and aquafaba saponins mimic the amphiphilic properties of egg yolk lecithin, forming stable micellar emulsions.'
      },
      {
        animalComponent: 'Yolk color and rich lipid mouthfeel',
        functionalRole: 'Golden yellow color & unctuous coating',
        suggestedVeganIngredients: ['High-Oleic Sunflower Oil', 'Corn Starch'],
        mechanisticReasoning: 'Plant oils enriched with botanical carotenoids replicate the creamy mouth-coat and golden chromaticity of freshly cracked yolk.'
      }
    ]
  },

  'mayonnaise': {
    name: 'Mayonnaise',
    category: 'Oil-in-Water Colloid Matrix',
    functionalProperties: [
      'Extremely high internal phase packing (>70% oil droplet volume)',
      'Viscoelastic yield stress and shear-thinning rheology',
      'Stable emulsion against coalescence under ambient storage',
      'Creamy spreadability with clean spoon-cut edges',
      'Tangy, rich, acidic emulsified flavor'
    ],
    keyAnimalDerivedComponents: [
      'Egg yolk low-density lipoprotein (LDL)',
      'Egg yolk phosvitin & livetin proteins',
      'Egg yolk cholesterol & triglycerides',
      'Vinegar/lemon acid coagulation'
    ],
    benchmarks: {
      proteinPer100g: 1.2,
      caloriesPer100g: 680,
      fatPer100g: 74.8,
      carbsPer100g: 0.6,
      fiberPer100g: 0.0,
      ironPer100g: 0.2,
      b12Per100g: 0.1,
      waterContentPercent: 20,
      referenceCarbonKgPerKg: 3.8,
      referenceCostPerKg: 190
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Egg yolk LDL emulsifier',
        functionalRole: 'Packing 70%+ oil droplets into dense non-flowing gel',
        suggestedVeganIngredients: ['Aquafaba (Chickpea Albumin Extract)', 'Modified Potato Starch'],
        mechanisticReasoning: 'Aquafaba proteins adsorb at the oil-water interface, lowering interfacial tension below 10 mN/m and preventing droplet coalescence.'
      },
      {
        animalComponent: 'High-fat dispersion',
        functionalRole: 'Viscoelastic body and creamy spoonable scoop',
        suggestedVeganIngredients: ['Canola Oil (Low Erucic Acid)', 'High-Oleic Sunflower Oil'],
        mechanisticReasoning: 'High-shear rotor-stator blending disperses plant oil into uniform 2-5 micron droplets, achieving a yield stress of >45 Pa.'
      },
      {
        animalComponent: 'Egg yolk rich savory mouthfeel',
        functionalRole: 'Creamy lingering finish without oil slick',
        suggestedVeganIngredients: ['Sea Salt & Natural Flavor Synergy', 'Ground Cold-Milled Flaxseed'],
        mechanisticReasoning: 'Hydrated flaxseed mucilage provides non-Newtonian shear thinning: high viscosity when resting on a spoon, instant smooth melt on tongue contact.'
      }
    ]
  },
  'salmon': {
    name: 'Atlantic Salmon',
    category: 'Anadromous Marine Teleost Matrix',
    functionalProperties: [
      'Myotome/myosepta w-shaped lamellar muscle flake cleavage',
      'Intramuscular lipid marbling rich in long-chain Omega-3 (EPA/DHA)',
      'Delicate thermal denaturation onset at 45°C - 55°C (low shear modulus)',
      'Astaxanthin-driven salmon pink/orange chromaticity',
      'Oceanic fresh savory volatile profile (trimethylamine oxide & free glycine)'
    ],
    keyAnimalDerivedComponents: [
      'Marine teleost actomyosin myotome sheets',
      'Collagenous myosepta connective sheets (Type I/V collagen)',
      'Marine polyunsaturated fatty acids (EPA 20:5n-3, DHA 22:6n-3)',
      'Natural astaxanthin carotenoid pigment'
    ],
    benchmarks: {
      proteinPer100g: 20.4,
      caloriesPer100g: 208,
      fatPer100g: 13.4,
      carbsPer100g: 0.0,
      fiberPer100g: 0.0,
      ironPer100g: 0.5,
      b12Per100g: 3.2,
      waterContentPercent: 65,
      referenceCarbonKgPerKg: 11.9,
      referenceCostPerKg: 420
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Myotome muscle sheet lamellar cleavage',
        functionalRole: 'Tender flaky mouthfeel and delicate sheet separation',
        suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Potato Starch', 'Tapioca Starch (Modified Cassava)'],
        mechanisticReasoning: 'Low-shear wet extrusion paired with botanical starch interpenetrating network replicates the delicate horizontal flaking of cooked salmon myotomes.'
      },
      {
        animalComponent: 'Marine lipid profile & Omega-3 EPA/DHA',
        functionalRole: 'Lipidic melt, unctuous finish and marine savory aroma',
        suggestedVeganIngredients: ['Canola Oil (Low Erucic Acid)', 'High-Oleic Sunflower Oil'],
        mechanisticReasoning: 'Emulsified cold-pressed botanical oil blend fortified with algal micro-lipids recreates the buttery melting point and lipid release of salmon belly.'
      },
      {
        animalComponent: 'Astaxanthin carotenoid & oceanic volatiles',
        functionalRole: 'Natural coral pink pigmentation and sea umami depth',
        suggestedVeganIngredients: ['Sea Salt & Natural Flavor Synergy', 'Shiitake & Button Mushroom Extract'],
        mechanisticReasoning: 'Natural botanical carotenoids from fermented algae provide photostable salmon chroma while kelp and mushroom 5\'-GMP recreate natural marine savory depth.'
      }
    ]
  },

  'fish': {
    name: 'White Fish Fillet',
    category: 'Demersal Teleost Muscle Matrix',
    functionalProperties: [
      'Delicate, pearlescent lamellar shear flakes with low elastic recoil',
      'Translucent raw state transitioning to opaque white upon 52°C heat set',
      'High moisture retention (80% internal water) without syneresis',
      'Subtle, clean marine salinity with ultra-low fat content (<1.5%)'
    ],
    keyAnimalDerivedComponents: [
      'Cod/pollock myofibrillar actomyosin',
      'Delicate myocommata connective collagen',
      'Skeletal moisture phase with trace marine electrolytes'
    ],
    benchmarks: {
      proteinPer100g: 17.8,
      caloriesPer100g: 82,
      fatPer100g: 0.8,
      carbsPer100g: 0.0,
      fiberPer100g: 0.0,
      ironPer100g: 0.4,
      b12Per100g: 1.0,
      waterContentPercent: 80,
      referenceCarbonKgPerKg: 5.4,
      referenceCostPerKg: 280
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Delicate pearlescent flake structure',
        functionalRole: 'Brittle sheet flaking without rubbery resilience',
        suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Potato Starch', 'Methylcellulose (Thermal Gel Grade)'],
        mechanisticReasoning: 'Cold-set methylcellulose and native potato starch form a tender matrix that fractures along distinct planes under fork pressure.'
      },
      {
        animalComponent: 'Clean white marine opacity',
        functionalRole: 'Pearlescent cooked fish appearance and light savory flavor',
        suggestedVeganIngredients: ['Tapioca Starch (Modified Cassava)', 'Sea Salt & Natural Flavor Synergy'],
        mechanisticReasoning: 'Naturally bleached botanical starch granules scatter light evenly, providing the brilliant white appearance of poached cod.'
      }
    ]
  },

  'mutton': {
    name: 'Braised Mutton',
    category: 'Ovine Ruminant Muscle Matrix',
    functionalProperties: [
      'Dense, slow-twitch oxidative muscle fiber bundles (Type I fibers)',
      'Branched-chain fatty acid (BCFA) gaminess and persistent tallow finish',
      'High collagen cross-linking requiring long thermal gelatinization',
      'Deep burgundy pigmentation from elevated myoglobin concentration',
      'Rich, lingering savory warmth with high melt viscosity'
    ],
    keyAnimalDerivedComponents: [
      'Ovine myofibrillar actomyosin & slow-twitch fibers',
      'Intermuscular tallow lipid (stearic & branched-chain fatty acids)',
      'Type I & III connective tissue collagen matrix',
      'Heme myoglobin iron complex'
    ],
    benchmarks: {
      proteinPer100g: 20.3,
      caloriesPer100g: 242,
      fatPer100g: 17.0,
      carbsPer100g: 0.0,
      fiberPer100g: 0.0,
      ironPer100g: 2.1,
      b12Per100g: 2.6,
      waterContentPercent: 61,
      referenceCarbonKgPerKg: 39.2,
      referenceCostPerKg: 350
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Dense slow-twitch muscle chew',
        functionalRole: 'Firm, toothsome fiber bundles resistant to braising',
        suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Young Green Jackfruit (Shredded Pulp)', 'Vital Wheat Gluten (Seitan Base)'],
        mechanisticReasoning: 'High-density HMEC extrusion combined with fibrous jackfruit core delivers the deep stringy pull of slow-braised ovine muscle.'
      },
      {
        animalComponent: 'Ovine tallow and branched-chain fat aroma',
        functionalRole: 'High melting point lipid coat (44°C) and robust gamey finish',
        suggestedVeganIngredients: ['Refined Coconut Oil', 'High-Oleic Sunflower Oil'],
        mechanisticReasoning: 'High-stearate botanical fat fractions reproduce the tallow mouth-coating of mutton without off-tasting greasy residue.'
      },
      {
        animalComponent: 'Deep myoglobin and braised savory color',
        functionalRole: 'Dark mahogany hue and Maillard richness',
        suggestedVeganIngredients: ['Shiitake & Button Mushroom Extract', 'Nutritional Yeast (Fortified Flakes)'],
        mechanisticReasoning: 'Mushroom guanylates and botanical polyphenol extracts provide deep caramelized color and rich savory depth.'
      }
    ]
  },

  'beef': {
    name: 'Ground Beef Patty',
    category: 'Bovine Skeletal Myofibrillar Matrix',
    functionalProperties: [
      'Coarse grind texture with distinct protein granules and fat pockets',
      'Heme-catalyzed pyrazine aroma upon high-heat griddling (>140°C)',
      'Biphasic lipid rendering (solid marble at cold, molten sizzle in pan)',
      'Elastic chew and springy bite rebound from denatured actomyosin',
      'Deep red to caramelized crust Maillard transition'
    ],
    keyAnimalDerivedComponents: [
      'Bovine myofibrillar actin/myosin fibers',
      'Adipose tissue triglycerides (high stearic/palmitic tallow)',
      'Perimysial collagen connective tissue',
      'Heme-bound myoglobin'
    ],
    benchmarks: {
      proteinPer100g: 21.5,
      caloriesPer100g: 228,
      fatPer100g: 15.0,
      carbsPer100g: 0.0,
      fiberPer100g: 0.0,
      ironPer100g: 2.6,
      b12Per100g: 2.4,
      waterContentPercent: 62,
      referenceCarbonKgPerKg: 60.0,
      referenceCostPerKg: 310
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Coarse ground muscle grain and springy bite',
        functionalRole: 'Firm granular chew and patty cohesion on the grill',
        suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Soy Protein Isolate 90%', 'Methylcellulose (Thermal Gel Grade)'],
        mechanisticReasoning: 'Texturized plant protein granules bound with thermal-gel methylcellulose maintain distinct meat-grain texture without turning mushy.'
      },
      {
        animalComponent: 'Marbled solid fat pockets & sizzle rendering',
        functionalRole: 'Juiciness release during cooking and caramelized sear',
        suggestedVeganIngredients: ['Refined Coconut Oil', 'Canola Oil (Low Erucic Acid)'],
        mechanisticReasoning: 'Discrete solid coconut fat particles melt during griddling, basting the plant protein matrix from within.'
      },
      {
        animalComponent: 'Heme myoglobin & sear aroma',
        functionalRole: 'Raw color turning mahogany brown with savory roast aroma',
        suggestedVeganIngredients: ['Shiitake & Button Mushroom Extract', 'Nutritional Yeast (Fortified Flakes)', 'Sea Salt & Natural Flavor Synergy'],
        mechanisticReasoning: 'Botanical reducing sugars, free amino acids, and mushroom nucleotides react under griddle heat to form pyrazines and furans identical to seared beef.'
      }
    ]
  }
};

/**
 * Normalizes user query to recognized product record or returns custom template
 */
export function getProductKnowledge(inputName: string): { record: ProductKnowledgeRecord; isKnown: boolean } {
  const clean = inputName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  
  for (const [key, record] of Object.entries(PRODUCT_KNOWLEDGE_BASE)) {
    const keyClean = key.replace(/[^a-z0-9]/g, '');
    const nameClean = record.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (clean === keyClean || clean === nameClean) return { record, isKnown: true };
    if (clean.includes(keyClean) || nameClean.includes(clean)) return { record, isKnown: true };
  }

  // Common aliases
  if (clean.includes('salmon')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['salmon'], isKnown: true };
  }
  if (clean.includes('fish') || clean.includes('cod') || clean.includes('pollock') || clean.includes('seafood')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['fish'], isKnown: true };
  }
  if (clean.includes('mutton') || clean.includes('lamb') || clean.includes('goat') || clean.includes('ovine')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['mutton'], isKnown: true };
  }
  if (clean.includes('beef') || clean.includes('steak') || clean.includes('burger') || clean.includes('patty') || clean.includes('bovine')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['beef'], isKnown: true };
  }
  if (clean.includes('chicken') || clean.includes('nugget') || clean.includes('poultry') || clean.includes('tender')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['chicken-nugget'], isKnown: true };
  }
  if (clean.includes('mozzarella') || clean.includes('cheese') || clean.includes('curd') || clean.includes('cheddar')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['mozzarella-cheese'], isKnown: true };
  }
  if (clean.includes('milk') || clean.includes('dairy') || clean.includes('latte')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['milk'], isKnown: true };
  }
  if (clean.includes('icecream') || clean.includes('gelato') || clean.includes('frozenyogurt')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['ice-cream'], isKnown: true };
  }
  if (clean.includes('egg') || clean.includes('omelet') || clean.includes('scramble')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['egg'], isKnown: true };
  }
  if (clean.includes('mayo') || clean.includes('mayonnaise') || clean.includes('aioli')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['mayonnaise'], isKnown: true };
  }

  // Unknown animal product - generate conceptual dynamic placeholder
  return {
    isKnown: false,
    record: {
      name: inputName.trim(),
      category: 'Specialty Animal Archetype',
      functionalProperties: [
        'Complex animal protein macro-structure',
        'Specific lipid melting profile',
        'Moisture entrapment and water activity',
        'Savory or rich organoleptic notes'
      ],
      keyAnimalDerivedComponents: [
        'Animal skeletal or cellular protein',
        'Species-specific animal lipids & cholesterol',
        'Emulsifiers and connective structural fibers'
      ],
      benchmarks: {
        proteinPer100g: 16.0,
        caloriesPer100g: 210,
        fatPer100g: 12.0,
        carbsPer100g: 2.0,
        fiberPer100g: 0.0,
        ironPer100g: 1.5,
        b12Per100g: 0.8,
        waterContentPercent: 65,
        referenceCarbonKgPerKg: 7.5,
        referenceCostPerKg: 250
      },
      recommendedSubstitutions: [
        {
          animalComponent: 'Animal cellular protein matrix',
          functionalRole: 'Scaffold structure & bite resistance',
          suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Vital Wheat Gluten'],
          mechanisticReasoning: 'Thermomechanically extruded botanical protein isolates re-create the tensile fiber network.'
        },
        {
          animalComponent: 'Animal fats & sterols',
          functionalRole: 'Mouthfeel lubrication & melting profile',
          suggestedVeganIngredients: ['Refined Coconut Oil', 'High-Oleic Sunflower Oil'],
          mechanisticReasoning: 'Biphasic vegetable lipid system provides clean solid-to-liquid phase transition.'
        }
      ]
    }
  };
}
