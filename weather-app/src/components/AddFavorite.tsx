import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

type Props = {
  onClick: () => void;
};

const AddFavorite = ({ onClick }: Props) => {
  return <FontAwesomeIcon icon={faStar} className="pr-4"></FontAwesomeIcon>;
};

export default AddFavorite;
