import {
  TemplateArrayResponseType,
  TemplateResponseType,
} from "../../api/ResponseType";

/**
 * Make first latter uppercase
 */
export const firstUpper = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * make string looks pretty
 */
export const strLooks = (str: string) => {
  let _str: string = str.replace("-", " ");
  if (_str.split(" ").length > 0) {
    _str = _str
      .split(" ")
      .map((text) => firstUpper(text) + " ")
      .toString();
  }
  return _str;
};

export function removeHtml(html: string) {
  return html
    .toString()
    .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, "");
}

export function temCategory(
  blog_name: string,
  templates: TemplateArrayResponseType
) {
  const search = templates.find((arr: TemplateResponseType) =>
    arr._url.includes(blog_name)
  );
  if (search && search?.category) {
    return search?.category;
  }
  return "";
}
