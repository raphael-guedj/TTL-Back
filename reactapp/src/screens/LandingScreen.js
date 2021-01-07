import React, { useState } from "react";
import "../App.css";
import { Input, Button, Divider } from "antd";
import { Link, Redirect } from "react-router-dom";

function LandingScreen() {
  return (
    <div>
      <div className="Landing-page">
        <div className="Connect">
          <p className="Title1">Déjeuner, Rencontrer, Recommencer...</p>
          <Button
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
            <Link to="/signin"> Se connecter </Link>
          </Button>
          <div id="divider" style={{ width: "50%" }}>
            <Divider
              style={{
                color: "white",
                marginBottom: 20,
                marginTop: 30,
                width: "10%",
              }}
            >
              ou
            </Divider>
          </div>
          <Button
            className="Button"
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
            <Link to="/signup"> Créer un compte </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;
