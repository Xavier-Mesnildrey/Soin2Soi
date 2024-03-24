import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./index.scss";

export default () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const register = async () => {
    if (!username || !email || !password || !passwordConfirmation) {
      return;
    }

    if (password !== passwordConfirmation) {
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BACKEND_URL}/register`,
      { email, password, username }
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
        <div className="welcome-contenair">
          <p className="welcome">Bienvenue</p>
          <p>Venez prendre soin de vous</p>
        </div>

        <form className="content">
          <h2>Inscription</h2>
          <input
            className="textarea"
            type="email"
            name="email"
            placeholder="example@yahoo.fr"
            autoComplete="off"
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className="textarea"
            type="name"
            name="username"
            placeholder="nom d'utilisateur"
            autoComplete="off"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="textarea"
            type={"password"}
            name="password"
            placeholder="mot de passe"
            autoComplete="off"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className="textarea"
            type={"password"}
            name="confirmPassword"
            placeholder="confirmez le mot de passe"
            autoComplete="off"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          {password === passwordConfirmation ? (
            ""
          ) : (
            <p>Les mots de passe ne sont pas identiques</p>
          )}

          <button
            type="button"
            className="btn registerBtn"
            onClick={() => register()}
          >
            S'inscrire
          </button>
        </form>
      </section>
    </main>
  );
};
