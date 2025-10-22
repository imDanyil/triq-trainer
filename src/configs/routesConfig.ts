import React from "react";
import HomePage from "../pages/HomePage";
import TrainersListPage from "../pages/TrainersListPage";
import TrainerPage from "../pages/TrainerPage";
import StatsPage from "../pages/StatsPage";
import NotFoundPage from "../pages/NotFoundPage";
import { routePaths } from "./routePaths";

// Описуємо тип для одного маршруту
interface AppRoute {
  key: string;
  path: string;
  name: string;
  Component: React.FC;
}

export const AppRoutes: Record<string, AppRoute> = {
  home: {
    key: "home",
    path: routePaths.home,
    name: "Головна",
    Component: HomePage,
  },
  trainersList: {
    key: "trainersList",
    path: routePaths.trainersList,
    name: "Тренажери",
    Component: TrainersListPage,
  },
  trainerPage: {
    key: "trainerPage",
    path: routePaths.trainer,
    name: "Тренажер",
    Component: TrainerPage,
  },
  statsPage: {
    key: "statsPage",
    path: routePaths.stats,
    name: "Статистика",
    Component: StatsPage,
  },
  notFound: {
    key: "notFound",
    path: routePaths.notFound,
    name: "Не знайдено",
    Component: NotFoundPage,
  },
};
