import { useGameStore } from './store/useGameStore';
import { MainMenu } from './features/game/components/MainMenu';
import { AcademyView } from './features/campaign/components/AcademyView';
import { SurvivalView } from './features/survival/components/SurvivalView';
import './App.css';

function App() {
  const { phase, mode } = useGameStore();

  return (
    <div className="app-container">
      {phase === 'MENU' && <MainMenu />}

      {phase === 'PLAYING' && mode === 'ACADEMY' && (
        <AcademyView />
      )}

      {phase === 'PLAYING' && mode === 'SURVIVAL' && (
        <SurvivalView />
      )}
    </div>
  )
}

export default App
