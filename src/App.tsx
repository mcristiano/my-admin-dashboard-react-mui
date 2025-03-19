import * as React from 'react';
    import { Routes, Route, BrowserRouter } from 'react-router-dom';
    import { menuItems } from './app/components/menu/menuItems';
    import Layout from './app/layout/Layout';
    import { generateRoutes } from '@/utils/generateRoutes';

    function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {generateRoutes(menuItems)}
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;
