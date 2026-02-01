import { useState } from 'react'
import { GameData } from '../types/game-data'
import { UI_TEXT } from '../data/ui-text'
import { useModuleContext } from '../contexts/ModuleContext'
import { getModuleTypeNameJP } from '../data/name-mappings'

interface ModuleSelectorProps {
  slotId: string;
  gameData: GameData;
}

function ModuleSelector({ slotId, gameData }: ModuleSelectorProps) {
  const { dispatch } = useModuleContext()
  const [selectedType, setSelectedType] = useState<number | null>(null)

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value)
    setSelectedType(typeId || null)

    // Auto-select first module of the selected type
    if (typeId) {
      const modulesOfType = Array.from(gameData.modules.values()).filter(m => m.ModType === typeId)
      if (modulesOfType.length > 0) {
        const module = modulesOfType[0]
        dispatch({
          type: 'SET_MODULE',
          slotId,
          moduleId: module.Id,
          moduleName: module.Name,
          moduleType: module.ModType,
        })
      }
    }
  }

  return (
    <div className="module-selector">
      <div className="form-group">
        <label className="form-label">パワーコアタイプ</label>
        <select value={selectedType || ''} onChange={handleTypeChange}>
          <option value="">{UI_TEXT.selectModuleType}</option>
          {Array.from(gameData.moduleTypes.values())
            .filter(type => type.Id >= 1 && type.Id <= 3) // Only Attack(1), Other(2), Guard(3)
            .map(type => (
              <option key={type.Id} value={type.Id}>
                {getModuleTypeNameJP(type.Name)}
              </option>
            ))}
        </select>
      </div>

    </div>
  )
}

export default ModuleSelector
