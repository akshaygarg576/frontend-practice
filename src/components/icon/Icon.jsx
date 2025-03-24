import { ICON_MAP } from "../../constants";
import "./Icon.css";

const Icon = ({ type }) => {
  if (!ICON_MAP[type]) {
    return;
  }

  return <span className="icon">{ICON_MAP[type]}</span>;
};

export default Icon;
