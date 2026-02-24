import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects  from './pages/Projects';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Board from './pages/Board';
import Team from './pages/Team';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="board" element={<Board />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;