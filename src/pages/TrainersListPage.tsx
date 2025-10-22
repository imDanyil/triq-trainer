import React from "react";
import { Link } from "react-router-dom";
import { trainers } from "../configs/trainersConfig";
import "../styles/TrainersListPage.css";

const TrainersListPage: React.FC = () => {
  return (
    <div className="trainers-list-page">
      <div className="page-header">
        <h1>Всі Тренажери TRIQ: Розвивайся Без Обмежень.</h1>
        <p>
          Обирай вправи для покращення логіки, пам'яті, уваги та швидкості
          реакції. Кожен челендж — це крок до твого інтелектуального максимуму.
        </p>
      </div>

      <div className="trainers-list">
        {trainers.map((trainer) => (
          <Link to={trainer.path} key={trainer.id} className="trainer-card">
            <div className="card-content">
              <h2>{trainer.name}</h2>
              <p>{trainer.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainersListPage;
