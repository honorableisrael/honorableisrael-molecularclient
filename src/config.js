import { ToastContainer, toast } from "react-toastify";
const moment = require("moment");
// Molecular Production API
export const API = "https://api.molecularpro.co/api/v1";
// const live API = "https://api.molecularpro.co/api/v1"
// staging https://staging-api.molecularpro.co/api/v1
export const MID = "GP_leAoQ8M1QPNbEowD5x9TWHCdIE0NlDdB";
// MID Live Key =  GP_leAoQ8M1QPNbEowD5x9TWHCdIE0NlDdB
//mid test "GP0000001";
export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const formatTime = (date) => {
  if (date) {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  } else {
    return "";
  }
};
export const reloadPage = () => {
  setTimeout(() => {
      window.location.reload()
  }, 3000)
}

export const FormatAmount = (amount) => {
  return amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
export const returnAdminToken = () => {
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  return token;
};
export const contractorToken = () => {
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  return token;
};
export const specialistToken = () => {
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  return token;
};
export const getAdminToken = () => {
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  if (token.user_type !== "admin") {
    return (window.location.assign = "/signin");
  }
  return token;
};
export const splitName = (x) => {
  if (x.split(" ").length > 1) {
    if (x) {
      return {
        first: x?.split(" ")[0].substring(1, 0),
        second: x?.split(" ")[1].substring(1, 0),
      };
    }
  }
  if (x.split("").length == 1) {
    return { first: x?.split("")[0], second: x?.split("")[1] };
  }
};
export const refreshpage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};
export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}
export const current_currency = "₦";

export const formatTime2 = (date) => {
  if (date) {
    const dateTime = moment(date).format("YYYY-MM-DD");
    console.log(dateTime.currentTime);
    return dateTime;
  } else {
    return "";
  }
};

export const loggedInDetails = () => {
  const availableToken = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  return token;
};
