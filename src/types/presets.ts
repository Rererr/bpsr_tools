// 保存用のシリアライズ可能な構造
export interface SerializedEffectSlot {
  effectName: string;
  statId: number;
  value: number;
}

export interface SerializedModuleSlot {
  moduleId: number | null;
  moduleName: string;
  moduleType: number | null;
  effects: SerializedEffectSlot[];
}

export interface SavedPreset {
  id: string;
  name: string;
  slots: SerializedModuleSlot[];
  createdAt: number;
  updatedAt: number;
}

// 差分表示用
export interface StatDifference {
  statName: string;
  previousValue: number;
  currentValue: number;
  delta: number;
}

// 理想値用（Lv入力）
export interface IdealLinkLevel {
  effectName: string;      // 効果名（英語）
  effectNameJP: string;    // 効果名（日本語表示用）
  targetLv: number;        // 目標Lv (1-6)
}

export interface LinkLevelGap {
  effectName: string;
  effectNameJP: string;
  currentLinkValue: number;   // 現在のリンク値合計
  currentLv: number;          // 現在のLv (1-6)
  targetLv: number;           // 目標Lv (1-6)
  targetLinkValue: number;    // 目標Lvに必要なリンク値 (1,4,8,12,16,20)
  gap: number;                // あと何ポイント必要か
}
