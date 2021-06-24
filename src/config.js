const moment = require("moment");
// Molecular Production API
export const API = "http://api.molecular.elostage.xyz/api/v1";
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const formatTime = (date) => {
  const dateTime = moment(date).format("Do MMM YYYY");
  return dateTime;
};
export const FormatAmount = (amount) => {
  return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// // Clarity Production API
// export const API = "http://api.molecular.elostage.xyz/api/v1"
// // Clarity Staging API
// // export const API = "https://claritydev.herokuapp.com";
// // export const webSocketAPI = "claritydev.herokuapp.com";