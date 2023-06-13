type Props = {
  title: string;
  text: string;
};

export default function FeaturesHeader({ title, text }: Props): JSX.Element {
  return (
    <div className="text-center py-8">
      <div className="col-md-12">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
