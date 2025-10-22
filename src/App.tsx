import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppRoutes } from "./configs/routesConfig";
import Header from "./components/Header";
import "./App.css";

const AnimatedRoutes = () => {
  const location = useLocation();
  const isScrollablePage = ["/"].includes(location.pathname);

  return (
    <div className={isScrollablePage ? "app__scroll-wrapper" : "app__content"}>
      <Routes location={location} key={location.pathname}>
        {Object.values(AppRoutes).map(({ key, path, Component }) => (
          <Route
            key={key}
            path={path}
            element={
              <Component />
            }
          />
        ))}
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
