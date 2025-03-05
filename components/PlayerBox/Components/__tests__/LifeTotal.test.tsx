import useGameStore from "@/store/GameStore";
import { render } from "@testing-library/react-native";
import { ReactElement } from "react";
import LifeTotal from "../Lifetotal";

const RenderWithGameStore = (component: ReactElement) => {
  return render(component);
};

describe("LifeTotal", () => {
  beforeEach(() => {
    // Atualiza o estado da store de forma correta
    useGameStore()((state) =>
      state.setNumPlayers({ playerCount: 1, alt: false })
    );
  });

  it("should render correctly", () => {
    const { getByText } = RenderWithGameStore(<LifeTotal playerId={1} />);
    expect(getByText("40")).toBeTruthy();
  });
});
