// Human Design Type Definitions (Ψ-NEXUS HD Engine)

export type HDCenterId =
  | 'head'
  | 'ajna'
  | 'throat'
  | 'gCenter'
  | 'heart'
  | 'solarPlexus'
  | 'sacral'
  | 'spleen'
  | 'root';

export type HDCenterType = 'pressure' | 'awareness' | 'motor' | 'manifestation' | 'identity';

export interface HDCenterInfo {
  id: HDCenterId;
  name: string;
  germanName: string;
  type: HDCenterType;
  primaryColor: string; // Hex color for defined
  lightBgColor: string;
  gates: number[];
  biologicalCorrelations: string[];
  definedGift: string;
  undefinedWisdom: string;
  notSelfQuestion: string;
  deconditioningKey: string;
}

export type HDPlanetId =
  | 'Sun'
  | 'Earth'
  | 'Moon'
  | 'NorthNode'
  | 'SouthNode'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto';

export interface HDActivation {
  planetId: HDPlanetId;
  planetName: string;
  symbol: string;
  longitude: number;
  gate: number;
  line: number;
  color: number;
  tone: number;
  base: number;
  isRetrograde: boolean;
  signName: string;
  signSymbol: string;
  degreeString: string;
}

export interface HDChannel {
  id: string; // e.g. "34-20"
  gate1: number;
  gate2: number;
  name: string;
  germanName: string;
  center1: HDCenterId;
  center2: HDCenterId;
  circuit: 'individual' | 'collective_logic' | 'collective_sensing' | 'tribal' | 'integration';
  circuitLabel: string;
  quantumGifting: string;
  shadowPattern: string;
  masteryTheme: string;
  activationState?: 'conscious' | 'unconscious' | 'both' | 'inactive';
}

export interface HDGateData {
  gate: number;
  iChingName: string;
  hexagramSymbol: string;
  keynote: string;
  center: HDCenterId;
  channelId: string;
  lightGift: string;
  shadowFrequency: string;
  siddhicPotential: string;
  codonRing?: string;
  aminoAcid?: string;
}

export type HDEnergyType =
  | 'Manifestor'
  | 'Generator'
  | 'ManifestingGenerator'
  | 'Projector'
  | 'Reflector';

export interface HDEnergyTypeInfo {
  type: HDEnergyType;
  title: string;
  germanTitle: string;
  percentage: string;
  auraDescription: string;
  strategy: string;
  signature: string;
  notSelfTheme: string;
  decisionProtocol: string;
  birkenbihlKeynote: string;
  masteryRoadmap: string[];
}

export type HDAuthority =
  | 'emotional'
  | 'sacral'
  | 'splenic'
  | 'ego_manifested'
  | 'ego_projected'
  | 'self_projected'
  | 'mental'
  | 'lunar';

export interface HDAuthorityInfo {
  id: HDAuthority;
  name: string;
  germanName: string;
  voicePhrase: string;
  clarityProcess: string;
  trapToAvoid: string;
  birkenbihlAnchor: string;
}

export interface HDProfileInfo {
  code: string; // e.g. "1/3", "4/6"
  consciousLine: number;
  unconsciousLine: number;
  name: string;
  germanName: string;
  archetypeRole: string;
  consciousTheme: string;
  unconsciousTheme: string;
  lifeTrajectory: string;
  relationshipDynamic: string;
}

export interface HDIncarnationCross {
  type: 'RightAngle' | 'Juxtaposition' | 'LeftAngle';
  typeGerman: string;
  name: string;
  quarter: string;
  gates: {
    personalitySun: number;
    personalityEarth: number;
    designSun: number;
    designEarth: number;
  };
  missionDescription: string;
}

export interface HDVariableArrows {
  digestion: {
    direction: 'left' | 'right';
    tone: number;
    color: number;
    label: string;
    description: string;
  };
  environment: {
    direction: 'left' | 'right';
    tone: number;
    color: number;
    label: string;
    description: string;
  };
  perspective: {
    direction: 'left' | 'right';
    tone: number;
    color: number;
    label: string;
    description: string;
  };
  motivation: {
    direction: 'left' | 'right';
    tone: number;
    color: number;
    label: string;
    description: string;
  };
}

export type HDDefinitionType =
  | 'Single'
  | 'Split'
  | 'TripleSplit'
  | 'QuadrupleSplit'
  | 'None';

export interface HDChartData {
  input: {
    name?: string;
    birthDate: string;
    birthTime: string;
    cityName: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  utcBirthDate: Date;
  utcDesignDate: Date;
  daysDifference: number;
  personalityActivations: HDActivation[];
  designActivations: HDActivation[];
  activeGates: Record<number, { conscious: boolean; unconscious: boolean; lines: number[] }>;
  definedCenters: HDCenterId[];
  undefinedCenters: HDCenterId[];
  definedChannels: HDChannel[];
  energyType: HDEnergyTypeInfo;
  authority: HDAuthorityInfo;
  profile: HDProfileInfo;
  definition: {
    type: HDDefinitionType;
    label: string;
    description: string;
  };
  incarnationCross: HDIncarnationCross;
  variables: HDVariableArrows;
  synthesis: {
    summary: string;
    quantumGift: string;
    notSelfDanger: string;
    deconditioningProtocol: string[];
  };
}

export interface HDAgentPromptResponse {
  question: string;
  headline: string;
  category: 'strategy' | 'centers' | 'career' | 'relationships' | 'shadow';
  analysis: string;
  birkenbihlProtocol: string[];
  mantra: string;
  practicalAction: string;
}
