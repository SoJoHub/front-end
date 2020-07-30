let user = window.localStorage.getItem("sojohub");
const token = JSON.parse(user).userToken;

export const API_ROOT = "http://localhost:3000";
export const API_WS_ROOT = "ws://localhost:3000/cable";
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token,
};
