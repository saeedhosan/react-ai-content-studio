import { UserResponseType } from "../../api/ResponseType";
import settings from "../settings";

export function setSession(name: string, data: unknown) {
  sessionStorage.setItem(name, btoa(JSON.stringify({ data: data })));
  sessionStorage.setItem(`wwe${name}`, "okmew92843902");
  sessionStorage.setItem(`kee${name}`, "woiru93fj");
}

export function getSession(name: string) {
  try {
    const str = sessionStorage.getItem(name) || "";
    return JSON.parse(atob(str))?.data;
  } catch (error) {
    return null;
  }
}
export function setStorage(name: string, data: unknown) {
  localStorage.setItem(name, btoa(JSON.stringify({ data: data })));
}

export function getStorage(name: string) {
  try {
    const str = localStorage.getItem(name) || "";
    return JSON.parse(atob(str))?.data;
  } catch (error) {
    return null;
  }
}

export function getAuthSession(): UserResponseType | null {
  return getSession(settings.auth_session);
}

export function setAuthSession(data: UserResponseType | null) {
  setSession(settings.auth_session, data);
}

export function removeAuthSession() {
  sessionStorage.clear();
  sessionStorage.removeItem(settings.auth_session);
}
