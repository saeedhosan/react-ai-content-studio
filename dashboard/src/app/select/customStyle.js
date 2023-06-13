export function selectStyle({ width = "100px" }) {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      width,
      borderColor: state.isFocused ? "red" : "red",
      borderRedus: "none !important",
      fontSize: 12,
      outline: "none",
      borderRadius: "0px",
      // border: 0,
      // boxShadow: "none",
      border: state.isFocused ? "1px solid #000000" : "1px solid #fe4e00",
      // This line disable the blue border
      "&:hover": {
        border: state.isFocused ? '"1px solid #000000" ' : "1px solid #fe4e00",
      },
      boxShadow: state.isFocused
        ? `1px 0px 20px 1px rgb(174 44 44 / 7%),
        0px 0px 20px 0px rgb(0 0 0 / 6%)`
        : 0,
    }),
    option: (options, { isFocused, isSelected }) => ({
      ...options,
      background: isSelected ? "#FE4E00" : isFocused ? "#f5f9fc" : null,
      zIndex: 1,
      fontSize: "12px",
    }),
    menu: (base) => ({
      ...base,
      // zIndex: 100,
    }),
  };
}

export function customSelect({ ...rest } = {}) {
  return {
    control: (baseStyles, state) => ({
      ...baseStyles,
      ...rest,
      width: "100%",
      background: "#f5f9fc",
      borderColor: state.isFocused ? "#f5f9fc" : "#f5f9fc",
      borderRedus: "none !important",
      fontSize: 12,
      outline: "none",
      borderRadius: "0px",
      // border: 0,
      // boxShadow: "none",
      border: state.isFocused ? "1px solid #fe4e00" : "1px solid transparent",
      // This line disable the blue border
      "&:hover": {
        border: state.isFocused ? "1px solid #fe4e00" : "1px solid #fe4e00",
      },
      boxShadow: state.isFocused
        ? `1px 0px 20px 1px rgb(174 44 44 / 7%),
        0px 0px 20px 0px rgb(0 0 0 / 6%)`
        : 0,
    }),
    option: (options, { isFocused, isSelected }) => ({
      ...options,
      background: isSelected ? "#FE4E00" : isFocused ? "#f5f9fc" : null,
      zIndex: 1,
      fontSize: "12px",
    }),
    menu: (base) => ({
      ...base,
      // zIndex: 100,
    }),
  };
}
