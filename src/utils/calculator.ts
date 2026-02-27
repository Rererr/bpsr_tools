import { ModuleSlot, CalculationResult, LinkBonus } from '../types/module-state';
import { GameData } from '../types/game-data';
import { getStatName, STAT_MAP } from '../data/stat-mappings';
import { getEffectNameJP, LINK_BONUS_EFFECTS } from '../data/effect-types';

export function calculateResults(slots: ModuleSlot[]): CalculationResult[] {
  // Map to accumulate totals: effectName → { total, contributions }
  const effectTotals = new Map<string, {
    total: number;
    contributions: { slotId: string; effectId: string; value: number }[];
  }>();

  // Iterate through all slots and effects
  slots.forEach(slot => {
    slot.effects.forEach(effect => {
      if (effect.effectName && effect.value > 0) {
        const effectName = effect.effectName;

        if (!effectTotals.has(effectName)) {
          effectTotals.set(effectName, { total: 0, contributions: [] });
        }

        const entry = effectTotals.get(effectName)!;
        entry.total += effect.value;
        entry.contributions.push({
          slotId: slot.id,
          effectId: effect.id,
          value: effect.value,
        });
      }
    });
  });

  // Convert to array format
  const results: CalculationResult[] = [];
  effectTotals.forEach((data, effectName) => {
    results.push({
      statId: 0, // No longer used for grouping
      statName: getEffectNameJP(effectName),
      totalValue: data.total,
      contributions: data.contributions,
    });
  });

  return results.sort((a, b) => a.statName.localeCompare(b.statName));
}

export function calculateLinkBonuses(slots: ModuleSlot[], gameData: GameData): LinkBonus[] {
  // Sum link values per effect type (not count, but sum of values)
  const linkValues = new Map<string, number>();
  let totalLinkValue = 0;

  slots.forEach(slot => {
    slot.effects.forEach(effect => {
      if (effect.effectName && effect.value > 0) {
        const current = linkValues.get(effect.effectName) || 0;
        linkValues.set(effect.effectName, current + effect.value);
        totalLinkValue += effect.value;
      }
    });
  });

  const bonuses: LinkBonus[] = [];

  // 1. Add effect-specific link bonuses (from ModEffectTable)
  // Only for effects that have link bonuses
  linkValues.forEach((linkValue, effectName) => {
    // Skip if this effect type doesn't have link bonuses
    if (!LINK_BONUS_EFFECTS.has(effectName)) {
      return;
    }

    // Only show bonus if there is at least 1 link value
    if (linkValue < 1) {
      return;
    }

    const effectBonuses = getEffectSpecificBonus(effectName, linkValue, gameData);
    const thresholds = [
      { level: 6, minLink: 20 },
      { level: 5, minLink: 16 },
      { level: 4, minLink: 12 },
      { level: 3, minLink: 8 },
      { level: 2, minLink: 4 },
      { level: 1, minLink: 1 },
    ];

    let activatedLevel = 0;
    for (const threshold of thresholds) {
      if (linkValue >= threshold.minLink) {
        activatedLevel = threshold.level;
        break;
      }
    }

    bonuses.push({
      effectName,
      effectNameJP: getEffectNameJP(effectName),
      linkLevel: linkValue,
      activatedLevel,
      toNextLevel: getToNextLevel(linkValue),
      bonusEffects: effectBonuses,
    });
  });

  // 2. Add global link bonus (base stats = totalLinkValue * 2)
  if (totalLinkValue > 0) {
    // Calculate base stat bonuses as totalLinkValue * 2 for each of the four stats
    const baseStatIds = [11012, 11022, 11032, 11042]; // 筋力, 知力, 敏捷, 耐久力
    const globalBonuses = baseStatIds.map(statId => ({
      statId,
      statName: getStatName(statId),
      value: totalLinkValue * 2,
    }));

    // Determine activated level based on totalLinkValue
    const thresholds = [
      { level: 6, minLink: 20 },
      { level: 5, minLink: 16 },
      { level: 4, minLink: 12 },
      { level: 3, minLink: 8 },
      { level: 2, minLink: 4 },
      { level: 1, minLink: 1 },
    ];

    let activatedLevel = 0;
    for (const threshold of thresholds) {
      if (totalLinkValue >= threshold.minLink) {
        activatedLevel = threshold.level;
        break;
      }
    }

    bonuses.push({
      effectName: 'Global Link',
      effectNameJP: '基礎ステータスボーナス',
      linkLevel: totalLinkValue,
      activatedLevel,
      toNextLevel: getToNextLevel(totalLinkValue),
      bonusEffects: globalBonuses,
    });
  }

  return bonuses;
}

function getEffectSpecificBonus(
  effectName: string,
  linkValue: number,
  gameData: GameData
): { statId: number; statName: string; value: number }[] {
  const bonuses: { statId: number; statName: string; value: number }[] = [];

  // Get all effects with this name
  const effectsWithName = gameData.effectsByName.get(effectName);
  if (!effectsWithName) {
    return bonuses;
  }

  // Map link value to enhancement num (thresholds: 1, 4, 8, 12, 16, 20)
  const enhancementNumMap: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 8,
    9: 8,
    10: 8,
    11: 8,
    12: 12,
    13: 12,
    14: 12,
    15: 12,
    16: 16,
    17: 16,
    18: 16,
    19: 16,
    20: 20,
  };

  const targetEnhancementNum = enhancementNumMap[Math.min(linkValue, 20)];
  if (!targetEnhancementNum) {
    return bonuses;
  }

  // Find the matching effect entry
  const effectEntry = effectsWithName.find(e => e.EnhancementNum === targetEnhancementNum);
  if (!effectEntry || !effectEntry.EffectConfig) {
    return bonuses;
  }

  // Parse EffectConfig: [[type, stat_id, value], ...]
  effectEntry.EffectConfig.forEach(config => {
    if (config.length >= 3) {
      const [_type, statId, value] = config;
      // Only include stat IDs that have a known mapping
      if (STAT_MAP.has(statId)) {
        bonuses.push({
          statId,
          statName: getStatName(statId),
          value,
        });
      }
    }
  });

  return bonuses;
}

// getGlobalLinkBonus is no longer needed - base stats are now calculated as totalLinkValue * 2

// Format link value for display
export function formatLinkValue(value: number): string {
  return `+${value}`;
}

// Calculate remaining link value to next level
export function getToNextLevel(currentLink: number): number | null {
  const thresholds = [1, 4, 8, 12, 16, 20];
  for (const threshold of thresholds) {
    if (currentLink < threshold) {
      return threshold - currentLink;
    }
  }
  return null; // Max level reached
}
