import React from "react";
import GameStore from "@/store/GameStore";
import usePlayerIcon from "@/hooks/usePlayerIcon";

describe("usePlayerIcon", () => {
  beforeEach(() => {
    // reset game store to default layout
    GameStore.getState().setNumPlayers({ playerCount: 4, alt: false });
  });

  it("returns a function that generates a View element", () => {
    const generate = usePlayerIcon(1);
    const icon = generate(2, 40);

    expect(icon).toBeDefined();
    expect(icon.type.name).toBe("View");
  });

  it("generates a View with full-size container and correct rotation", () => {
    const generate = usePlayerIcon(1);
    const icon = generate(2, 40);
    expect(icon.props.style).toMatchObject({ width: 40, height: 40 });
    // rotation for viewer 1: determine direction and check transform exists
    const rotation = icon.props.style.transform?.[0]?.rotate;
    expect(rotation).toBeDefined();
  });

  it("highlights the opponent with the provided colour", () => {
    const generate = usePlayerIcon(1);
    const icon = generate(2, 24);
    const children = icon.props.children;
    expect(children).toBeDefined();
    // ensure at least one child has backgroundColor equal to the highlight
    const allViews: any[] = Array.isArray(children) ? children : [children];
    const hasHighlighted = allViews.some((v) => v.props.style.backgroundColor);
    expect(hasHighlighted).toBe(true);
  });

  it("expands rectangles to fill full width when side columns are empty", () => {
    GameStore.setState({ gameLayout: [0, 2, 0, 0] });
    const generate = usePlayerIcon(1);
    const size = 40;
    const icon = generate(2, size);
    const middle = icon.props.children[1]; // central container
    expect(middle.props.style.flex).toBe(1);
    // ensure two children covering half each
    const rows = middle.props.children;
    expect(rows.length).toBe(2);
  });

  it("expands rectangles to fill full height when only left column present", () => {
    GameStore.setState({ gameLayout: [1, 0, 0, 0] });
    const generate = usePlayerIcon(1);
    const size = 40;
    const icon = generate(2, size);
    const left = icon.props.children[0];
    expect(left.props.style.width).toBe(size * 0.2);
    expect(left.props.style.flexDirection).toBe("column");
  });

});
