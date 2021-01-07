// import React, { useState, useEffect } from "react";
// import "../App.css";
// import { Card, Icon, Modal, Button, Avatar } from "antd";
// import Nav from "./Nav";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// import {
//   FiCalendar,
//   FiMapPin,
//   FiCheckSquare,
//   FiXSquare,
//   FiClock,
// } from "react-icons/fi";
// import { FaUtensils } from "react-icons/fa";
// import moment from "moment";

// const MyForkys = ({ onRefresh, location, userState }) => {
//   const [isModalConfirmed, setModalConfirmed] = useState(false);
//   const [user, setUser] = useState({});
//   // const navigation = useNavigation();

//   useEffect(() => {
//     const getUser = async () => {
//       if (invit.id_sender == userState.id) {
//         let response = await fetch(`/getmydata?id=${invit.id_receiver}`);
//         let responseJson = await response.json();
//         setUser(responseJson.myUser);
//       } else {
//         let response = await fetch(`/getmydata?id=${invit.id_sender}`);
//         let responseJson = await response.json();
//         setUser(responseJson.myUser);
//       }
//     };
//     getUser();
//   }, [invit]);

//   const cancelInvit = async () => {
//     let response = await fetch(`/cancelinvit?id=${invit._id}`);
//     let responseJson = await response.json();
//     if (responseJson.result) {
//       setModalConfirmed(false);
//       onRefresh();
//     }
//   };

//   const userInvite = location.state;
//   console.log(userInvite);
//   return !user ? (
//     <></>
//   ) : (
//     <div>
//       <div>
//         <FiCalendar
//           size={32}
//           color={
//             (invit.statut_invit == "Refusé" && "#eb4d4b") ||
//             (invit.statut_invit == "En cours" && "#ffa500") ||
//             (invit.statut_invit == "Accepté" && "#418581")
//           }
//         />
//         <h6>{moment(invit.date).format("DD/MM/YYYY")}</h6>
//       </div>
//       <div>
//         <Card
//           containerStyle={{
//             borderRadius: 5,
//             borderColor:
//               (invit.statut_invit == "Refusé" && "#eb4d4b") ||
//               (invit.statut_invit == "En cours" && "#ffa500") ||
//               (invit.statut_invit == "Accepté" && "#418581"),
//             marginBottom: 20,
//           }}
//         >
//           <div
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//             }}
//           >
//             <div>
//               <img
//                 src={
//                   user.photo
//                     ? { uri: user.photo }
//                     : require("../assets/default_avatar.jpg")
//                 }
//               />
//             </div>
//             <div>
//               <h6> Votre déjeuner avec {user.name} </h6>
//               <p>
//                 <FiCalendar /> Rendez-vous:{" "}
//                 {(invit.heure == 12 && "12h") ||
//                   (invit.heure == 12.5 && "12h30") ||
//                   (invit.heure == 13 && "13h") ||
//                   (invit.heure == 13.5 && "13h30") ||
//                   (invit.heure == 14 && "14h")}
//               </p>
//               <p>
//                 <FiMapPin /> Restaurant: {invit.lieu_propose}
//               </p>
//             </div>
//           </div>
//           <div
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <FaUtensils />
//               <FaUtensils />
//               <FaUtensils />

//               <p
//                 style={{
//                   fontSize: 13,
//                   fontWeight: "bold",
//                   color: "#c7d3dc",
//                 }}
//               >
//                 {" "}
//                 {Math.floor(Math.random() * 20) + 1} déjeuners
//               </p>
//             </p>

//             <Button
//               type="outline"
//               buttonStyle={{
//                 borderColor:
//                   (invit.statut_invit == "Refusé" && "#eb4d4b") ||
//                   (invit.statut_invit == "En cours" && "#ffa500") ||
//                   (invit.statut_invit == "Accepté" && "#418581"),
//                 borderWidth: 1,
//               }}
//               style={{ color: "black", padding: 10 }}
//               title="Détails"
//               onClick={() => setModalConfirmed(true)}
//             />
//             <Modal isVisible={isModalConfirmed}>
//               <div>
//                 <Card
//                   containerStyle={{
//                     borderRadius: 5,
//                     borderColor: "#abd6d3",
//                     maxWidth: "90%",

//                     paddingHorizontal: 10,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       justifyContent: "center",
//                       alignItems: "center",
//                       alignSelf: "stretch",
//                     }}
//                   >
//                     {invit.statut_invit == "Accepté" ? (
//                       <FiCheckSquare />
//                     ) : invit.statut_invit == "Refusé" ? (
//                       <FiXSquare />
//                     ) : (
//                       <FiClock />
//                     )}

//                     <h6
//                       style={{
//                         fontWeight: "bold",
//                         color: "#418581",
//                         marginTop: 20,
//                       }}
//                     >
//                       {invit.statut_invit == "Accepté"
//                         ? "CONFIRMATION"
//                         : invit.statut_invit == "Refusé"
//                         ? "ANNULATION"
//                         : "EN ATTENTE"}
//                     </h6>
//                     <p>
//                       {invit.statut_invit == "Accepté"
//                         ? `Bonjour ${userState.pseudo}, votre déjeuner est désormais confirmé.`
//                         : invit.statut_invit == "Refusé"
//                         ? `Bonjour ${userState.pseudo}, votre déjeuner n’a pas été confirmé.`
//                         : `Bonjour ${userState.pseudo}, votre déjeuner avec ${user.name} est encore en attente de confirmation.`}
//                     </p>
//                     <p>
//                       {invit.statut_invit == "Accepté"
//                         ? `Vous avez rendez-vous avec ${user.name} à ${
//                             (invit.heure == 12 && "12h") ||
//                             (invit.heure == 12.5 && "12h30") ||
//                             (invit.heure == 13 && "13h") ||
//                             (invit.heure == 13.5 && "13h30") ||
//                             (invit.heure == 14 && "14h")
//                           }.`
//                         : invit.statut_invit == "Refusé"
//                         ? `Vous pouvez proposer une nouvelle date pour déjeuner avec ${user.name}.`
//                         : `Si vous le souhaitez vous pouvez proposer à une autre personne disponible.`}
//                     </p>
//                     <p>
//                       {invit.statut_invit == "Accepté"
//                         ? `A noter que ${user.name} vous attendra directement à ${invit.lieu_propose}, ${invit.adresse}.`
//                         : invit.statut_invit == "Refusé"
//                         ? `Ou proposer à une autre personne disponible...`
//                         : `Pour rappel, le déjeuner est prévu à ${invit.lieu_propose}, ${invit.adresse}.`}
//                     </p>
//                     <p>Voici le message envoyé / reçu:</p>
//                     <p>{invit.message}</p>
//                   </div>
//                 </Card>
//                 {invit.statut_invit == "Accepté" ? (
//                   <Button
//                     style={{
//                       backgroundColor: "#418581",
//                       margin: 10,
//                       width: 250,
//                       borderRadius: 20,
//                       alignSelf: "center",
//                     }}
//                     title="Annuler mon RDV"
//                     onClick={() => cancelInvit()}
//                   />
//                 ) : invit.statut_invit == "Refusé" ? (
//                   <Link to="/user-profile">
//                     <Button
//                       style={{
//                         backgroundColor: "#418581",
//                         margin: 10,
//                         width: 250,
//                         borderRadius: 20,
//                         alignSelf: "center",
//                       }}
//                       title="Proposer une autre date ?"
//                       onClick={() => {
//                         setModalConfirmed(false);
//                       }}
//                     />
//                   </Link>
//                 ) : (
//                   <Link to="/home">
//                     <Button
//                       style={{
//                         backgroundColor: "#418581",
//                         margin: 10,
//                         width: 250,
//                         borderRadius: 20,
//                         alignSelf: "center",
//                       }}
//                       title="Inviter une nouvelle personne ?"
//                       onClick={() => {
//                         setModalConfirmed(false);
//                       }}
//                     />
//                   </Link>
//                 )}

//                 <Button
//                   buttonStyle={{
//                     backgroundColor: "#F9B34C",
//                     margin: 10,
//                     width: 250,
//                     borderRadius: 20,
//                     alignSelf: "center",
//                   }}
//                   title="Retour"
//                   onClick={() => setModalConfirmed(false)}
//                 />
//               </div>
//             </Modal>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// function mapStateToProps(state) {
//   return { userState: state.user };
// }

// export default connect(mapStateToProps, null)(MyForkys);
