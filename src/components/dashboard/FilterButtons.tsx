import { borderRound } from "../../app/utils/convert";

interface IFilterBarProps {
  handleClick: (item: string) => void;
  active: string;
  categories: string[];
}
const FilterButtons: React.FC<IFilterBarProps> = ({
  handleClick,
  active,
  categories,
}) => {
  return (
    <>
      {categories &&
        categories.map((category, key) => {
          return (
            <div
              key={key}
              className={
                active === category.toString()
                  ? borderRound("round-full") +
                    "mr-4 px-6 btn btn-primary active"
                  : borderRound("round-full") + "mr-4 px-6 btn btn-primary"
              }
              onClick={() => handleClick(category.toLowerCase())}
            >
              {category}
            </div>
          );
        })}
    </>
  );
};

export default FilterButtons;
