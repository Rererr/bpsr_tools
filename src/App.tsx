import { useState, useEffect } from 'react'
import { ModuleProvider } from './contexts/ModuleContext'
import { loadGameData } from './data/loader'
import { GameData } from './types/game-data'
import { UI_TEXT } from './data/ui-text'
import ModuleSlot from './components/ModuleSlot'
import ResultsDisplay from './components/ResultsDisplay'
import PresetManager from './components/PresetManager'
import IdealValuesPanel from './components/IdealValuesPanel'

function App() {
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGameData()
      .then(data => {
        setGameData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load game data:', err)
        setError(UI_TEXT.errorLoadingData)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="app loading">
        <div className="loading-message">{UI_TEXT.loadingData}</div>
      </div>
    )
  }

  if (error || !gameData) {
    return (
      <div className="app error">
        <div className="error-message">{error || UI_TEXT.errorLoadingData}</div>
      </div>
    )
  }

  return (
    <ModuleProvider gameData={gameData}>
      <div className="app">
        <header className="app-header">
          <div className="app-header-icon">M</div>
          <h1>{UI_TEXT.pageTitle}</h1>
          <p className="app-description">{UI_TEXT.pageDescription}</p>
        </header>

        <main className="app-main">
          <div className="module-panel">
            <ModuleSlot slotId="slot-0" slotNumber={1} gameData={gameData} />
            <ModuleSlot slotId="slot-1" slotNumber={2} gameData={gameData} />
            <ModuleSlot slotId="slot-2" slotNumber={3} gameData={gameData} />
            <ModuleSlot slotId="slot-3" slotNumber={4} gameData={gameData} />
          </div>

          <div className="results-panel">
            <ResultsDisplay />
            <PresetManager />
            <IdealValuesPanel />
          </div>
        </main>
      </div>
    </ModuleProvider>
  )
}

export default App
