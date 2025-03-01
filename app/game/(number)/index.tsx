import OnePlayerScreen from "./1";
import TwoPlayerScreen from "./2";
import ThreePlayerScreen from "./3";
import FourPlayerScreen from "./4";
import FivePlayerScreen from "./5";
import SixPlayerScreen from "./6";
import useGameStore from "@/store/GameStore";

interface Props {
  numPlayers: number;
  alt: boolean;
}

export default function GameSelectors({ numPlayers, alt }: Props) {
  const store = useGameStore();
  store.getState().setNumPlayers(numPlayers);
  switch (numPlayers) {
    case 1:
      return <OnePlayerScreen alt={alt} />;
    case 2:
      return <TwoPlayerScreen alt={alt} />;
    case 3:
      return <ThreePlayerScreen alt={alt} />;
    case 4:
      return <FourPlayerScreen alt={alt} />;
    case 5:
      return <FivePlayerScreen alt={alt} />;
    case 6:
      return <SixPlayerScreen alt={alt} />;

    default:
      return null;
  }
}
