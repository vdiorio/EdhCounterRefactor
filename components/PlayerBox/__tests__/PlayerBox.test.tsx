import { render, act, fireEvent } from "@testing-library/react-native";
import PlayerBox from "../PlayerBox";
import GameStore, {
  STARTING_LIFE_TOTAL as STARTING_VALUE,
  TIME_TO_RESET_DELTA,
} from "@/store/GameStore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { INCREMENT_HOLD_INTERVAL } from "../Components/IncrementerButtons";
import { DAMAGE_ALL_INTERVAL } from "../Components/DamageAllButton";

describe("PlayerBox", () => {
  jest.useFakeTimers();

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render correctly", () => {
    const { getByTestId } = render(<PlayerBox playerId={1} />);
    expect(getByTestId("player-1")).toBeOnTheScreen();
  });

  describe("Incrementer Buttons", () => {
    beforeEach(() => {
      jest
        .spyOn(GameStore.getState(), "incrementLife")
        .mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should render correctly", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);
      expect(getByTestId("incrementer-1")).toBeDefined();
      expect(getByTestId("decrementer-1")).toBeDefined();
    });

    it("should call incrementLife and decrementLife when incrementer and decrementer buttons are pressed", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      act(() => fireEvent.press(getByTestId("incrementer-1")));

      expect(GameStore.getState().incrementLife).toHaveBeenCalledWith({
        playerId: 1,
        value: 1,
      });

      act(() => fireEvent.press(getByTestId("decrementer-1")));

      expect(GameStore.getState().incrementLife).toHaveBeenCalledWith({
        playerId: 1,
        value: -1,
      });
    });

    it("should keep calling incrementLife when incrementer button is held", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      act(() => {
        fireEvent(getByTestId("incrementer-1"), "longPress");
      });

      act(() => {
        jest.advanceTimersByTime(INCREMENT_HOLD_INTERVAL * 500);
      });

      expect(GameStore.getState().incrementLife).toHaveBeenCalledTimes(500);
    });

    it("should stop calling incrementLife when incrementer button is released", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      act(() => {
        fireEvent(getByTestId("incrementer-1"), "longPress");
      });

      act(() => {
        jest.advanceTimersByTime(INCREMENT_HOLD_INTERVAL * 500);
        fireEvent(getByTestId("incrementer-1"), "pressOut");
      });

      // expect to have been called at least 500 times
      expect(GameStore.getState().incrementLife).toHaveBeenCalledTimes(500);
    });
  });

  describe("LifeTotal", () => {
    it("should render correctly", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);
      expect(getByTestId("lifetotal-1")).toBeOnTheScreen();
    });

    it("should render with initial life total = STARTING_VALUE", () => {
      const { getByText } = render(<PlayerBox playerId={1} />);

      expect(getByText(String(STARTING_VALUE))).toBeTruthy();
    });

    it("should render with empty delta", () => {
      const { getByText } = render(<PlayerBox playerId={1} />);

      expect(getByText(" ")).toBeTruthy();
    });

    it("should increment lifetotal and delta when incrementer button is pressed", async () => {
      const { getByTestId, queryByText } = render(<PlayerBox playerId={1} />);

      expect(queryByText(String(STARTING_VALUE))).toBeTruthy();

      act(() => fireEvent.press(getByTestId("incrementer-1")));

      expect(queryByText(String(STARTING_VALUE + 1))).toBeTruthy();

      expect(queryByText("40")).toBeFalsy();
    });

    it("should reset delta after a certain amount of time", async () => {
      const { getByTestId, queryByText } = render(<PlayerBox playerId={1} />);

      const incButton = getByTestId("incrementer-1");

      act(() => fireEvent.press(incButton));

      expect(queryByText(String(STARTING_VALUE + 1))).toBeTruthy();

      act(() => jest.advanceTimersByTime(TIME_TO_RESET_DELTA));

      expect(queryByText("+1")).toBeFalsy();
    });

    it("should decrement lifetotal and delta when decrementer button is pressed", async () => {
      const { getByTestId, queryByText } = render(<PlayerBox playerId={1} />);

      expect(queryByText(String(STARTING_VALUE))).toBeTruthy();

      act(() => fireEvent.press(getByTestId("decrementer-1")));

      expect(queryByText(String(STARTING_VALUE - 1))).toBeTruthy();

      expect(queryByText("40")).toBeFalsy();
    });

    it("should reset delta after a certain amount of time", async () => {
      const { getByTestId, queryByText } = render(<PlayerBox playerId={1} />);

      const decButton = getByTestId("decrementer-1");

      act(() => {
        fireEvent.press(decButton);
        fireEvent.press(decButton);
      });

      expect(queryByText(String(STARTING_VALUE - 2))).toBeTruthy();

      act(() => jest.advanceTimersByTime(TIME_TO_RESET_DELTA));

      expect(queryByText("-2")).toBeFalsy();
    });

    it("should have a opacity when lifetotal is <= 0", async () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      const lifeTotalText = getByTestId("lifetotal-1");

      act(() => {
        fireEvent(getByTestId("decrementer-1"), "longPress");
        jest.advanceTimersByTime(INCREMENT_HOLD_INTERVAL);
        //while lifeTotal is higher than 0, opacity should be 1
        while (GameStore.getState().players[1].lTotal > 0) {
          jest.advanceTimersByTime(INCREMENT_HOLD_INTERVAL);

          expect(lifeTotalText).toHaveStyle({ opacity: 1 });
        }
      });

      expect(lifeTotalText).not.toHaveStyle({ opacity: 1 });
    });
  });

  describe("Damage All Button", () => {
    beforeEach(() => {
      jest
        .spyOn(GameStore.getState(), "damageAllOponents")
        .mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should render correctly", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);
      expect(getByTestId("damage-all-1")).toBeOnTheScreen();
    });

    it("should call damageAllOponents with -1 when button is pressed", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      act(() => fireEvent.press(getByTestId("damage-all-1")));

      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledWith({
        playerId: 1,
        value: -1,
      });
    });

    it("should call damageAllOponents with +1 when button is long pressed", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledTimes(0);

      act(() => {
        fireEvent(getByTestId("damage-all-1"), "longPress");
      });

      act(() => {
        jest.advanceTimersByTime(DAMAGE_ALL_INTERVAL);
        fireEvent(getByTestId("damage-all-1"), "pressOut");
      });

      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledWith({
        playerId: 1,
        value: 1,
      });
      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledTimes(1);
    });

    it("should keep calling damageAllOponents with +1 when button is held and stop after release", () => {
      const { getByTestId } = render(<PlayerBox playerId={1} />);

      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledTimes(0);

      act(() => {
        fireEvent(getByTestId("damage-all-1"), "longPress");
      });

      act(() => {
        jest.advanceTimersByTime(DAMAGE_ALL_INTERVAL * 10);
        fireEvent(getByTestId("damage-all-1"), "pressOut");
      });

      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledTimes(10);

      act(() => {
        jest.advanceTimersByTime(DAMAGE_ALL_INTERVAL * 10);
      });

      expect(GameStore.getState().damageAllOponents).toHaveBeenCalledTimes(10);
    });
  });
});
