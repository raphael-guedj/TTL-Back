import React, { useState, useEffect } from "react";
import "../App.css";
import { Card, Icon, Modal, Button, Avatar } from "antd";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const NotifScreen = ({}) => {
  return (
    <div>
      <Nav />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 15,
        }}
      >
        <h2 className="Title2">Mes notifs</h2>
      </div>
      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#F9B34C",
            marginTop: 10,
            padding: 0,
            width: 500,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: 20,
              }}
            >
              <h6> Bientôt disponible ! </h6>
            </div>
          </div>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 35,
        }}
      >
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
          <Link to="/home"> Retour à l'accueil </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default NotifScreen;
