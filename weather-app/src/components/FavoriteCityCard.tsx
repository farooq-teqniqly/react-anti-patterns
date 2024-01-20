import { FavoriteCity } from "../types/types";

type Props = {
  city: FavoriteCity;
};

const FavoriteCityCard = ({ city }: Props) => {
  return (
    <li className="border border-gray-100 bg-black text-white" data-testid="favorite-city">
      <p>{city.name}</p>
      <p> {city.country}</p>
      <p> {city.state}</p>
    </li>
  );
};

export default FavoriteCityCard;
