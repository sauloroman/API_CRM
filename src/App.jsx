import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Init from './pages/Init';
import NewClient from './pages/NewClient';
import EditClient from './pages/EditClient';
import ViewClient from './pages/ViewClient';

const App = () => {
  return (
    <HashRouter>
      <Routes>
    
        <Route path="/clientes" element={<Layout />}>
          <Route index element={ <Init /> } />
          <Route path="nuevo" element={ <NewClient /> } />
          <Route path="editar/:id" element={ <EditClient /> } />
          <Route path=":id" element={ <ViewClient /> } />
        </Route>

      </Routes>
    </HashRouter>
  )
}

export default App;