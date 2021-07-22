import { ToastContainer, toast } from "react-toastify";
const moment = require("moment");
// Molecular Production API
export const API = "https://staging-api.molecularpro.co/api/v1";
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const formatTime = (date) => {
  if(date){
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  }
  else{
    return ""
  }
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
    return age + "years";
  } else {
    return "n/a";
  }
};
export const notify = (message, d = "B") =>
  toast(message, { containerId: d, position: "top-right" });
  
export const checkIfIsOdd = (n) => {
  return Math.abs(n % 2) == 1;
};
export const returnAdminToken=()=>{
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
    return token
} 
export const contractorToken =()=>{
  const availableToken = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
      return token
}
export const getAdminToken=()=>{
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  if (token.user_type !== "admin") {
    return window.location.assign = "/login";
  }
  return token
}
// // Clarity Production API
// export const API = "http://api.molecular.elostage.xyz/api/v1"
// // Clarity Staging API
// // export const API = "https://claritydev.herokuapp.com";
// // export const webSocketAPI = "claritydev.herokuapp.com";
