import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { useCookies } from "react-cookie";
import Footer from "../../components/Footer/index";

export default () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie] = useCookies(["token"]);

  // récupérer le cookies token, et s'il existe on redirige directement sur la page home
  if (cookies.token) {
    navigate("/accueil");
  }

  const login = async () => {
    if (!email || !password) {
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BACKEND_URL}/login`,
      { email, password }
    );
    if (!data.accessToken) {
      return;
    }
    // ajouter le token dans les cookies
    setCookie("token", `BEARER ${data.accessToken}`);
    // redirige moi vers la page d'accueil
    navigate("/accueil");
  };

  return (
    <main>
      <section className="login-out-register">
        <header className="welcome-contenair">
          <h1 className="welcome">Bienvenue</h1>
          <p>Venez prendre soin de vous</p>
        </header>
        <div></div>

        <form className="content">
          <h2>Connexion</h2>

          <input
            className="textarea"
            type="text"
            name="email"
            placeholder="votre email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="textarea"
            id="password"
            type="password"
            name="password"
            placeholder="Votre mot de passe"
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className="no-registed">Mot de passe oublié ?</p>
          <button
            type="button"
            className="btn registerBtn"
            onClick={() => login()}
          >
            Se connecter
          </button>
          <p className="no-registed">
            Tu n'as pas encore de compte ?
            <br />
            <Link to="/inscription">Créer le maintenant ! </Link>
          </p>
        </form>
        <footer>
        <Footer />
        </footer>
      </section>
    </main>
  );
};
