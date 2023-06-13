import { useEffect } from "react";
import settings from "../app/settings";

export default function useTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - ${settings.app_title}`;
  }, [title]);
}
