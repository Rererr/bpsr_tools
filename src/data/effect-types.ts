// Effect name mapping (English to Japanese)
export const EFFECT_NAME_MAP: Record<string, string> = {
  'Agile': '敏捷',
  'Agility Boost': '敏捷強化',
  'Armor': '物理耐性',
  'Attack SPD': '集中・攻撃速度',
  'Cast Focus': '集中・詠唱',
  'Crit Focus': '集中・会心',
  'DMG Stack': '極・ダメージ増強',
  'Elite Strike': '精鋭打撃',
  'Final Protection': '極・絶境守護',
  'First Aid': '極・応急処置',
  'Healing Boost': 'マスタリー回復強化',
  'Healing Enhance': '特攻回復強化',
  'Intellect Boost': '知力強化',
  'Life Condense': '極・HP凝縮',
  'Life Steal': '極・HP吸収',
  'Life Wave': '極・HP変動',
  'Luck Focus': '集中・幸運',
  'Resistance': '魔法耐性',
  'Special Attack': '特効ダメージ強化',
  'Strength Boost': '筋力強化',
  'Team Luck & Crit': '極・幸運会心',
};

// Unique effect names extracted from ModEffectTable
export const EFFECT_TYPES = [
  'Agile',
  'Agility Boost',
  'Armor',
  'Attack SPD',
  'Cast Focus',
  'Crit Focus',
  'DMG Stack',
  'Elite Strike',
  'Final Protection',
  'First Aid',
  'Healing Boost',
  'Healing Enhance',
  'Intellect Boost',
  'Life Condense',
  'Life Steal',
  'Life Wave',
  'Luck Focus',
  'Resistance',
  'Special Attack',
  'Strength Boost',
  'Team Luck & Crit',
];

// Get Japanese name for effect
export function getEffectNameJP(effectName: string): string {
  return EFFECT_NAME_MAP[effectName] || effectName;
}

// Effect name to stat ID mapping for simplified version
export const EFFECT_TO_STAT_ID: Record<string, number> = {
  'Strength Boost': 11012,      // 筋力
  'Agility Boost': 11032,       // 敏捷
  'Agile': 11032,               // 敏捷
  'Intellect Boost': 11022,     // 知力
  'Special Attack': 11332,      // 攻撃力
  'Armor': 11342,               // 防御力
  'Resistance': 11342,          // 防御力
  'Attack SPD': 11382,          // 攻撃速度
  'Crit Focus': 11362,          // クリティカル率
  'DMG Stack': 11372,           // クリティカルダメージ
  'Life Condense': 11302,       // HP
  'Life Wave': 11302,           // HP
  'Life Steal': 11302,          // HP (簡略化)
  'Healing Boost': 11302,       // HP (簡略化)
  'Healing Enhance': 11302,     // HP (簡略化)
  'First Aid': 11302,           // HP (簡略化)
  'Final Protection': 11342,    // 防御力 (簡略化)
  'Cast Focus': 11022,          // 知力 (簡略化)
  'Luck Focus': 11362,          // クリティカル率 (簡略化)
  'Team Luck & Crit': 11362,    // クリティカル率 (簡略化)
  'Elite Strike': 11332,        // 攻撃力 (簡略化)
};

// Effect types that have link bonuses (based on モジュールリンク追加効果.TXT)
export const LINK_BONUS_EFFECTS = new Set([
  'Strength Boost',      // 筋力強化
  'Agility Boost',       // 敏捷強化
  'Intellect Boost',     // 知力強化
  'Special Attack',      // 特攻ダメージ強化
  'Elite Strike',        // 精鋭打撃
  'DMG Stack',           // 極・ダメージ増強
  'Crit Focus',          // 集中・会心
  'Luck Focus',          // 集中・幸運
  'Attack SPD',          // 集中・攻撃速度
  'Cast Focus',          // 集中・詠唱
  'Life Steal',          // 極・HP吸収
  'Life Wave',           // 極・HP変動
  'Team Luck & Crit',    // 極・幸運会心
  'Armor',               // 物理耐性
  'Resistance',          // 魔法耐性
  'Final Protection',    // 極・絶境守護
  'Healing Enhance',     // 特攻回復強化
  'Healing Boost',       // マスタリー回復強化
  'Life Condense',       // 極・HP凝縮
  'First Aid',           // 極・応急処置
]);
