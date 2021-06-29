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
export const ageCalculator = (dateString) => {
  if (dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age+"years";
  } else {
    return "n/a";
  }
};
// // Clarity Production API
// export const API = "http://api.molecular.elostage.xyz/api/v1"
// // Clarity Staging API
// // export const API = "https://claritydev.herokuapp.com";
// // export const webSocketAPI = "claritydev.herokuapp.com";
