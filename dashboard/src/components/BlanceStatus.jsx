export default function BlanceStatus({ blance = 0, name = "Image" }) {
  return (
    <div className="col-sm-12">
      <div className="text-left mb-4 br-0" id="balance-status">
        <span className="fs-11 text-muted pl-3">
          <i className="fa-sharp fa-solid fa-bolt-lightning mr-2" />
          Your Balance is{" "}
          <span className="font-weight-semibold" id="balance-number">
            {blance}
          </span>{" "}
          {Number(blance) === 1 ? name : `${name}s`}
        </span>
      </div>
    </div>
  );
}
