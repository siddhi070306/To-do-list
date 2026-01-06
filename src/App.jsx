import React from 'react';
import { Layout } from './components/Layout';
import { TaskList } from './components/TaskList';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <>
      <Layout>
        {(activeTab) => (
          <>
            {activeTab === 'tasks' && <TaskList />}
            {activeTab === 'dashboard' && <Dashboard />}
          </>
        )}
      </Layout>
    </>
  );
}

export default App;
