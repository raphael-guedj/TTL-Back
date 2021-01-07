import React, { useState } from "react";
import "../App.css";
import { Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SignInScreen = ({ setReduxUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseOk, setResponseOk] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  // Méthode POST
  // Utilisation d'une route en POST pour envoyer les infos saisi par l'utilisateur et les envoyer à la bdd via le back

  const handleSignIn = async () => {
    let rawResponse = await fetch("/sign-in", {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });

    // rawResponse.json
    // Permet de convertir les informations envoyées depuis le back au format JSON(lisible en javascript).
    let response = await rawResponse.json();
    // console.log(response);
    if (response.result) {
      setResponseOk(true);
      setIsLogin(true);
      setReduxUser({
        pseudo: response.userExists.name,
        id: response.userExists._id,
        token: response.userExists.token,
      });
      localStorage.setItem("userToken", response.userExists.token);

      // navigation.navigate("Carousel");
    } else {
      setResponseOk(false);
      setEmail("");
      setPassword("");
    }

    // if (response.userExists.token) {
    //   return <Redirect to="/home" />;
    // }
  };

  return (
    <div className="Login-page">
      {isLogin ? <Redirect to="/" /> : null}
      {/* SIGN-IN */}
      <div className="Sign">
        <h2 className="Title">CONNEXION</h2>

        <Input
          onChange={(e) => setEmail(e.target.value)}
          className="Login-input"
          placeholder="email"
        />

        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          className="Login-input"
          placeholder="Mot de passe"
        />

        {/* {tabErrorsSignin} */}

        <Button
          onClick={() => handleSignIn()}
          style={{
            backgroundColor: "#F9B34C",
            margin: 10,
            width: 200,
            borderRadius: 20,
            border: "none",
          }}
          type="primary"
          size="large"
        >
          C'est parti !
        </Button>
        <Button
          style={{
            backgroundColor: "#418581",
            margin: 10,
            width: 200,
            borderRadius: 20,
            border: "none",
          }}
          type="primary"
          size="large"
        >
          <Link to="/"> Retour </Link>
        </Button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignInScreen);
