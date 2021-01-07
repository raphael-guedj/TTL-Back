import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { Card, Button, Modal, Divider } from "antd";

const SettingsScreen = ({ setReduxUser, user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogOut = async () => {
    await fetch(`/logout?token=${user.token}`);

    localStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
    setIsLogin(false);
  };

  const handleDeleteUser = async () => {
    await fetch(`/delete-user?id=${user.id}`);

    localStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
    setIsLogin(false);
  };

  return (
    <div>
      {!isLogin ? <Redirect to="/" /> : null}
      <Nav />
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
          <h6>À propos</h6>
          <Divider />

          <div>
            <p>Nous contacter</p>
            <p>Règles d'utilisation</p>
            <p>Qui sommes nous ?</p>
          </div>
        </Card>
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
          <h6>Mentions légales</h6>
          <Divider />

          <div>
            <p>Préférences de confidentialité</p>
            <p>Politique de confidentialité</p>
            <p>Conditions d'utilisation</p>
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
        <div>
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
              onClick={() => handleLogOut()}
            >
              Se déconnecter
            </Button>
          </Link>
        </div>
      </div>
      <div className="Card">
        <img
          style={{ width: 80, height: 80 }}
          src={require("../assets/Logo_Forky_dark.png")}
        />
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
          onClick={showModal}
          style={{
            backgroundColor: "#f5b3b3",
            margin: 10,
            width: 200,
            borderRadius: 20,
            border: "none",
          }}
          type="primary"
          size="large"
        >
          Supprimer mon compte
        </Button>
      </div>

      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal
          visible={isModalVisible}
          onOk={() => handleDeleteUser()}
          onCancel={handleCancel}
          okText="Oui, j'ai pris ma décision"
          cancelText="Non, je veux continuer à déjeuner"
        >
          <p>Êtes-vous sur de vouloir supprimer votre compte ?</p>
        </Modal>
      </div>
      <Footer />
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

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
