export interface EffectSlot {
  id: string; // unique ID for React keys
  effectName: string;
  statId: number;
  value: number;
}

export interface ModuleSlot {
  id: string; // slot-0, slot-1, slot-2, slot-3
  moduleId: number | null;
  moduleName: string;
  moduleType: number | null;
  effects: EffectSlot[]; // 3 effects per module
}

export interface CalculationResult {
  statId: number;
  statName: string;
  totalValue: number;
  contributions: {
    slotId: string;
    effectId: string;
    value: number;
  }[];
}

export interface LinkBonus {
  effectName: string;
  effectNameJP: string;
  linkLevel: number;
  activatedLevel: number; // 1-6, which bonus level is activated
  toNextLevel: number | null; // remaining to next level, null if max
  bonusEffects: {
    statId: number;
    statName: string;
    value: number;
  }[];
}

export interface ComparisonBase {
  presetId: string;
  presetName: string;
  results: CalculationResult[];
}

export interface IdealLinkLevel {
  effectName: string;      // 効果名（英語）
  effectNameJP: string;    // 効果名（日本語表示用）
  targetLv: number;        // 目標Lv (1-6)
}

export interface ModuleState {
  slots: ModuleSlot[];
  results: CalculationResult[];
  linkBonuses: LinkBonus[];
  comparisonBase: ComparisonBase | null;
  idealLevels: IdealLinkLevel[];
}
