import { GameData, ModTableEntry, ModTypeEntry, ModEffectEntry, ModLinkEffectEntry } from '../types/game-data';

export async function loadGameData(): Promise<GameData> {
  const base = import.meta.env.BASE_URL;

  // Load all JSON files in parallel
  const [modTableData, modTypeData, modEffectData, modLinkEffectData] = await Promise.all([
    fetch(`${base}data/modules/ModTable.json`).then(r => r.json()),
    fetch(`${base}data/modules/ModTypeTable.json`).then(r => r.json()),
    fetch(`${base}data/modules/ModEffectTable.json`).then(r => r.json()),
    fetch(`${base}data/modules/ModLinkEffectTable.json`).then(r => r.json()),
  ]);

  // Convert to Maps for efficient lookup
  const modules = new Map<number, ModTableEntry>(
    Object.entries(modTableData).map(([key, value]) => [parseInt(key), value as ModTableEntry])
  );

  const moduleTypes = new Map<number, ModTypeEntry>(
    Object.entries(modTypeData).map(([key, value]) => [parseInt(key), value as ModTypeEntry])
  );

  const effects = new Map<number, ModEffectEntry>(
    Object.entries(modEffectData).map(([key, value]) => [parseInt(key), value as ModEffectEntry])
  );

  const linkEffects = new Map<number, ModLinkEffectEntry>(
    Object.entries(modLinkEffectData).map(([key, value]) => [parseInt(key), value as ModLinkEffectEntry])
  );

  // Index effects by name for easier dropdown population
  const effectsByName = new Map<string, ModEffectEntry[]>();
  effects.forEach(effect => {
    const name = effect.EffectName;
    if (!effectsByName.has(name)) {
      effectsByName.set(name, []);
    }
    effectsByName.get(name)!.push(effect);
  });

  return { modules, moduleTypes, effects, effectsByName, linkEffects };
}
