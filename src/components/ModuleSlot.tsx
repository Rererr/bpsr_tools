import { useModuleContext } from '../contexts/ModuleContext'
import { GameData } from '../types/game-data'
import { UI_TEXT } from '../data/ui-text'
import ModuleSelector from './ModuleSelector'
import EffectSelector from './EffectSelector'

interface ModuleSlotProps {
  slotId: string;
  slotNumber: number;
  gameData: GameData;
}

function ModuleSlot({ slotId, slotNumber, gameData }: ModuleSlotProps) {
  const { state, dispatch } = useModuleContext()

  const currentSlot = state.slots.find(s => s.id === slotId)
  const hasModule = currentSlot?.moduleId !== null

  const handleClear = () => {
    if (confirm(`スロット${slotNumber}をクリアしますか？`)) {
      dispatch({ type: 'CLEAR_SLOT', slotId })
    }
  }

  return (
    <div className={`module-slot ${hasModule ? 'has-module' : ''}`}>
      <div className="module-slot-header">
        <div className="module-slot-number">
          <div className="slot-badge">{slotNumber}</div>
          <span className="module-slot-title">
            {UI_TEXT.moduleSlot} {slotNumber}
          </span>
        </div>
        <button
          className="clear-button"
          onClick={handleClear}
          disabled={!hasModule}
        >
          {UI_TEXT.clear}
        </button>
      </div>

      <ModuleSelector slotId={slotId} gameData={gameData} />

      {hasModule && (
        <div className="effects-container">
          <EffectSelector slotId={slotId} effectIndex={0} gameData={gameData} />
          <EffectSelector slotId={slotId} effectIndex={1} gameData={gameData} />
          <EffectSelector slotId={slotId} effectIndex={2} gameData={gameData} />
        </div>
      )}
    </div>
  )
}

export default ModuleSlot
