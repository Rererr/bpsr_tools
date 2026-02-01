// Raw data structures matching JSON files
export interface ModTableEntry {
  Id: number;
  Name: string;
  ModType: number;
  EffectLibId: number[];
  IsOnly: boolean;
  SimilarId: number;
  DecomposeAwardPackID: number[][];
  InitializationId: number;
  IsCanLink: boolean;
}

export interface ModTypeEntry {
  Id: number;
  Name: string;
  TypeTips: string;
  TypeShow: string;
  TypeTexture: string;
}

export interface ModEffectEntry {
  Id: number;
  EffectID: number;
  EffectName: string;
  Level: number;
  EffectConfigIcon: string;
  EffectConfig: number[][]; // [[type, stat_id, value], ...]
  EffectKey: any[];
  EffectValue: any[];
  EnhancementNum: number;
  PlayerLevel: number;
  EffectOverview: string;
  EffectType: number;
  IsNegative: boolean;
  FightValue: number;
  IsShowShield: boolean;
}

export interface ModLinkEffectEntry {
  Id: number;
  LinkTime: number;
  LinkLevelEffect: number[][]; // [[type, stat_id, value], ...]
  FightValue: number;
}

// Parsed/indexed data
export interface GameData {
  modules: Map<number, ModTableEntry>;
  moduleTypes: Map<number, ModTypeEntry>;
  effects: Map<number, ModEffectEntry>;
  effectsByName: Map<string, ModEffectEntry[]>;
  linkEffects: Map<number, ModLinkEffectEntry>;
}

export interface StatMapping {
  id: number;
  name: string;
  displayName: string;
  description: string;
}
