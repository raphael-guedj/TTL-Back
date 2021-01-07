import { connect } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import moment from "moment";
import { FiMapPin } from "react-icons/fi";
import { Form } from "react-bootstrap";
import {
  Card,
  Button,
  Badge,
  Avatar,
  Input,
  Select,
  Slider,
  DatePicker,
} from "antd";

const InvitationScreen = ({ location, userState }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [duration, setDuration] = useState(1);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [dateError, setDateError] = useState(false);
  const [hours, setHours] = useState(12);
  const [kitchen, setKitchen] = useState("");
  const [locate, setLocate] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow();
  //   currentDate.setHours(23, 59, 59);
  //   console.log(currentDate);
  //   if (currentDate < Date.now()) {
  //     setDateError(true);
  //     setDate(currentDate);
  //   } else {
  //     setDateError(false);
  //     setDate(currentDate);
  //   }
  // };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const sendInvitation = async () => {
    if (true) {
      let rawResponse = await fetch(`/new-invitation`, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `message=${inputMessage}&duration=${duration}&date=${date}&hour=${hours}&kitchen=${kitchen}&location=${locate}&address=${address}&sender=${userState.id}&receiver=${userInfo._id}`,
      });

      var responseJSON = await rawResponse.json();
      if (responseJSON.response) {
        console.log("new invitation created !");
      }
    } else {
      setErrorMessage(true);
    }
  };

  const marks = {
    0: "",
    0.5: "30min",
    1: "1h",
    1.5: "1h30",
    2: "2h",
  };

  function onChangeDate(date) {}
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
        <h2 className="Title2">Invitation</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: 500,
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 5,
            borderColor: "#418581",
            marginTop: 10,
            padding: 0,
          }}
        >
          <Meta
            avatar={
              <Badge
                status={userInfo.isConnected ? "success" : "error"}
                dot
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                }}
              >
                <Avatar size={100} src={userInfo.photo} />
              </Badge>
            }
            title={userInfo.name}
            description={userInfo.profession}
          />

          <h6>
            <FiMapPin style={{ color: "#F9B34C" }} /> {userInfo.city} {" - "}
            {userInfo.arrondissement}
          </h6>
        </Card>
      </div>

      <div>
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
            <h6> Envoyer un message : </h6>
            <div>
              <Input.TextArea
                style={{
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 0,
                  height: 130,
                  width: 400,
                }}
                onChange={(e) => setInputMessage(e.target.value)}
                defaultValue={inputMessage}
                maxLength={300}
                minLength={80}
                placeholder={
                  "Ajoutez des détails pour faciliter la rencontre..."
                }
              />
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
            <h6>Combien de temps avez-vous ?</h6>

            <Slider
              marks={marks}
              step={4}
              defaultValue={duration}
              max={2}
              step={null}
              onChange={(e) => setDuration(e)}
              tooltipVisible={false}
            />
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
            <h6> Heure proposée : </h6>
            <Form>
              <Form.Group controlId="Select hour">
                <Form.Control
                  as="select"
                  style={{ width: 400 }}
                  defaultValue={hours}
                  onChange={(item) => setHours(item.target.value)}
                >
                  <option value={12} label="12h">
                    12h
                  </option>
                  <option value={12.5} label="12h30">
                    12h30
                  </option>
                  <option value={13} label="13h">
                    13h
                  </option>
                  <option value={13.5} label="13h30">
                    13h30
                  </option>
                  <option value={14} label="14h">
                    14h
                  </option>
                </Form.Control>
              </Form.Group>
            </Form>
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
            <h6> Date proposée : </h6>
            <DatePicker
              defaultValue={moment("2021-01-01", "YYYY-MM-DD")}
              onChange={(item) => setDate(item._d)}
              placeholder="Choisissez une date"
            />
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
            <h6> Choisir une cuisine : </h6>
            <Form
              style={{ width: 400 }}
              defaultValue={kitchen}
              onChange={(item) => setKitchen(item.target.value)}
            >
              <Form.Group controlId="Select kitchen">
                <Form.Control as="select">
                  <option value="Africain" label="Africain">
                    Africain
                  </option>
                  <option value="Arménien" label="Arménien">
                    Arménien
                  </option>
                  <option value="Asiatique" label="Asiatique">
                    Asiatique
                  </option>
                  <option value="Casher" label="Casher">
                    Casher
                  </option>
                  <option value="Cuisine saine" label="Cuisine saine">
                    Cuisine saine
                  </option>
                  <option value="Espagnol" label="Espagnol">
                    Espagnol
                  </option>
                  <option value="Fast food" label="Fast food">
                    Fast food
                  </option>
                  <option value="Français" label="Français">
                    Français
                  </option>
                  <option value="Halal" label="Halal">
                    Halal
                  </option>
                  <option value="Italien" label="Italien">
                    Italien
                  </option>
                  <option value="Indien" label="Indien">
                    Indien
                  </option>
                  <option value="Libanais" label="Libanais">
                    Libanais
                  </option>
                  <option value="Méditérranéen" label="Méditérranéen">
                    Méditérranéen
                  </option>
                  <option value="Mexicain" label="Mexicain">
                    Mexicain
                  </option>
                  <option value="Oriental" label="Oriental">
                    Oriental
                  </option>
                  <option value="Pakistanais" label="Pakistanais">
                    Pakistanais
                  </option>
                  <option value="Japonais" label="Japonais">
                    Japonais
                  </option>
                  <option value="Tapas" label="Tapas">
                    Tapas
                  </option>
                  <option value="Thaï" label="Thaï">
                    Thaï
                  </option>
                  <option value="Tunisien" label="Tunisien">
                    Tunisien
                  </option>
                  <option value="Turc" label="Turc">
                    Turc
                  </option>
                  <option value="Vegan" label="Vegan">
                    Vega
                  </option>
                  <option value="Végétarien" label="Végétarien">
                    Végétarien
                  </option>
                  <option value="Vietnamien" label="Vietnamien">
                    Vietnamien
                  </option>
                </Form.Control>
              </Form.Group>
            </Form>
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
            <p> Nom du restaurant : </p>

            <Input.TextArea
              style={{
                borderRadius: 5,
                marginTop: 10,
                padding: 0,
                height: 30,
                width: 400,
              }}
              onChange={(e) => setLocate(e.target.value)}
              defaultValue={locate}
              maxLength={50}
              minLength={1}
              placeholder={"Renseignez le nom du restaurant"}
            />
          </Card>
        </div>
        <div></div>
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
            <p> Adresse du restaurant : </p>
            <Input.TextArea
              style={{
                borderRadius: 5,
                marginTop: 10,
                padding: 0,
                height: 30,
                width: 400,
              }}
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={address}
              maxLength={50}
              minLength={1}
              placeholder={"Renseignez l'adresse du restaurant"}
            />
          </Card>
        </div>
        <div>
          {errorMessage && (
            <p style={{ color: "#eb4d4b", textAlign: "center" }}>
              Vérifiez que toutes les informations aient bien été remplies.
            </p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 15,
            }}
          >
            <Button
              onClick={() => sendInvitation()}
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
              <Link to="/my-invitations">Envoyer l'invitation</Link>
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
              <Link to="/"> Retour à l'accueil </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(InvitationScreen);
