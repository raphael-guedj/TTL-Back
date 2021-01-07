import React, { useState } from "react";
import "../App.css";
import { Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SignUpScreen = ({ setReduxUser }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleSignUp = async () => {
    setPasswordError(false);
    setSignupError(false);
    setEmptyField(false);
    if (
      pseudo !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (password === passwordConfirm) {
        setPasswordError(false);
        let rawResponse = await fetch("/sign-up", {
          method: "post",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `name=${pseudo}&email=${email}&password=${password}`,
        });

        let response = await rawResponse.json();
        console.log("utilisateur créé", response);
        if (response.result) {
          setReduxUser({
            pseudo: response.user.name,
            id: response.user._id,
            token: response.user.token,
          });
          setIsLogin(true);
          localStorage.setItem("userToken", response.user.token);

          setSignupError(false);
        } else {
          setSignupError(true);
        }
      } else {
        setPasswordError(true);
      }
    } else {
      setEmptyField(true);
    }
  };

  return (
    <div className="Login-page">
      {isLogin ? <Redirect to="/" /> : null}
      {/* SIGN-UP */}

      <div className="Sign">
        <h2 className="Title">INSCRIPTION</h2>
        <Input
          placeholder="Prénom"
          className="Login-input"
          onChange={(e) => setPseudo(e.target.value)}
          // leftIcon={<Feather name="edit" size={20} color="#fbfcfd" />}
        />
        <Input
          placeholder="E-mail"
          className="Login-input"
          onChange={(e) => setEmail(e.target.value)}
          // leftIcon={<Entypo name="email" size={20} color="#fbfcfd" />}
        />
        <Input.Password
          placeholder="Mot de passe"
          className="Login-input"
          onChange={(e) => setPassword(e.target.value)}
          // leftIcon={<Feather name="eye-off" size={20} color="#fbfcfd" />}
        />
        <Input.Password
          placeholder="Confirmez mot de passe"
          className="Login-input"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          // leftIcon={<Feather name="eye-off" size={20} color="#fbfcfd" />}
        />
        {passwordError && <p>Les deux mots de passe ne sont pas identiques</p>}
        {signupError && <p>L'email existe déjà en base de donnée</p>}
        {emptyField && <p>L'un des champs est vide.</p>}
        <Link to="/">
          <Button
            onClick={() => {
              handleSignUp();
              setPassword("");
              setPasswordConfirm("");
            }}
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
        </Link>
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

export default connect(null, mapDispatchToProps)(SignUpScreen);
