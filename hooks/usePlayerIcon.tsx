import React from "react";
import { View } from "react-native";
import GameStore from "@/store/GameStore";
import StyleStore from "@/store/StyleStore";
import { getPlayerDirection } from "@/components/LayoutGenerator/Component/utils";
import { Direction } from "@/components/types";

/**
 * Locates a player within the layout array and returns their side/index.
 */
function locatePlayer(layout: number[], playerId: number) {
  let offset = 0;
  for (let side = 0; side < layout.length; side++) {
    const count = layout[side];
    if (playerId <= offset + count) {
      return { side, index: playerId - offset - 1 };
    }
    offset += count;
  }
  return { side: -1, index: -1 };
}

/**
 * Hook that returns a function to generate a player icon SVG.
 * The icon shows the position of an opponent relative to the current player
 * and is rotated to match the current player's perspective on the table.
 */
export default function usePlayerIcon(viewingPlayerId: number) {
  const layout = GameStore((s) => s.gameLayout);
  const colors = StyleStore((s) => s.playerColors);

  // determine viewer direction and compute rotation
  const viewerDir = getPlayerDirection(layout, viewingPlayerId);
  const isVerticalLayout = viewerDir === Direction.up;
  let viewerRotation = 0;
  switch (viewerDir) {
    case Direction.right:
      viewerRotation = 180;
      break;
    case Direction.up:
      viewerRotation = 180;
      break;
    default:
      // left, down or others: no change
      break;
  }

  return (opponentId: number, size: number = 80): JSX.Element => {
    const width = size;
    const height = size / 2;
    const [a, b, c, d] = layout;

    const { side, index: localIndex } = locatePlayer(layout, opponentId);

    const highlight = colors[opponentId - 1] || "#000";
    const normal = "#888";

    // convenience helpers to render nth element in column/row
    const makeColumn = (count: number, columnIndex: number) => (
      <View
        style={{
          width: width * 0.2,
          flexDirection: "column",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={`${columnIndex}-${i}`}
            style={{
              flex: 1,
              backgroundColor:
                columnIndex === side && localIndex === i ? highlight : normal,
              borderWidth: 0.5,
            }}
          />
        ))}
      </View>
    );

    const makeRow = (count: number, rowIndex: number) => (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={`${rowIndex}-${i}`}
            style={{
              flex: 1,
              backgroundColor:
                rowIndex === side && localIndex === i ? highlight : normal,
              borderWidth: 0.5,
            }}
          />
        ))}
      </View>
    );

    // Horizontal layout (original style)
    const HorizontalLayout = (
      <View
        style={{
          minWidth: width,
          minHeight: height,
          flexDirection: "row",
        }}
      >
        {a > 0 && makeColumn(a, 0)}

        <View style={{ flex: 1, flexDirection: "column" }}>
          {b > 0 && makeRow(b, 1)}
          {c > 0 && makeRow(c, 2)}
        </View>

        {d > 0 && makeColumn(d, 3)}
      </View>
    );

    // Vertical layout (stacked columns)
    const VerticalLayout = (
      <View
        style={{
          minWidth: height,
          minHeight: width,
          flexDirection: "column",
        }}
      >
        {a > 0 && (
          <View style={{ flex: 1, flexDirection: "row" }}>
            {Array.from({ length: a }).map((_, i) => (
              <View
                key={`v-a-${i}`}
                style={{
                  flex: 1,
                  backgroundColor:
                    side === 0 && localIndex === i ? highlight : normal,
                  borderWidth: 0.5,
                }}
              />
            ))}
          </View>
        )}

        {b > 0 && makeRow(b, 1)}
        {c > 0 && makeRow(c, 2)}

        {d > 0 && (
          <View style={{ flex: 1, flexDirection: "row" }}>
            {Array.from({ length: d }).map((_, i) => (
              <View
                key={`v-d-${i}`}
                style={{
                  flex: 1,
                  backgroundColor:
                    side === 3 && localIndex === i ? highlight : normal,
                  borderWidth: 0.5,
                }}
              />
            ))}
          </View>
        )}
      </View>
    );

    return (
      <View
        style={{
          transform: [{ rotate: `${viewerRotation}deg` }],
        }}
      >
        {isVerticalLayout ? VerticalLayout : HorizontalLayout}
      </View>
    );
  };
}
