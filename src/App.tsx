import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import WorldMap from './pages/WorldMap';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="map" element={<WorldMap />} />
        {/* Placeholder for future routes */}
        <Route path="rewards" element={<div className="text-white text-center text-2xl font-bold pt-20">Rewards Coming Soon! 🌟</div>} />
      </Route>
    </Routes>
  );
}

export default App;
