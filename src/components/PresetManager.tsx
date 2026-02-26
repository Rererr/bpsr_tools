import { useState, useEffect } from 'react';
import { useModuleContext } from '../contexts/ModuleContext';
import { UI_TEXT } from '../data/ui-text';
import { SavedPreset } from '../types/presets';
import { loadAllPresets, savePreset, deletePreset, serializeState } from '../utils/storage';

function PresetManager() {
  const { state, dispatch } = useModuleContext();
  const [presets, setPresets] = useState<SavedPreset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    setPresets(loadAllPresets());
  }, []);

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: SavedPreset = {
      id: crypto.randomUUID(),
      name: newPresetName.trim(),
      slots: serializeState(state.slots),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    savePreset(newPreset);
    setPresets(loadAllPresets());
    setNewPresetName('');
  };

  const handleLoadPreset = (preset: SavedPreset) => {
    dispatch({
      type: 'LOAD_PRESET',
      presetId: preset.id,
      presetName: preset.name,
      slots: preset.slots,
    });
    setSelectedPresetId(preset.id);
  };

  const handleDeletePreset = (presetId: string) => {
    if (!window.confirm(UI_TEXT.confirmDelete)) return;

    deletePreset(presetId);
    setPresets(loadAllPresets());

    if (selectedPresetId === presetId) {
      setSelectedPresetId(null);
      dispatch({ type: 'CLEAR_COMPARISON_BASE' });
    }
  };

  return (
    <div className="preset-manager">
      <h3 className="preset-manager-title">{UI_TEXT.savedPresets}</h3>

      <div className="preset-list">
        {presets.length === 0 ? (
          <div className="preset-empty">{UI_TEXT.noPresets}</div>
        ) : (
          presets.map(preset => (
            <div
              key={preset.id}
              className={`preset-item ${selectedPresetId === preset.id ? 'selected' : ''}`}
            >
              <span className="preset-radio">
                {selectedPresetId === preset.id ? '●' : '○'}
              </span>
              <span className="preset-name">{preset.name}</span>
              <div className="preset-actions">
                <button
                  className="preset-button load"
                  onClick={() => handleLoadPreset(preset)}
                >
                  {UI_TEXT.loadPreset}
                </button>
                <button
                  className="preset-button delete"
                  onClick={() => handleDeletePreset(preset.id)}
                >
                  {UI_TEXT.deletePreset}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="preset-save-form">
        <input
          type="text"
          className="preset-name-input"
          placeholder={UI_TEXT.presetName}
          value={newPresetName}
          onChange={e => setNewPresetName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSavePreset()}
        />
        <button
          className="preset-button save"
          onClick={handleSavePreset}
          disabled={!newPresetName.trim()}
        >
          {UI_TEXT.save}
        </button>
      </div>
    </div>
  );
}

export default PresetManager;
