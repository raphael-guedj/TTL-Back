import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { Form } from "react-bootstrap";
import { Card, Button, Checkbox, Input, Select } from "antd";

const EditProfilScreen = ({ userState }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [language, setLanguage] = useState([]);
  const [food, setFood] = useState([]);
  const [text, setText] = useState("");
  const [wish1, setWish1] = useState(false);
  const [wish2, setWish2] = useState(false);
  const [wish3, setWish3] = useState(false);
  const [wish4, setWish4] = useState(false);
  const [wish5, setWish5] = useState(false);
  const [wish6, setWish6] = useState(false);

  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(`/getmydata?id=${userState.id}`);
      let response = await rawResponse.json();

      response.myUser.name && setName(response.myUser.name);
      response.myUser.email && setEmail(response.myUser.email);
      response.myUser.profession && setJob(response.myUser.profession);
      response.myUser.city && setCity(response.myUser.city);
      response.myUser.arrondissement &&
        setPostcode(response.myUser.arrondissement);
      response.myUser.description && setText(response.myUser.description);
      response.myUser.secteur && setActivity(response.myUser.secteur);
      response.myUser.wish1 && setWish1(response.myUser.wish1);
      response.myUser.wish2 && setWish2(response.myUser.wish2);
      response.myUser.wish3 && setWish3(response.myUser.wish3);
      response.myUser.wish4 && setWish4(response.myUser.wish4);
      response.myUser.wish5 && setWish5(response.myUser.wish5);
      response.myUser.wish6 && setWish6(response.myUser.wish6);
      response.myUser.language && setLanguage(response.myUser.language);
      response.myUser.food && setFood(response.myUser.food);
      // response.myUser.photo && setPhoto(response.myUser.photo);
    };
    getUser();
  }, []);

  const handleRecord = async () => {
    let rawResponse = await fetch("/recordmydata", {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&email=${email}&job=${job}&city=${city}&postcode=${postcode}&activity=${activity}&language=${JSON.stringify(
        language
      )}&text=${text}&food=${JSON.stringify(
        food
      )}&wish1=${wish1}&wish2=${wish2}&wish3=${wish3}&wish4=${wish4}&wish5=${wish5}&wish6=${wish6}&id=${
        userState.id
      }`,
    });

    let response = await rawResponse.json();
  };

  return (
    <div>
      <Nav />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
          }}
        >
          <h2 className="Title2">Modifier mon profil</h2>
        </div>

        <div className="Card">
          <Card
            style={{
              borderRadius: 5,
              borderColor: "#F9B34C",
              marginTop: 10,
              padding: 0,
              width: 700,
            }}
          >
            <h6> Infos personnelles: </h6>
            <Input
              value={name}
              label="Prénom"
              placeholder="Prénom"
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: 10, width: 600 }}
            ></Input>

            <Input
              value={job}
              label="Profession"
              placeholder="Profession"
              onChange={(e) => setJob(e.target.value)}
              style={{ width: 600 }}
            ></Input>

            <Input
              value={city}
              label="Ville"
              placeholder="Ville"
              onChange={(e) => setCity(e.target.value)}
              style={{ marginTop: 10, width: 600 }}
            ></Input>

            <Input
              value={postcode}
              label="Arrondissement"
              placeholder="Arrondissement"
              onChange={(e) => setPostcode(e.target.value)}
              style={{ marginTop: 10, width: 600 }}
            ></Input>

            <Input
              value={email}
              label="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: 10, width: 600 }}
            ></Input>
          </Card>
        </div>
      </div>

      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#F9B34C",
            marginTop: 10,
            padding: 0,
            width: 700,
          }}
        >
          <h6> Mon secteur d'activité: </h6>
          <Form
            style={{ width: 600 }}
            defaultValue={activity}
            onChange={(item) => setActivity(item.target.value)}
          >
            <Form.Group controlId="Select language">
              <Form.Control as="select" mode="multiple">
                <option value="Agroalimentaire" label="Agroalimentaire">
                  Agroalimentaire
                </option>
                <option
                  value="Activité informatique"
                  label="Activité informatique"
                >
                  Activité informatique
                </option>
                <option
                  value="Activité juridique et comptable"
                  label="Activité juridique et comptable"
                >
                  Activité juridique et comptable
                </option>
                <option value="Art - Culture" label="Art - Culture">
                  Art - Culture
                </option>
                <option
                  value="Automobile et aéronautique"
                  label="Automobile et aéronautique"
                >
                  Automobile et aéronautique
                </option>
                <option
                  value="Banque et Assurances"
                  label="Banque et Assurances"
                >
                  Banque et Assurances
                </option>
                <option
                  value="Bois - Papier - Imprimerie"
                  label="Bois - Papier - Imprimerie"
                >
                  Bois - Papier - Imprimerie
                </option>
                <option value="Chimie" label="Chimie">
                  Chimie
                </option>
                <option
                  value="Commerce - Négoce - Distribution"
                  label="Commerce - Négoce - Distribution"
                >
                  Commerce - Négoce - Distribution
                </option>
                <option
                  value="Communication et médias"
                  label="Communication et médias"
                >
                  Communication et médias
                </option>
                <option
                  value="Conseils et gestion des entreprises"
                  label="Conseils et gestion des entreprises"
                >
                  Conseils et gestion des entreprises
                </option>
                <option value="Construction" label="Construction">
                  Construction
                </option>
                <option value="Energie - Eau" label="Energie - Eau">
                  Energie - Eau
                </option>
                <option value="Formation" label="Formation">
                  Formation
                </option>
                <option value="Graphisme - Design" label="Graphisme - Design">
                  Graphisme - Design
                </option>
                <option
                  value="Hôtellerie - Restauration - Loisirs"
                  label="Hôtellerie - Restauration - Loisirs"
                >
                  Hôtellerie - Restauration - Loisirs
                </option>
                <option value="Immobilier" label="Immobilier">
                  Immobilier
                </option>
                <option
                  value="Industrie pharmaceutique"
                  label="Industrie pharmaceutique"
                >
                  Industrie pharmaceutique
                </option>
                <option value="mecanic" label="Mécanique - Métallurgie">
                  Mécanique - Métallurgie
                </option>
                <option value="recrutement" label="RH - Rectutement">
                  RH - Rectutement
                </option>
                <option value="Santé - Medical" label="Santé - Medical">
                  Formation
                </option>
                <option value="telecommunication" label="Télécommunication">
                  Télécommunication
                </option>
                <option value="other" label="Autre">
                  Autre
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
            borderColor: "#F9B34C",
            marginTop: 10,
            padding: 0,
            width: 700,
          }}
        >
          <h6> Mes langues parlées: </h6>
          <Form
            style={{ width: 600 }}
            defaultValue={language}
            onChange={(item) => setLanguage(item.target.value)}
          >
            <Form.Group controlId="Select language">
              <Form.Control as="select" mode="multiple">
                <option value="Anglais" label="Anglais">
                  Anglais
                </option>
                <option value="Arabe" label="Arabe">
                  Arabe
                </option>
                <option value="Espagnol" label="Espagnol">
                  Espagnol
                </option>
                <option value="Français" label="Français">
                  Français
                </option>
                <option value="Hebreu" label="Hebreu">
                  Hebreu
                </option>
                <option value="Italien" label="Italien">
                  Italien
                </option>
                <option value="Mandarin" label="Mandarin">
                  Mandarin
                </option>
                <option value="Portugais" label="Portugais">
                  Portugais
                </option>
                <option value="Russe" label="Russe">
                  Russe
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
            borderColor: "#F9B34C",
            marginTop: 10,
            padding: 0,
            width: 700,
          }}
        >
          <h6> A propos de moi: </h6>
          <div>
            <Input.TextArea
              style={{
                borderRadius: 5,
                marginTop: 10,
                padding: 0,
                height: 130,
                width: 600,
              }}
              onChange={(e) => setText(e.target.value)}
              defaultValue={text}
              maxLength={300}
              minLength={80}
              placeholder={"Décrivez-vous ici..."}
            />
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
            width: 700,
          }}
        >
          <h6> Mes envies: </h6>
          <Checkbox
            title="Déconnecter du travail"
            onClick={() => setWish5(!wish5)}
            checked={wish5}
          >
            Déconnecter du travail
          </Checkbox>
          <Checkbox
            title="Découvrir un nouveau métier"
            onClick={() => setWish2(!wish2)}
            checked={wish2}
          >
            Découvrir un nouveau métier
          </Checkbox>
          <Checkbox
            title="Recherche d'opportunités professionnelles"
            onClick={() => setWish3(!wish3)}
            checked={wish3}
          >
            Recherche d'opportunités professionnelles
          </Checkbox>
          <Checkbox
            title="Rencontrer de nouvelles personnes"
            onClick={() => setWish1(!wish1)}
            checked={wish1}
          >
            Rencontrer de nouvelles personnes
          </Checkbox>

          <Checkbox
            title="Se reconvertir professionnellement"
            onClick={() => setWish4(!wish4)}
            checked={wish4}
          >
            Se reconvertir professionnellement
          </Checkbox>
          <Checkbox
            title="Découvrir le quartier et ses alentours"
            onClick={() => setWish6(!wish6)}
            checked={wish6}
          >
            Découvrir le quartier et ses alentours
          </Checkbox>
        </Card>
      </div>
      <div className="Card">
        <Card
          style={{
            borderRadius: 5,
            borderColor: "#F9B34C",
            marginTop: 10,
            padding: 0,
            width: 700,
          }}
        >
          <h6> Mes cuisines favorites: </h6>
          <Form
            style={{ width: 600 }}
            defaultValue={food}
            onChange={(item) => setFood(item.target.value)}
          >
            <Form.Group controlId="Select kitchen">
              <Form.Control as="select" mode="multiple">
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

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
          }}
        >
          <Button
            onClick={() => handleRecord()}
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
            <Link to="/my-profile">Enregistrer</Link>
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
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(EditProfilScreen);
