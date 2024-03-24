import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  authenticate = async ({ email, password }) => {
    // verifier que l'utilisateur existe en base de données
    const user = await this.client.users.findByEmail(email);
    if (!user) {
      throw new Error("Wrong credentials");
    }

    // on vérifier que le mot de passe est bien identique à celui en base de données
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Wrong credentials");
    }

    // créer le jeton de connexion avec la clé secrète JWT_SECRET
    const token = jwt.sign({ sub: { id: user.id } }, process.env.JWT_SECRET);

    // renvoyer le token d'accès (access_token)
    return token;
  };

  // Décode le token pour vérifier que l'utilisateur fait bien parti du système
  validate = async (req, res, next) => {
    // on récupère le token depuis le header depuis la clé authorization

    // bearer token  - "BEARER fosgipjfgqeklgiovqeklngopibsq,dkljbnmdfk.z" => [BEARER, ikqpofvioqjgqiopjviqpojvp]
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const {
      sub: { id },
    } = decodedToken;

    if (!id) {
      return res.status(400).json({ message: "Bad token" });
    }

    const user = await this.client.users.findById(id).catch((err) => {
      throw new Error(err);
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // on va à la prochaine fonction si elle existe
    next();
  };
}
