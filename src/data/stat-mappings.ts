import { StatMapping } from '../types/game-data';

// Hardcoded stat ID to name mapping based on FightAttrTable.json
// Pattern: Base ID ends with 0, Add ends with 2, Per ends with 4
export const STAT_MAPPINGS: StatMapping[] = [
  // Basic Attributes (4属性)
  { id: 11012, name: 'Strength_Add', displayName: '筋力', description: '筋力属性 (加算)' },
  { id: 11022, name: 'Intelligence_Add', displayName: '知力', description: '知力属性 (加算)' },
  { id: 11032, name: 'Agility_Add', displayName: '敏捷', description: '敏捷属性 (加算)' },
  { id: 11042, name: 'Vitality_Add', displayName: '耐久力', description: '耐久力属性 (加算)' },

  // HP
  { id: 11322, name: 'MaxHP_Add', displayName: '最大HP', description: '最大HP (加算)' },
  { id: 11324, name: 'MaxHP_Per', displayName: 'HP%', description: '最大HP (割合)' },

  // Attack
  { id: 11332, name: 'ATK_Add', displayName: '物理攻撃力', description: '物理攻撃力 (加算)' },
  { id: 11342, name: 'MATK_Add', displayName: '魔法攻撃力', description: '魔法攻撃力 (加算)' },

  // Defense
  { id: 11352, name: 'DEF_Add', displayName: '物理防御力', description: '物理防御力 (加算)' },

  // Crit
  { id: 11362, name: 'CritRate_Add', displayName: '会心率', description: '会心率 (加算)' },
  { id: 11372, name: 'CritDamage_Base_Add', displayName: '会心ダメージ(基礎)', description: '会心ダメージ 基礎 (加算)' },

  // Penetration / Ignore
  { id: 11382, name: 'MagicPenetration_Add', displayName: '魔法貫通', description: '魔法防御力無視 (加算)' },
  { id: 11392, name: 'DEF_Ignore_Mul', displayName: '防御無視', description: '物理防御力無視 (万分率)' },

  // Speed
  { id: 11722, name: 'AttackSpeed_Add', displayName: '攻撃速度', description: '攻撃速度 (万分率)' },
  { id: 11732, name: 'CastSpeed_Add', displayName: '詠唱速度', description: '詠唱速度 (万分率)' },

  // Crit Damage/Heal (Advanced)
  { id: 12512, name: 'CritDamage_Add', displayName: '会心ダメージ', description: '会心ダメージ (万分率)' },
  { id: 12742, name: 'CritHeal_Add', displayName: '会心回復', description: '会心回復 (万分率)' },

  // Lucky Strike
  { id: 12532, name: 'LuckyDamage_Add', displayName: '幸運ダメージ', description: '幸運一撃ダメージ (万分率)' },
  { id: 12722, name: 'LuckyHeal_Add', displayName: '幸運回復', description: '幸運一撃回復 (万分率)' },

  // Damage Reduction
  { id: 12562, name: 'PhysDamageRes_Add', displayName: '物理軽減', description: '物理ダメージ軽減 (万分率)' },
  { id: 12582, name: 'MagicDamageRes_Add', displayName: '魔法軽減', description: '魔法ダメージ軽減 (万分率)' },

  // Elemental
  { id: 13002, name: 'AllElement_Add', displayName: '全属性強', description: '全属性強度 (加算)' },

  // Composite stat IDs (represent multiple stats depending on build)
  { id: 99006, name: 'ATK_MATK_Composite', displayName: '物攻/魔攻', description: '物理攻撃力/魔法攻撃力 (複合)' },
  { id: 99005, name: 'STR_INT_AGI_Composite', displayName: '筋力/知力/敏捷', description: '筋力/知力/敏捷 (複合)' },

  // Passive effect activations (type 3 in EffectConfig, value=1 = activation flag)
  { id: 2300020, name: 'EliteStrike_Passive', displayName: '精鋭ダメージ強化', description: '精鋭ダメージ強化効果' },
  { id: 2300070, name: 'LifeCondense_Passive', displayName: 'HP凝縮効果', description: 'HP凝縮パッシブ効果' },
  { id: 2300080, name: 'LifeSteal_Passive', displayName: 'HP吸収効果', description: 'HP吸収パッシブ効果' },
  { id: 2300120, name: 'SpecialAttack_Passive', displayName: '特殊属性ダメージ強化', description: '特殊属性ダメージ強化効果' },
  { id: 2300220, name: 'PhysDamage_Passive', displayName: '物理ダメージ強化', description: '物理ダメージ強化効果' },
  { id: 2300310, name: 'MagicDamage_Passive', displayName: '魔法ダメージ強化', description: '魔法ダメージ強化効果' },
  { id: 2300410, name: 'MasteryHeal_Passive', displayName: 'マスタリー回復強化', description: 'マスタリー回復強化効果' },
  { id: 2300420, name: 'SpecialHeal_Passive', displayName: '特殊回復強化', description: '特殊回復強化効果' },
  { id: 2300620, name: 'DMGStack_Passive', displayName: '与ダメージ上昇', description: '与ダメージ上昇効果' },
  { id: 2300820, name: 'FinalProtection_Passive', displayName: '絶境守護効果', description: '絶境守護パッシブ効果' },
  { id: 2302020, name: 'Agile_Passive', displayName: '敏捷効果', description: '敏捷パッシブ効果' },
  { id: 2302120, name: 'TeamLuckCrit_Passive', displayName: '会心/幸運強化', description: 'パーティ会心/幸運強化効果' },
  { id: 2302320, name: 'FirstAid_Passive', displayName: '応急処置効果', description: '応急処置パッシブ効果' },
  { id: 2302420, name: 'LifeWave_Passive', displayName: 'HP変動効果', description: 'HP変動パッシブ効果' },
];

export const STAT_MAP = new Map(STAT_MAPPINGS.map(s => [s.id, s]));

// Set of stat IDs that use 万分率 (value / 100 = %)
const PERCENTAGE_STATS = new Set([
  11392, // 防御無視
  11722, // 攻撃速度
  11732, // 詠唱速度
  12512, // 会心ダメージ
  12742, // 会心回復
  12532, // 幸運ダメージ
  12722, // 幸運回復
  12562, // 物理軽減
  12582, // 魔法軽減
  11324, // HP%
]);

export function getStatName(statId: number): string {
  return STAT_MAP.get(statId)?.displayName || `不明なステータス (${statId})`;
}

// Set of stat IDs that are passive activation flags (value=1 means active)
const PASSIVE_ACTIVATION_STATS = new Set([
  2300020, 2300070, 2300080, 2300120, 2300220, 2300310,
  2300410, 2300420, 2300620, 2300820, 2302020, 2302120,
  2302320, 2302420,
]);

export function isPassiveActivation(statId: number): boolean {
  return PASSIVE_ACTIVATION_STATS.has(statId);
}

export function formatStatValue(statId: number, value: number): string {
  // Passive activation flags: show "発動" instead of numeric value
  if (PASSIVE_ACTIVATION_STATS.has(statId)) {
    return '発動';
  }
  // For percentage stats (万分率), divide by 100 and add %
  if (PERCENTAGE_STATS.has(statId)) {
    return `+${(value / 100).toFixed(1)}%`;
  }
  return `+${value}`;
}
