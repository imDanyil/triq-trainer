import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { trainersMap } from "../configs/trainersConfig";
import "../styles/TrainerPage.css";

const TrainerPage: React.FC = () => {
  const { trainerId } = useParams<{ trainerId: string }>();

  if (!trainerId) {
    return <Navigate to="/" />;
  }

  const currentTrainer = trainersMap[trainerId];

  if (!currentTrainer) {
    return (
      <div>
        <h1>Тренажер не знайдено</h1>
        <p>На жаль, тренажера за адресою "{trainerId}" не існує.</p>
      </div>
    );
  }

  const { title, description, Component: TrainerComponent } = currentTrainer;

  return (
    <div className="trainer-page__container">
      <div className="page-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {/* <div className="game-wrapper"> */}
      <TrainerComponent />
      {/* </div> */}
    </div>
  );
};

export default TrainerPage;
