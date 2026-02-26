import { SavedPreset, SerializedModuleSlot, IdealLinkLevel } from '../types/presets';
import { ModuleSlot } from '../types/module-state';

const PRESETS_KEY = 'bpsr_presets';
const IDEAL_LEVELS_KEY = 'bpsr_ideal_levels';

// Lvの閾値: Lv1=1, Lv2=4, Lv3=8, Lv4=12, Lv5=16, Lv6=20
const LINK_THRESHOLDS = [0, 1, 4, 8, 12, 16, 20];

export function getLinkThreshold(lv: number): number {
  if (lv < 1 || lv > 6) return 0;
  return LINK_THRESHOLDS[lv];
}

export function getLvFromLinkValue(linkValue: number): number {
  for (let lv = 6; lv >= 1; lv--) {
    if (linkValue >= LINK_THRESHOLDS[lv]) {
      return lv;
    }
  }
  return 0;
}

// プリセットCRUD
export function loadAllPresets(): SavedPreset[] {
  try {
    const data = localStorage.getItem(PRESETS_KEY);
    if (!data) return [];
    return JSON.parse(data) as SavedPreset[];
  } catch {
    console.error('Failed to load presets');
    return [];
  }
}

export function savePreset(preset: SavedPreset): void {
  const presets = loadAllPresets();
  const existingIndex = presets.findIndex(p => p.id === preset.id);

  if (existingIndex >= 0) {
    presets[existingIndex] = { ...preset, updatedAt: Date.now() };
  } else {
    presets.push(preset);
  }

  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

export function deletePreset(presetId: string): void {
  const presets = loadAllPresets();
  const filtered = presets.filter(p => p.id !== presetId);
  localStorage.setItem(PRESETS_KEY, JSON.stringify(filtered));
}

// 目標Lvの保存・読み込み
export function loadIdealLevels(): IdealLinkLevel[] {
  try {
    const data = localStorage.getItem(IDEAL_LEVELS_KEY);
    if (!data) return [];
    return JSON.parse(data) as IdealLinkLevel[];
  } catch {
    console.error('Failed to load ideal levels');
    return [];
  }
}

export function saveIdealLevels(levels: IdealLinkLevel[]): void {
  localStorage.setItem(IDEAL_LEVELS_KEY, JSON.stringify(levels));
}

// 状態のシリアライズ
export function serializeState(slots: ModuleSlot[]): SerializedModuleSlot[] {
  return slots.map(slot => ({
    moduleId: slot.moduleId,
    moduleName: slot.moduleName,
    moduleType: slot.moduleType,
    effects: slot.effects.map(effect => ({
      effectName: effect.effectName,
      statId: effect.statId,
      value: effect.value,
    })),
  }));
}

export function deserializeToState(
  serialized: SerializedModuleSlot[],
  existingSlots: ModuleSlot[]
): ModuleSlot[] {
  return existingSlots.map((slot, index) => {
    const savedSlot = serialized[index];
    if (!savedSlot) return slot;

    return {
      ...slot,
      moduleId: savedSlot.moduleId,
      moduleName: savedSlot.moduleName,
      moduleType: savedSlot.moduleType,
      effects: slot.effects.map((effect, effectIndex) => {
        const savedEffect = savedSlot.effects[effectIndex];
        if (!savedEffect) return effect;

        return {
          ...effect,
          effectName: savedEffect.effectName,
          statId: savedEffect.statId,
          value: savedEffect.value,
        };
      }),
    };
  });
}
