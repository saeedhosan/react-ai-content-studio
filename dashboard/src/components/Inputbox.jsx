export default function Inputbox({
  label = "label",
  type = "text",
  place = false,
  required = false,
  disable = false,
  refs = null,
  ...rest
}) {
  return (
    <div className="input-box">
      <h6 className="fs-14 mb-2 font-weight-semibold">
        {label}{" "}
        {required ? (
          <span className="text-required">
            <i className="fa-solid fa-asterisk ml-2"></i>
          </span>
        ) : (
          <span className="text-muted">(optional)</span>
        )}
      </h6>
      <div className="form-group">
        <input 
        
          ref={refs}
          style={
            disable
              ? {
                  borderColor: "transparent",
                  color: "#728096",
                  cursor: "not-allowed",
                }
              : {}
          }
          {...rest}
          disabled={disable}
          type={type}
          className="form-control br-0"
          placeholder={place ? place : label}
          required={required}
        />
      </div>
    </div>
  );
}
