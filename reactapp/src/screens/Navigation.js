import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../App.css";
import LandingScreen from "./LandingScreen";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import MyProfile from "./MyProfile";
import UserProfileScreen from "./UserProfileScreen";
import EditProfilScreen from "./EditProfilScreen";
import InvitationScreen from "./InvitationScreen";
import SettingsScreen from "./SettingsScreen";
import NotifScreen from "./NotifScreen";
import MyInvitations from "./MyInvitations";
import MyForkys from "./MyForkys";
import Home from "./Home";

const Navigation = ({ setReduxUser, userState }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUser = () => {
      var tokenStorage = localStorage.getItem("userToken");
      console.log("Hello", tokenStorage);
      setToken(tokenStorage);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserDB = async () => {
      if (token) {
        var rawResponse = await fetch(`/get-user?token=` + token);

        const jsonResponse = await rawResponse.json();

        setReduxUser({
          pseudo: jsonResponse.user.name,
          id: jsonResponse.user._id,
          token: jsonResponse.user.token,
        });
        setToken(jsonResponse.user.token);
      }
    };
    getUserDB();
  }, [token]);

  return userState.token ? (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={MyProfile} path="/my-profile" />
      <Route component={MyInvitations} path="/my-invitations" />
      <Route component={UserProfileScreen} path="/user-profile" />
      <Route component={EditProfilScreen} path="/edit-profile" />
      <Route component={InvitationScreen} path="/invitation" />
      <Route component={NotifScreen} path="/notifs" />
      <Route component={SettingsScreen} path="/settings" />
    </Switch>
  ) : (
    <Switch>
      <Route component={LandingScreen} path="/" exact />
      <Route component={SignUpScreen} path="/signup" />
      <Route component={SignInScreen} path="/signin" />
    </Switch>
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
  return { userState: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
