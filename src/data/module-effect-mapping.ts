// Mapping of module type and quality to available effects
// Based on モジュールの能力付与確率.TXT

export type ModuleQuality = 'basic' | 'advanced' | 'excellent';
export type ModuleType = 1 | 2 | 3; // 1=Attack, 2=Support, 3=Guard


// Map InitializationId to quality
export function getModuleQuality(initializationId: number): ModuleQuality {
  if (initializationId === 101) return 'basic';
  if (initializationId === 102) return 'advanced';
  if (initializationId === 103) return 'excellent';
  return 'basic';
}

// Get available effects for a given module type, quality, and slot
export function getAvailableEffects(
  moduleType: ModuleType,
  quality: ModuleQuality,
  slotIndex: number
): string[] {
  // Basic and Advanced modules (all slots same)
  if (quality === 'basic' || quality === 'advanced') {
    if (moduleType === 1) { // Attack
      return [
        'Strength Boost',
        'Agility Boost',
        'Intellect Boost',
        'Special Attack',
        'Elite Strike',
        'Cast Focus',
        'Attack SPD',
        'Crit Focus',
        'Luck Focus',
      ];
    } else if (moduleType === 2) { // Support
      return [
        'Healing Enhance',
        'Healing Boost',
        'Cast Focus',
        'Attack SPD',
        'Crit Focus',
        'Luck Focus',
      ];
    } else if (moduleType === 3) { // Guard
      return [
        'Resistance',
        'Armor',
        'Cast Focus',
        'Attack SPD',
        'Crit Focus',
        'Luck Focus',
      ];
    }
  }

  // Excellent modules (1st slot vs 2nd/3rd slots)
  if (quality === 'excellent') {
    if (moduleType === 1) { // Attack
      if (slotIndex === 0) { // 1st slot
        return [
          'Strength Boost',
          'Agility Boost',
          'Intellect Boost',
          'Special Attack',
          'Elite Strike',
          'Cast Focus',
          'Attack SPD',
          'Crit Focus',
          'Luck Focus',
          'DMG Stack',        // 極
          // 'Adaptability',  // 極・適応力 (not in current data)
          'Life Wave',        // 極
          'Life Steal',       // 極
        ];
      } else { // 2nd/3rd slots
        return [
          'Strength Boost',
          'Agility Boost',
          'Intellect Boost',
          'Special Attack',
          'Elite Strike',
          'Cast Focus',
          'Attack SPD',
          'Crit Focus',
          'Luck Focus',
        ];
      }
    } else if (moduleType === 2) { // Support
      if (slotIndex === 0) { // 1st slot
        return [
          'Healing Enhance',
          'Healing Boost',
          'Cast Focus',
          'Attack SPD',
          'Crit Focus',
          'Luck Focus',
          'Life Condense',    // 極
          'First Aid',        // 極
          'Life Wave',        // 極
          'Life Steal',       // 極
          'Team Luck & Crit', // 極
        ];
      } else { // 2nd/3rd slots
        return [
          'Healing Enhance',
          'Healing Boost',
          'Cast Focus',
          'Attack SPD',
          'Crit Focus',
          'Luck Focus',
        ];
      }
    } else if (moduleType === 3) { // Guard
      if (slotIndex === 0) { // 1st slot
        return [
          'Resistance',
          'Armor',
          'Cast Focus',
          'Attack SPD',
          'Crit Focus',
          'Luck Focus',
          'Final Protection', // 極
          'Life Wave',        // 極
          'Life Steal',       // 極
        ];
      } else { // 2nd/3rd slots
        return [
          'Resistance',
          'Armor',
          'Cast Focus',
          'Attack SPD',
          'Crit Focus',
          'Luck Focus',
        ];
      }
    }
  }

  return [];
}
