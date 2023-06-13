export default function Inputbox({
  type = "text",
  lable = "label",
  required = false,
  labelClass = "",
  classes = "",
  inputClass = "",
  ...rest
}) {
  return (
    <div className={"input-box " + classes}>
      <label className={"fs-12 font-weight-bold text-md-right " + labelClass}>
        {lable}
      </label>
      <input
        {...rest}
        type={type}
        className={"form-control " + inputClass}
        placeholder={lable}
        required={required}
      />
    </div>
  );
}
