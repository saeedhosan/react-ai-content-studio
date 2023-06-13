export default function FeaturesHeader({ title = "", text = "title" }) {
  return (
    <div className="text-center py-8">
      <div className="col-md-12">
        <h1>{title}</h1>
        <p style={{ fontSize: "22px" }}>{text}</p>
      </div>
    </div>
  );
}
