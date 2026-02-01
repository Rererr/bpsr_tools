// Module type name mapping (English to Japanese)
export const MODULE_TYPE_NAME_MAP: Record<string, string> = {
  'Attack': '攻撃型',
  'Other': '支援型',
  'Guard': '防御型',
};

// Module name mapping (English to Japanese)
export const MODULE_NAME_MAP: Record<string, string> = {
  // Attack modules
  'Basic Attack Module': '基本型攻撃モジュール',
  'Advanced Attack Module': '高性能攻撃モジュール',
  'Excellent Attack Module': '卓越型攻撃モジュール',

  // Support modules (Other type)
  'Basic Support Module': '基本型支援モジュール',
  'Advanced Support Module': '高性能支援モジュール',
  'Excellent Support Module': '卓越型支援モジュール',

  // Guard/Defense modules
  'Basic Guard Module': '基本型防御モジュール',
  'Advanced Guard Module': '高性能防御モジュール',
  'Excellent Guard Module': '卓越型防御モジュール',
};

// Get Japanese name for module type
export function getModuleTypeNameJP(typeName: string): string {
  return MODULE_TYPE_NAME_MAP[typeName] || typeName;
}

// Get Japanese name for module
export function getModuleNameJP(moduleName: string): string {
  return MODULE_NAME_MAP[moduleName] || moduleName;
}
