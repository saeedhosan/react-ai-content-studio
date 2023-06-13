import { TextareaHTMLAttributes } from "react";
import { borderRound } from "../../app/utils/convert";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label = "label",
  required = false,
  ...rest
}: TextareaProps) {
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
          className={`form-control ${borderRound("round-10px")}`}
          required={required}
        />
      </div>
    </div>
  );
}
