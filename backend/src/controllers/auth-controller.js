import { authService } from "../services";

export default class {
  constructor() {
    this.service = authService;
  }

  signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return (
        res
          // BAD REQUEST - MISSING INFORMATION
          .status(400)
          .json({ message: "Email ou mot de passe manquant" })
      );
    }

    const accessToken = await this.service
      .authenticate({ email, password })
      .catch((err) => {
        throw new Error(err);
      });

    if (!accessToken) {
      // NOT FOUND
      return res.status(404);
    }
    return res.status(200).json({ accessToken });
  };
}
