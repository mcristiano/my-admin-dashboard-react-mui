import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './app/layout/Layout';
import { generateRoutes } from '@/utils/generateRoutes.ts';
import getMenuItems from '@/config/menuConfig';

function App() {
  const menuItems = getMenuItems();
  const routes = generateRoutes(menuItems);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, index) => (
            <React.Fragment key={index}>{route}</React.Fragment>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
