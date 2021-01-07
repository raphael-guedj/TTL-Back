import React, { useState, useEffect } from "react";
import "../App.css";
import { Card, Button, Avatar } from "antd";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FiSettings } from "react-icons/fi";

const MyProfile = ({ userState }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(`/getmydata?id=${userState.id}`);
      let response = await rawResponse.json();

      response.myUser.name && setName(response.myUser.name);
      response.myUser.profession && setJob(response.myUser.profession);
      response.myUser.city && setCity(response.myUser.city);
      response.myUser.photo && setPhoto(response.myUser.photo);
    };
    getUser();
  }, []);

  const { Meta } = Card;

  return (
    <div>
      <Nav />
      <Link to="/settings">
        <Button type="link">
          <div
            style={{
              marginTop: 15,
              marginLeft: 30,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FiSettings
              size={20}
              style={{ marginRight: 10, color: "#F9B34C" }}
            />

            <h6>Réglages</h6>
          </div>
        </Button>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 15,
        }}
      >
        <h2 className="Title2">Mon profil</h2>
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
            <Meta
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              avatar={
                <Avatar
                  style={{
                    marginLeft: 20,
                  }}
                  size={150}
                  src={photo}
                />
              }
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: 20,
              }}
            >
              <h6> Prénom: </h6>
              <p>{name != "" ? name : "Non renseigné"}</p>

              <h6> Ville: </h6>
              <p>{city != "" ? city : "Non renseigné"}</p>

              <h6> Profession: </h6>
              <p>{job != "" ? job : "Non renseigné"}</p>
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
        <Link to="/edit-profile">
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
            Modifier mon profil
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
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(MyProfile);
