export default function Textarea({
  label = "label",
  place = false,
  required = false,
  row = 5,
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
        <textarea
          {...rest}
          type="text"
          rows={row}
          className="form-control br-0"
          placeholder={place}
          required={required}
        />
      </div>
    </div>
  );
}
