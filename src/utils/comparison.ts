import { CalculationResult } from '../types/module-state';
import { StatDifference } from '../types/presets';

export function calculateDifferences(
  baseResults: CalculationResult[],
  currentResults: CalculationResult[]
): StatDifference[] {
  const differences: StatDifference[] = [];

  // Build a map of base results by statName
  const baseMap = new Map<string, number>();
  baseResults.forEach(result => {
    baseMap.set(result.statName, result.totalValue);
  });

  // Build a map of current results by statName
  const currentMap = new Map<string, number>();
  currentResults.forEach(result => {
    currentMap.set(result.statName, result.totalValue);
  });

  // Get all unique stat names
  const allStats = new Set([...baseMap.keys(), ...currentMap.keys()]);

  // Calculate differences
  allStats.forEach(statName => {
    const previousValue = baseMap.get(statName) ?? 0;
    const currentValue = currentMap.get(statName) ?? 0;
    const delta = currentValue - previousValue;

    if (delta !== 0) {
      differences.push({
        statName,
        previousValue,
        currentValue,
        delta,
      });
    }
  });

  // Sort by absolute delta (largest changes first)
  differences.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  return differences;
}
