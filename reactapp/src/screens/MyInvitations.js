import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import moment from "moment";
import { Card, Button, Divider, Modal } from "antd";
import { FiCheckCircle } from "react-icons/fi";

const MyInvitations = ({ userState }) => {
  const [userInvitSent, setUserInvitSent] = useState([]);
  const [userInvitReceived, setUserInvitReceived] = useState([]);

  const getInvitSent = async () => {
    let rawResponse = await fetch(`/invitsent?id=${userState.id}`);
    let response = await rawResponse.json();
    // console.log("invit receive", response);
    setUserInvitSent(response.invit);
  };

  useEffect(() => {
    getInvitSent();
  }, []);

  const getInvitReceived = async () => {
    let rawResponse = await fetch(`/invitreceived?id=${userState.id}`);
    let response = await rawResponse.json();
    console.log("invit receive", response);
    setUserInvitReceived(response.invit);
  };

  useEffect(() => {
    getInvitReceived();
  }, []);

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
        <h2 className="Title2">Invitations envoyées</h2>
      </div>
      <div className="Card">
        {userInvitSent.map((invit) => (
          <div className="Card">
            <Card
              style={{
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 5,
                borderColor: "#418581",
                marginTop: 10,
                padding: 0,
                width: 400,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#F9B34C" }}
                  />
                  <h6>Date du rendez-vous: </h6>
                  <p className="Invit-text">
                    {" "}
                    {moment(invit.date).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#F9B34C" }}
                  />
                  <h6>Heure du rendez-vous: </h6>
                  <p className="Invit-text">
                    {" "}
                    {(invit.heure == 12 && "12h") ||
                      (invit.heure == 12.5 && "12h30") ||
                      (invit.heure == 13 && "13h") ||
                      (invit.heure == 13.5 && "13h30") ||
                      (invit.heure == 14 && "14h")}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#F9B34C" }}
                  />
                  <h6>Lieu du rendez-vous:</h6>
                  <p className="Invit-text"> {invit.lieu_propose}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#F9B34C" }}
                  />
                  <h6>Adresse du rendez-vous:</h6>
                  <p className="Invit-text"> {invit.adresse}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#F9B34C" }}
                  />
                  <h6>Message:</h6>
                  <p className="Invit-text">{invit.message}</p>
                </div>
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
                    backgroundColor: "grey",
                    margin: 10,
                    width: 200,
                    borderRadius: 20,
                    border: "none",
                  }}
                  type="primary"
                  size="small"
                >
                  En attente de confirmation
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div>
        <div className="Connect">
          <div id="divider" style={{ width: "50%" }}>
            <Divider
              style={{
                color: "black",
                marginBottom: 15,
                width: "10%",
              }}
            >
              ou
            </Divider>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 15,
        }}
      >
        <h2 className="Title2">Invitations reçues</h2>
      </div>
      <div className="Card">
        {userInvitReceived.map((invit) => (
          <div className="Card">
            <Card
              style={{
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 5,
                borderColor: "#F9B34C",
                marginTop: 10,
                padding: 0,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#418581" }}
                  />
                  <h6>Date du rendez-vous: </h6>
                  <p className="Invit-text">
                    {" "}
                    {moment(invit.date).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#418581" }}
                  />
                  <h6>Heure du rendez-vous: </h6>
                  <p className="Invit-text">
                    {" "}
                    {(invit.heure == 12 && "12h") ||
                      (invit.heure == 12.5 && "12h30") ||
                      (invit.heure == 13 && "13h") ||
                      (invit.heure == 13.5 && "13h30") ||
                      (invit.heure == 14 && "14h")}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#418581" }}
                  />
                  <h6>Lieu du rendez-vous:</h6>
                  <p className="Invit-text"> {invit.lieu_propose}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#418581" }}
                  />
                  <h6>Adresse du rendez-vous:</h6>
                  <p className="Invit-text"> {invit.adresse}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FiCheckCircle
                    style={{ marginTop: 3, marginRight: 5, color: "#418581" }}
                  />
                  <h6>Message:</h6>
                  <p className="Invit-text">{invit.message}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 35,
                }}
              >
                <Link to="/notifs">
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
                    Valider
                  </Button>
                </Link>
                <Link to="/">
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
                    Refuser
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(MyInvitations);
