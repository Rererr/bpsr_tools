import { useState } from 'react'
import { useModuleContext } from '../contexts/ModuleContext'
import { UI_TEXT } from '../data/ui-text'
import { formatStatValue } from '../data/stat-mappings'
import { formatLinkValue } from '../utils/calculator'

type TabType = 'summary' | 'details'

function ResultsDisplay() {
  const { state } = useModuleContext()
  const { results, linkBonuses } = state
  const [activeTab, setActiveTab] = useState<TabType>('summary')

  // Calculate total link level
  const totalLinkLevel = linkBonuses.reduce((sum, bonus) => sum + bonus.linkLevel, 0)

  // Calculate main stats summary from results
  const mainStats = ['攻力', '知力', '精神', '耐久力']
  const mainStatResults = results.filter(r => mainStats.includes(r.statName))

  if (results.length === 0 && linkBonuses.length === 0) {
    return (
      <div className="results-display">
        <h2 className="results-title">{UI_TEXT.resultsTitle}</h2>
        <div className="results-empty">
          <div className="results-empty-icon">M</div>
          <div className="results-empty-text">{UI_TEXT.noResults}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="results-display">
      <h2 className="results-title">{UI_TEXT.resultsTitle}</h2>

      {/* Link Summary - like official UI */}
      <div className="link-summary">
        <div className="link-total">
          <div className="link-total-value">{totalLinkLevel}</div>
          <div className="link-total-label">リンク効果</div>
        </div>
        {mainStatResults.length > 0 && (
          <div className="link-stats">
            {mainStatResults.map(stat => (
              <div key={stat.statName} className="link-stat-row">
                <span className="link-stat-name">{stat.statName}</span>
                <span className="link-stat-value">{formatLinkValue(stat.totalValue)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tab buttons */}
      <div className="results-tabs">
        <button
          className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          一覧
        </button>
        <button
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          詳細
        </button>
      </div>

      {activeTab === 'summary' ? (
        <>
          {/* Link Bonuses Section */}
          {linkBonuses.length > 0 && (
            <div className="link-bonuses-section">
              <h3 className="section-title">リンク効果</h3>
              <div className="link-bonuses-list">
                {linkBonuses.map((bonus, index) => (
                  <div key={index} className="link-bonus-item">
                    <div className="link-bonus-header">
                      <span className="link-bonus-name">{bonus.effectNameJP}</span>
                      <span className="link-bonus-level">
                        Lv.{bonus.activatedLevel} (リンク +{bonus.linkLevel})
                        {bonus.toNextLevel !== null && (
                          <span className="link-bonus-next"> 次Lv まで{bonus.toNextLevel}</span>
                        )}
                      </span>
                    </div>
                    {bonus.bonusEffects.length > 0 && (
                      <div className="link-bonus-effects">
                        {bonus.bonusEffects.map((effect, idx) => (
                          <div key={idx} className="link-bonus-effect">
                            {effect.statName}: {formatStatValue(effect.statId, effect.value)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Detailed view - show contributions */}
          {results.length > 0 && (
            <div className="stats-section">
              <h3 className="section-title">詳細内訳</h3>
              <div className="results-list">
                {results.map(result => {
                  // Group contributions by slot
                  const contributionsBySlot: Record<string, number> = {}
                  result.contributions.forEach(contrib => {
                    if (!contributionsBySlot[contrib.slotId]) {
                      contributionsBySlot[contrib.slotId] = 0
                    }
                    contributionsBySlot[contrib.slotId] += contrib.value
                  })

                  // Format contribution text
                  const contributionText = Object.entries(contributionsBySlot)
                    .map(([slotId, value]) => {
                      const slotNumber = parseInt(slotId.replace('slot-', '')) + 1
                      return `スロット${slotNumber}: ${value}`
                    })
                    .join(', ')

                  return (
                    <div key={result.statName} className="result-item">
                      <div className="result-header">
                        <span className="result-stat-name">{result.statName}</span>
                        <span className="result-total-value">{formatLinkValue(result.totalValue)}</span>
                      </div>
                      {contributionText && (
                        <div className="result-contributions">
                          {UI_TEXT.contribution}: {contributionText}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ResultsDisplay
