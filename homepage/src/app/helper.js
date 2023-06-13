export function removeScript(id) {
  const element = document.getElementById(id);
  if (element) {
    element.parentNode.removeChild(element);
  }
}

export const objectToStr = (message) => {
  let msg = "";
  if (typeof message === "object") {
    for (const key in message) {
      msg += `${key}: ${message[key]}`;
    }
  } else {
    msg = String(message);
  }
  return msg.toString();
};

export function extartError(error) {
  if (!error) {
    return error;
  }
  let message = "";
  try {
    if (typeof error === "string") {
      message = error.toString();
    } else if (error?.response?.data?.message) {
      message = error?.response?.data?.message.toString();
    } else if (error?.response?.data) {
      message = error?.response?.data.toString();
    } else if (error?.response) {
      message = error?.response.toString();
    } else if (error?.message) {
      message = error?.message.toString();
    } else if (error?.data?.message) {
      message = error?.data?.message.toString();
    } else {
      message = error.toString();
    }
  } catch (er) {
    message = er.toString();
  }
  return objectToStr(message);
}

export function mail_filter($email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($email);
}

export const unslash = (str = "") => str.replace(/\/$/, "");

export function currencyToSymbol(currency) {
  const locale = navigator.language || "en-US";
  try {
    return (0)
      .toLocaleString(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();
  } catch (err) {
    return "&";
  }
}

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function uuid1() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function uuid() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
}
