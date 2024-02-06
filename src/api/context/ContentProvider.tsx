import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import faq_section from "../content/faq_section";
import feature_section from "../content/feature_section";
import footer_section from "../content/footer_section";
import hero_section from "../content/hero_section";
import home_section from "../content/home_section";
import plan_section from "../content/plan_section";
import template_section from "../content/template_section";
import endpoints from "../endpoints";
import { UserResponseType } from "../ResponseType";


interface AuthType {
  user: UserResponseType
  current_user: UserResponseType,
  isLogged: boolean
}
interface ContentType {
  hero_section: typeof hero_section,
  plan_section: typeof plan_section,
  faq_section: typeof faq_section,
  footer_section: typeof footer_section
  template_section: typeof template_section,
  feature_section: typeof feature_section
  auth: null | AuthType
}



const ContentContext = createContext<ContentType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useContent<T>(name: keyof typeof home_section, value: T): T {
  const content = useContext(ContentContext);
  if (content && content[name]) {
    return content[name] as T;
  }
  return value as T;
}

export default function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentType | null>(null);
  const response = useQuery(["hss"], async () => axios.get(endpoints.home_sections));

  useEffect(() => {

    if (response.data?.data) {
      setContent(response.data.data);
    }
  }, [response.data?.data]);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
