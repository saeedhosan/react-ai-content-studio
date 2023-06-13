import { isRounded } from "../app/utils/convert";

export function selectStyle({ ...rest }) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      ...rest,
      width: "100%",
      background: "#f5f9fc",
      borderColor: state.isFocused ? "#f5f9fc" : "#f5f9fc",
      borderRadius: isRounded ? "100px" : "0px",
      fontSize: 12,
      outline: "none",
      // border: 0,
      // boxShadow: "none",
      border: state.isFocused
        ? "1px solid var(--bg-primary)"
        : "1px solid transparent",
      // This line disable the blue border
      "&:hover": {
        border: state.isFocused
          ? "1px solid var(--bg-primary)"
          : "1px solid var(--bg-primary)",
      },
      boxShadow: state.isFocused
        ? `1px 0px 20px 1px rgb(174 44 44 / 7%),
        0px 0px 20px 0px rgb(0 0 0 / 6%)`
        : 0,
    }),
    option: (
      options: object,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
    ) => ({
      ...options,
      background: isSelected
        ? "var(--bg-primary)"
        : isFocused
        ? "#f5f9fc"
        : null,
      zIndex: 1,
      fontSize: "12px",
    }),
    menu: (base: object) => ({
      ...base,
      // zIndex: 100,
    }),
  };
}

export function customSelect({ ...rest } = {}) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      ...rest,
      width: "100%",
      background: "#f5f9fc",
      borderColor: state.isFocused ? "#f5f9fc" : "#f5f9fc",
      borderRadius: isRounded ? "100px" : "0px",
      fontSize: 12,
      outline: "none",
      // border: 0,
      // boxShadow: "none",
      border: state.isFocused
        ? "1px solid var(--bg-primary)"
        : "1px solid transparent",
      // This line disable the blue border
      "&:hover": {
        border: state.isFocused
          ? "1px solid var(--bg-primary)"
          : "1px solid var(--bg-primary)",
      },
      boxShadow: state.isFocused
        ? `1px 0px 20px 1px rgb(174 44 44 / 7%),
        0px 0px 20px 0px rgb(0 0 0 / 6%)`
        : 0,
    }),
    option: (
      options: object,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
    ) => ({
      ...options,
      background: isSelected
        ? "var(--bg-primary)"
        : isFocused
        ? "#f5f9fc"
        : null,
      zIndex: 1,
      fontSize: "12px",
    }),
    menu: (base: object) => ({
      ...base,
      // zIndex: 100,
    }),
  };
}
