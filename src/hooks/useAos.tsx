import Aos from "aos";
import { useEffect } from "react";

export default function useAos() {
  useEffect(() => {
    Aos.refresh();
    Aos.init();
    return () => {
      Aos.refreshHard();
    };
  }, []);
}
