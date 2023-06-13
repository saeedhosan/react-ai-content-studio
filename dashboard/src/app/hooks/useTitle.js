import { useEffect } from "react";
import { settings } from "../settings";

export default function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title + " - " + settings.app_title;
    return () => {
      document.title = prevTitle;
    };
  });
}
