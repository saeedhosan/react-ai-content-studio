import preference from "../../api/preference";
import { removeHtml } from "./str";

export function formatPrice(price: number | string) {
  if (typeof price === "string") {
    return Number(price) * 100;
  }
  return price * 100;
}

/**
 * Convert currency to symbol
 */
type Lang = "en-US";
export function currencyToSymbol(
  currency: string,
  language: Lang = "en-US"
): string {
  return (0)
    .toLocaleString(language, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

/**
 * make a string from object
 */
export function objectToStr(message: string | string): string {
  if (typeof message === "object") {
    return Object.entries(message)
      .map(([key, value]) => `${key}: ${value}`)
      .join("")
      .toString();
  } else {
    return String(message).toString();
  }
}

/**
 * extarct error from string | object | null | undefined
 */
export function extartError(error: any): string {
  if (!error) {
    return "";
  }
  let message = "";
  try {
    if (typeof error === "string") {
      message = error;
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
  } catch (_err: unknown) {
    if (_err instanceof Error) {
      message = _err.message.toString();
    }
  }
  return objectToStr(removeHtml(message));
}

type BorderRoundProp =
  | "round-full"
  | "round-medium"
  | "round-normal"
  | "round-10px";
export function borderRound(classes: BorderRoundProp): string {
  return preference?.round ? ` ${classes} ` : "round-none";
}
export const isRounded = preference.round;
