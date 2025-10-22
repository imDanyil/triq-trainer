import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppRoutes } from "./configs/routesConfig";
import Header from "./components/Header";
import "./App.css";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const isScrollablePage = ["/"].includes(location.pathname);

  return (
    <div className={isScrollablePage ? "app__scroll-wrapper" : "app__content"}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {Object.values(AppRoutes).map(({ key, path, Component }) => (
            <Route
              key={key}
              path={path}
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Component />
                </motion.div>
              }
            />
          ))}
          {/* <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/schulte"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SchultePage />
              </motion.div>
            }
          />
          <Route
            path="/stroop"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <StroopPage />
              </motion.div>
            }
          />
          <Route
            path="/instant-recall"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <InstantRecallPage />
              </motion.div>
            }
          />
          <Route
            path="/stats"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <StatsPage />
              </motion.div>
            }
          /> */}
        </Routes>
      </AnimatePresence>
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
