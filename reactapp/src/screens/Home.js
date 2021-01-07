import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { List, Avatar, Badge, Card, Icon } from "antd";
import Nav from "./Nav";
import Footer from "./Footer";
import { connect } from "react-redux";

const Home = ({ userState }) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(`/alluser?id=${userState.id}`);
      let response = await rawResponse.json();
      // console.log(response);
      setListUser(response.userExcl);
    };
    getUser();
  }, []);

  const { Meta } = Card;

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
        <h2 className="Title2">Déjeuner, Rencontrer, Recommencer...</h2>
      </div>
      <div className="Card">
        {listUser.map((user, i) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to={{ pathname: "/user-profile", state: user }}>
              <Card
                style={{
                  width: 300,
                  margin: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 5,
                  borderColor: "#F9B34C",
                  marginTop: 10,
                  padding: 0,
                }}
                actions={["Proposer un déjeuner"]}
              >
                <Meta
                  avatar={
                    <Badge
                      status={user.isConnected ? "success" : "error"}
                      dot
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 10,
                      }}
                    >
                      <Avatar size={80} src={user.photo} />
                    </Badge>
                  }
                  title={user.name}
                  description={user.profession}
                  // description={
                  //   Math.floor(Math.random() * 20) + 1 + " " + "déjeuners"
                  // }
                />

                <div>
                  <p>
                    {user.arrondissement} {"-"} {user.city}
                  </p>
                  {/* <p>Situé à {Math.floor(Math.random() * 999)}m</p> */}
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  // console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(Home);
