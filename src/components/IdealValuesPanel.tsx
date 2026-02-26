import { useEffect } from 'react';
import { useModuleContext } from '../contexts/ModuleContext';
import { UI_TEXT } from '../data/ui-text';
import { getLinkThreshold, loadIdealLevels, saveIdealLevels } from '../utils/storage';
import { LinkLevelGap } from '../types/presets';

function IdealValuesPanel() {
  const { state, dispatch } = useModuleContext();
  const { linkBonuses, idealLevels } = state;

  // Load ideal levels on mount
  useEffect(() => {
    const saved = loadIdealLevels();
    if (saved.length > 0) {
      dispatch({ type: 'SET_IDEAL_LEVELS', levels: saved });
    }
  }, [dispatch]);

  // Filter out Global Link (基礎ステータスボーナス) - it's a different concept
  const filteredBonuses = linkBonuses.filter(bonus => bonus.effectName !== 'Global Link');

  // Calculate gaps for all link bonuses with targets
  const gaps: LinkLevelGap[] = filteredBonuses.map(bonus => {
    const ideal = idealLevels.find(l => l.effectName === bonus.effectName);
    const targetLv = ideal?.targetLv ?? 0;
    const targetLinkValue = getLinkThreshold(targetLv);

    return {
      effectName: bonus.effectName,
      effectNameJP: bonus.effectNameJP,
      currentLinkValue: bonus.linkLevel,
      currentLv: bonus.activatedLevel,
      targetLv,
      targetLinkValue,
      gap: Math.max(0, targetLinkValue - bonus.linkLevel),
    };
  });

  const handleTargetChange = (effectName: string, effectNameJP: string, newTargetLv: number) => {
    dispatch({
      type: 'SET_IDEAL_LEVEL',
      effectName,
      effectNameJP,
      targetLv: newTargetLv,
    });
  };

  const handleSaveTargets = () => {
    saveIdealLevels(idealLevels);
  };

  const handleClearTargets = () => {
    dispatch({ type: 'CLEAR_IDEAL_LEVELS' });
    saveIdealLevels([]);
  };

  if (filteredBonuses.length === 0) {
    return null;
  }

  return (
    <div className="ideal-values-panel">
      <h3 className="ideal-values-title">{UI_TEXT.idealValues}</h3>

      <div className="ideal-values-list">
        {gaps.map(gap => {
          const hasTarget = gap.targetLv > 0;
          const isAchieved = hasTarget && gap.currentLv >= gap.targetLv;
          const progressPercent = hasTarget
            ? Math.min(100, (gap.currentLinkValue / gap.targetLinkValue) * 100)
            : 0;

          return (
            <div key={gap.effectName} className="ideal-value-item">
              <div className="ideal-value-header">
                <span className="ideal-value-name">{gap.effectNameJP}</span>
                <div className="ideal-value-lv-display">
                  <span className="current-lv">{UI_TEXT.currentLv}.{gap.currentLv}</span>
                  <span className="lv-arrow">→</span>
                  <span className="target-lv-label">{UI_TEXT.targetLv}.</span>
                  <select
                    className="target-lv-select"
                    value={gap.targetLv}
                    onChange={e => handleTargetChange(gap.effectName, gap.effectNameJP, parseInt(e.target.value))}
                  >
                    <option value={0}>-</option>
                    {[1, 2, 3, 4, 5, 6].map(lv => (
                      <option key={lv} value={lv}>{lv}</option>
                    ))}
                  </select>
                </div>
              </div>

              {hasTarget && (
                <div className="ideal-value-progress">
                  <div className="progress-info">
                    <span className="progress-values">
                      ({gap.currentLinkValue}/{gap.targetLinkValue})
                    </span>
                    {isAchieved ? (
                      <span className="progress-achieved">{UI_TEXT.achieved} ✓</span>
                    ) : (
                      <span className="progress-remaining">
                        {UI_TEXT.remaining} {gap.gap} {UI_TEXT.points}
                      </span>
                    )}
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${isAchieved ? 'achieved' : ''}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ideal-values-actions">
        <button className="ideal-button save" onClick={handleSaveTargets}>
          {UI_TEXT.saveTarget}
        </button>
        <button className="ideal-button clear" onClick={handleClearTargets}>
          {UI_TEXT.clearTargets}
        </button>
      </div>
    </div>
  );
}

export default IdealValuesPanel;
