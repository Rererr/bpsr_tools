import { useModuleContext } from '../contexts/ModuleContext';
import { UI_TEXT } from '../data/ui-text';
import { calculateDifferences } from '../utils/comparison';

function DiffDisplay() {
  const { state, dispatch } = useModuleContext();
  const { comparisonBase, results } = state;

  if (!comparisonBase) {
    return null;
  }

  const differences = calculateDifferences(comparisonBase.results, results);

  const handleClearComparison = () => {
    dispatch({ type: 'CLEAR_COMPARISON_BASE' });
  };

  return (
    <div className="diff-display">
      <div className="diff-header">
        <h3 className="diff-title">
          {UI_TEXT.changesFromBase}
          <span className="diff-base-name">({UI_TEXT.comparedTo}: {comparisonBase.presetName})</span>
        </h3>
        <button className="diff-clear-button" onClick={handleClearComparison}>
          {UI_TEXT.clearComparison}
        </button>
      </div>

      {differences.length === 0 ? (
        <div className="diff-empty">{UI_TEXT.noChanges}</div>
      ) : (
        <div className="diff-list">
          {differences.map(diff => (
            <div key={diff.statName} className="diff-item">
              <span className="diff-stat-name">{diff.statName}</span>
              <span className={`diff-value ${diff.delta > 0 ? 'diff-increase' : 'diff-decrease'}`}>
                {diff.delta > 0 ? '+' : ''}{diff.delta}
                <span className="diff-arrow">{diff.delta > 0 ? '▲' : '▼'}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiffDisplay;
