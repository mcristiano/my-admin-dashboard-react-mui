import React from 'react';
import { Route } from 'react-router-dom';

interface RouteRendererProps {
  routes: React.ReactNode[];
}

const RouteRenderer: React.FC<RouteRendererProps> = ({ routes }) => {
  return (
    <>
      {routes.map((route, index) => (
        <React.Fragment key={index}>{route}</React.Fragment>
      ))}
    </>
  );
};

export default RouteRenderer;
