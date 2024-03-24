import "dotenv/config";

// Import database client
import database from "../client/client";

import Client from "../client";

import citiesData from "./static-data/city-data.json";
import conditionsData from "./static-data/condition-data.json";
import caresData from "./static-data/care-data.json";
import placesData from "./static-data/place-data.json";
import carePlaceData from "./static-data/care-place-data.json";
import conditionCareData from "./static-data/condition-care-data.json";

// Load environment variables from .env file

// Initialiser le client (class)
const client = new Client();

const seed = async () => {
  // supprime les données existantes des tables
  await database.query("DELETE FROM users");
  await database.query("DELETE FROM conditions");
  await database.query("DELETE FROM cities");
  await database.query("DELETE FROM cares");
  await database.query("DELETE FROM places");

  // Insérer données dans table
  await Promise.all(
    citiesData.map(async (value) => client.cities.create(value))
  );
  await Promise.all(
    conditionsData.map(async (value) => client.conditions.create(value))
  );
  await Promise.all(caresData.map(async (value) => client.cares.create(value)));
  await Promise.all(
    placesData.map(async (value) => client.places.create(value))
  );
  await Promise.all(
    carePlaceData.map(async (value) => client.carePlace.create(value))
  );
  await Promise.all(
    conditionCareData.map(async (value) => client.conditionCare.create(value))
  );

  // 1ère étape
  // TODO faire l'insertion des données pour toutes les tables

  // 2ème étape
  // créer les queries pour les tables de relations
  // INSERT INTO care_place (care_id, place_id) VALUES (1, 1)

  console.info("seeding done");

  // 3ème étape
  // utiliser les queries des tables de relations
};

// Run the seed function
seed();
