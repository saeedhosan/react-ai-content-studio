import pagespath from "../../api/pagespath";

export function toSeoUrl(url: string): string {
  return url
    .toString()
    .normalize("NFD") // Change diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
    .replace(/\s+/g, "-") // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, "-and-") // Replace ampersand
    .replace(/[^a-z0-9\\-]/g, "") // Remove anything that is not a letter, number or dash
    .replace(/-+/g, "-") // Remove duplicate dashes
    .replace(/^-*/, "") // Remove starting dashes
    .replace(/-*$/, ""); // Remove trailing dashes
}

export function seoToString(url: string): string {
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
 * add slash from last of url or string
 */
export const unslash = (str: string): string => str.replace(/\/$/, "");

/**
 * add slash from last of url or string
 * @param string
 * @returns string
 */
export const adslash = (str: string): string => unslash(str).replace(/$/, "/");

export const dpath = (path = ""): string => {
  return `${unslash(pagespath.dashboard)}${path}`;
};
