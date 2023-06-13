import templates from "./data/templates";

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
    } else if (error?.data?.data?.message) {
      message = error?.data?.data?.message.toString();
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

export const avatar = (n = "s") => `https://ui-avatars.com/api/?name=${n}`;

export const unslash = (str = "") => str.replace(/\/$/, "");

export const firstUpper = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const prettyString = (str = "") => {
  let _str = str.replace("-", " ");
  if (_str.split(" ").length > 0) {
    _str = _str.split(" ").map((text) => firstUpper(text) + " ");
  }
  return _str;
};

export function setSession(name = "name", data = null) {
  sessionStorage.setItem(name, JSON.stringify({ data: data }));
}

export function getSession(name = "name") {
  try {
    return JSON.parse(window.sessionStorage.getItem(name))?.data;
  } catch (error) {
    return null;
  }
}

/**
 * format price spacily for stripe
 * @param {number} price
 * @returns number
 */
export function formatPrice(price = 0) {
  try {
    let __price = price;
    if (typeof price === "string") {
      __price = Number(price);
    }
    return (__price = __price * 100);
  } catch (error) {
    return 0;
  }
}

/**
 * generate currency symbol
 * @param {string} currency
 * @returns string
 */
export function currencyToSymbol(currency) {
  const locale = navigator.language || "en-US";
  return (0)
    .toLocaleString(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

/**
 * string to convert like a seo friendly url
 * @param {string} url
 * @returns string
 */
export function toSeoUrl(url = "") {
  return url
    .toString()
    .normalize("NFD") // Change diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
    .replace(/\s+/g, "-") // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, "-and-") // Replace ampersand
    .replace(/[^a-z0-9\-]/g, "") // Remove anything that is not a letter, number or dash
    .replace(/-+/g, "-") // Remove duplicate dashes
    .replace(/^-*/, "") // Remove starting dashes
    .replace(/-*$/, ""); // Remove trailing dashes
}
/**
 * string to convert like a seo friendly url
 * @param {string} url
 * @returns string
 */
export function seoToString(url = "") {
  return url
    .toString() // Convert to string
    .replace("-", " ") // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace("-and-", " and ") // Replace ampersand
    .replace(/-+/g, " ") // Remove duplicate dashes
    .replace(/^-*/, "") // Remove starting dashes
    .replace(/-*$/, "")
    .trim(); // Remove trailing dashes
}

/**
 * database datetime to javascript date convert
 * @param {string} date
 * @returns string date
 */
export function dbTodate(date = "2023-03-28 20:04:10") {
  const d = new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });

  return d;
}

/**
 * database datetime to javascript time
 * @param {string} time
 * @returns string time
 */
export function dbTotime(time = "2023-03-28 20:04:10") {
  const t = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return t;
}

export function temCategory(blog_name) {
  const search = templates.find((arr) => arr._url.includes(blog_name));
  if (search && search?.category) {
    return search?.category;
  }
  return "";
}

/**
 * copy to clipboard
 * @param {string} text
 */
export async function toClipboard(text = "") {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
/**
 * copy text to clipboard
 * @param {string} text
 * @returns boolean
 */
export function copyToClipboard(text = "") {
  try {
    if ("clipboard" in navigator) {
      window.navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 *
 * @param {string} name
 * @param {string} content
 * @param {object} options
 * @returns boolean
 */
export default function exportTopdf(
  name = "",
  content = "content",
  options = {}
) {
  const width = options?.width || 800;
  const height = options?.height || 650;
  const top = options?.top || 100;
  const left = options?.left || 150;
  let mywindow = window.open(
    "",
    "PRINT",
    `height=${height},width=${width},top=,${top}left=${left}`
  );
  mywindow.document.write(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
</head>
<body>
  ${content}
</body>
</html>`);
  mywindow.focus(); // necessary for IE >= 10*/
  mywindow.print();
  // mywindow.close();
  mywindow.document.close(); // necessary for IE >= 10
  return true;
}

/**
 * export to docs
 * @param {string} name
 * @param {string} content
 */
export function exportToDocs(name = "filename", content = "content") {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>" +
    name +
    "</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML = header + content + footer;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = name + ".doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}
