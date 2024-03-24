import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./index.scss";

export default () => {
  const [filteredCares, setFilteredcares] = useState([]);

  // State pour stocker la valeur sélectionnée de la liste déroulante
  const [selectedConditionId, setSelectedConditionId] = useState(0);
  const [selectedCityId, setSelectedCityId] = useState(0);

  // State pour stocker la liste d'options provenant du fichier JSON
  const [conditionData, setConditionData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [cookies, setCookie] = useCookies(["token"]);

  const fetchCondition = async () => {
    console.log(cookies);
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BACKEND_URL}/conditions`,
      { headers: { Authorization: cookies.token } }
    );

    if (!data) {
      throw new Error("Failed to fetch data");
    }
    if (!data.length) {
      return;
    }
    // Utilisation des données importées directement
    setConditionData(data);
  };
  const fetchCity = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BACKEND_URL}/cities`,
      { headers: { Authorization: cookies.token } }
    );

    if (!data) {
      throw new Error("Failed to fetch data");
    }
    if (!data.length) {
      return;
    }
    // Utilisation des données importées directement
    setCityData(data);
  };

  // Utilisation de useEffect pour charger les options du fichier JSON une seule fois lors du montage du composant
  useEffect(() => {
    // Fonction asynchrone pour charger les données depuis le fichier JSON
    // Appel de la fonction fetchData pour charger les données
    if (!conditionData.length) {
      fetchCondition();
    }
    if (!cityData.length) {
      fetchCity();
    }
  }, [conditionData, cityData, filteredCares]);

  // Gestionnaire d'événements pour la sélection d'une option
  const handleOptionChange = (event) => {
    setSelectedConditionId(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setSelectedCityId(event.target.value);
  };

  const getCaresByConditionAndCity = async (conditionId, cityId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BACKEND_URL}/cares?conditionId=${conditionId}&cityId=${cityId}`,
      { headers: { Authorization: cookies.token } }
    );
    if (!data) {
      throw new Error("Failed to fetch data");
    }

    setFilteredcares(data);
  };

  const renderFilteredCares = () =>
    filteredCares.map(
      ({ id, name, description, placeNames = [], placeDescriptions = [] }) => (
        <div key={id}>
          <h3>{name}</h3>
          <p>{description}</p>
          <ul>
            {placeNames.map((place, i) => (
              <li key={i}>
                {place}
                <br />
                {placeDescriptions[i]}
              </li>
            ))}
          </ul>
        </div>
      )
    );

  return (
    <main>
      <section className="home">
        <form action="content">
          <select
            className="textarea"
            value={selectedConditionId}
            onChange={handleOptionChange}
          >
            <option value="">Comment vous sentez-vous ?</option>
            {/* Mapping à travers les options pour les afficher dans la liste déroulante */}
            {conditionData.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
          <select
            className="textarea"
            value={selectedCityId}
            onChange={handleOptionChange2}
          >
            <option value="">Votre ville ?</option>
            {/* Mapping à travers les options pour les afficher dans la liste déroulante */}
            {cityData.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn"
            disabled={!selectedConditionId || !selectedCityId}
            onClick={() =>
              getCaresByConditionAndCity(selectedConditionId, selectedCityId)
            }
          >
            Valider
          </button>
          <div>{renderFilteredCares()}</div>
        </form>
      </section>
      <footer />
    </main>
  );
};
