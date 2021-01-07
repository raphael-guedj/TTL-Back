export default function (user = {}, action) {
  if (action.type === "user") {
    // console.log(action.user);
    return action.user;
  } else {
    return user;
  }
}
