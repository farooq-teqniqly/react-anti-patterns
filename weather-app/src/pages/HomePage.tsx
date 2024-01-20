import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";

const fontWeights = [200, 400, 800];

function HomePage() {
  return (
    <div>
      <div>React starter app styled with TailwindCSS</div>
      <div>
        <span>And FontAwesome icons.</span>
        {fontWeights.map((w) => (
          <FontAwesomeIcon
            key={w}
            icon={faWind}
            className={`pl-4 text-blue-${w}`}
          ></FontAwesomeIcon>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
