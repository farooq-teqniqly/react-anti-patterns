import { FavoriteCity } from "../types/types";

type Props = {
  city: FavoriteCity;
};

const formatFavoriteCity = (city: FavoriteCity): string => {
  const segments = [city.state, city.country].filter(Boolean);
  return segments.join(", ");
};

const FavoriteCityCard = ({ city }: Props) => {
  return (
    <li className="border border-gray-100 bg-black text-white p-4 mb-4" data-testid="favorite-city">
      <p>{city.name}</p>
      <div className="text-sm">
        <p> {formatFavoriteCity(city)}</p>
      </div>
      <div>{city.weather?.temp}</div>
    </li>
  );
};

export default FavoriteCityCard;
