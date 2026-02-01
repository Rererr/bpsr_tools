import { useModuleContext } from '../contexts/ModuleContext'
import { GameData } from '../types/game-data'
import { EFFECT_TO_STAT_ID, getEffectNameJP } from '../data/effect-types'
import { getAvailableEffects, getModuleQuality, ModuleType } from '../data/module-effect-mapping'
import { UI_TEXT } from '../data/ui-text'
import { useMemo } from 'react'

interface EffectSelectorProps {
  slotId: string;
  effectIndex: number;
  gameData: GameData;
}

function EffectSelector({ slotId, effectIndex, gameData }: EffectSelectorProps) {
  const { state, dispatch } = useModuleContext()

  const currentSlot = state.slots.find(s => s.id === slotId)
  const currentEffect = currentSlot?.effects[effectIndex]

  // Get available effects based on module type and quality
  const availableEffects = useMemo(() => {
    if (!currentSlot?.moduleId) {
      return [];
    }

    // Get module info from gameData
    const moduleInfo = gameData.modules.get(currentSlot.moduleId);
    if (!moduleInfo) {
      return [];
    }

    const moduleType = moduleInfo.ModType as ModuleType;
    const quality = getModuleQuality(moduleInfo.InitializationId);

    // Get available effects for this module type, quality, and slot
    return getAvailableEffects(moduleType, quality, effectIndex);
  }, [currentSlot?.moduleId, effectIndex, gameData]);

  const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const effectName = e.target.value
    const statId = EFFECT_TO_STAT_ID[effectName] || 0

    dispatch({
      type: 'SET_EFFECT',
      slotId,
      effectIndex,
      effectName,
      statId,
      value: currentEffect?.value || 0,
    })
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0

    dispatch({
      type: 'SET_EFFECT',
      slotId,
      effectIndex,
      effectName: currentEffect?.effectName || '',
      statId: currentEffect?.statId || 0,
      value: Math.min(10, Math.max(0, value)), // Clamp to 0-10
    })
  }

  return (
    <div className="effect-selector">
      <div>
        <label className="effect-label">{UI_TEXT.effect} {effectIndex + 1}</label>
        <select
          value={currentEffect?.effectName || ''}
          onChange={handleEffectChange}
        >
          <option value="">{UI_TEXT.selectEffectType}</option>
          {availableEffects.map(effectType => (
            <option key={effectType} value={effectType}>
              {getEffectNameJP(effectType)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="effect-label">{UI_TEXT.value}</label>
        <input
          type="number"
          min="0"
          max="10"
          step="1"
          value={currentEffect?.value || 0}
          onChange={handleValueChange}
          disabled={!currentEffect?.effectName}
        />
      </div>
    </div>
  )
}

export default EffectSelector
