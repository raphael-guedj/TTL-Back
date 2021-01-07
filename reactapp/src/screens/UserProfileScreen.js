import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../App.css";
import { FiEdit, FiMapPin } from "react-icons/fi";
import Nav from "./Nav";
import Footer from "./Footer";
import { List, Avatar, Badge, Card, Icon, Button, Checkbox } from "antd";

const UserProfileScreen = ({ userState, location }) => {
  const [language, setLanguage] = useState(true);
  const [food, setFood] = useState([]);

  const handleinvit = async () => {
    let rawResponse = await fetch(`/mydataprofile?id=${userState.id}`);
    let response = await rawResponse.json();
  };

  const { Meta } = Card;
  const userInfo = location.state;

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
        <h2 className="Title2">Profil</h2>
      </div>
      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#418581",
            marginTop: 10,
            padding: 0,
            width: 500,
          }}
        >
          <Meta
            style={{
              display: "flex",
              alignItems: "center",
            }}
            avatar={
              <Badge
                status={userInfo.isConnected ? "success" : "error"}
                dot
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                }}
              >
                <Avatar size={130} src={userInfo.photo} />
              </Badge>
            }
            title={userInfo.name}
            description={userInfo.profession}
          />

          <Meta />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          ></div>

          <h6
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: -23,
            }}
          >
            <FiMapPin style={{ color: "#F9B34C" }} /> {userInfo.city} {" - "}
            {userInfo.arrondissement}
          </h6>
        </Card>
      </div>
      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#418581",
            marginTop: 10,
            padding: 0,
            width: 500,
          }}
        >
          <h6> Langue(s) parlée(s): </h6>
          {userInfo.language.map((lang, i) => (
            <Checkbox key={i} checked={true}>
              {lang}
            </Checkbox>
          ))}
        </Card>
      </div>

      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#418581",
            marginTop: 10,
            padding: 0,
            width: 500,
          }}
        >
          <h6> Mes envies: </h6>
          {userInfo.wish1 && (
            <Checkbox title="Rencontrer de nouvelles personnes" checked={true}>
              Rencontrer de nouvelles personnes
            </Checkbox>
          )}
          {userInfo.wish2 && (
            <Checkbox title="Découvrir un nouveau métier" checked={true}>
              Découvrir un nouveau métier
            </Checkbox>
          )}
          {userInfo.wish3 && (
            <Checkbox
              title="Recherche d'opportunités professionnelles"
              checked={true}
            >
              Recherche d'opportunités professionnelles
            </Checkbox>
          )}
          {userInfo.wish4 && (
            <Checkbox title="Se reconvertir professionnellement" checked={true}>
              Se reconvertir professionnellement
            </Checkbox>
          )}
          {userInfo.wish5 && (
            <Checkbox title="Déconnecter du travail" checked={true}>
              Déconnecter du travail
            </Checkbox>
          )}
          {userInfo.wish6 && (
            <Checkbox
              title="Découvrir le quartier et ses alentours"
              checked={true}
            >
              Découvrir le quartier et ses alentours
            </Checkbox>
          )}
        </Card>
      </div>
      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#418581",
            marginTop: 10,
            padding: 0,
            width: 500,
          }}
        >
          <h6> À propos: </h6>

          <div>
            <p>{userInfo.description}</p>
          </div>
        </Card>
      </div>
      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#418581",
            marginTop: 10,
            padding: 0,
            width: 500,
          }}
        >
          <h6> Cuisine(s) favorite(s): </h6>
          {userInfo.food.map((food, i) => (
            <Checkbox key={i} title={food} checked={true}>
              {food}
            </Checkbox>
          ))}
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 15,
        }}
      >
        <Button
          onClick={() => handleinvit()}
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
          <Link to={{ pathname: "/invitation", state: userInfo }}>
            Envoyer une invitation
          </Link>
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
          <Link to="/home"> Retour à l'accueil </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(UserProfileScreen);
