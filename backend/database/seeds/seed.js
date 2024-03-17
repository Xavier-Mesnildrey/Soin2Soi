import "dotenv/config";

// Import database client
import database from "../client/client";

import Client from "../client";

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
  // [] => array.map / array.forEach / array.push
  // {} => object.Entries();
  // for (let index = 0; index < conditionsData.length; index++) {
  //   await client.conditions.create(conditionsData[i]);
  // }
  // Pour de meilleur performance, on utiliserait une fonction createMany pour faire une seul insertion à la place de plusieurs create comme ceux-ci
  conditionsData.forEach(async (value) => client.conditions.create(value));
  caresData.forEach(async (value) => client.cares.create(value));
  placesData.forEach(async (value) => client.places.create(value));
  carePlaceData.forEach(async (value) => client.carePlace.create(value));
  conditionCareData.forEach(async (value) =>
    client.conditionCareData.create(value)
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
