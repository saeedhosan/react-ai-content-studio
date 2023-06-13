interface JsonDataType {
  app_name: string | null;
  app_title: string | null;
  app_lang: string | null;
  app_logo: string | null;
  app_desc: string | null;
  app_favicon: string | null;
  app_basename: string | null;
  app_rest_url: string | null;
}
const selector = import.meta.env.VITE_APP_DATADIV || "%VITE_APP_DATADIV%";
const elem = document.getElementById(selector);
const json = elem?.textContent || "";

let json_data;
try {
  json_data = JSON.parse(json);
} catch (error) {
  console.log("Appliction data error: ", error);
}
const data: JsonDataType = { ...json_data };
export default data;
