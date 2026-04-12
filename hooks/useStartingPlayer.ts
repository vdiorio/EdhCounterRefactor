import { useEffect, useRef } from "react";
import GameStore from "@/store/GameStore";
import { getPlayerIds } from "@/components/LayoutGenerator/Component/utils";
import { gameLayout } from "@/store/types";

const DELAYS = [80, 80, 80, 80, 80, 80, 80, 100, 120, 150, 180, 220, 260];

// Clockwise order: top → right → bottom → left(reversed)
function getClockwiseOrder(layout: gameLayout): number[] {
  return [
    ...getPlayerIds(layout, 0),
    ...getPlayerIds(layout, 1),
    ...getPlayerIds(layout, 3),
    ...[...getPlayerIds(layout, 2)].reverse(),
  ];
}

function buildSequence(winner: number, layout: gameLayout): number[] {
  const order = getClockwiseOrder(layout);
  const winnerIndex = order.indexOf(winner);
  const seq: number[] = [];
  // 3 fast full rotations
  for (let c = 0; c < 3; c++) seq.push(...order);
  // slow approach up to and including the winner
  for (let i = 0; i <= winnerIndex; i++) seq.push(order[i]);
  return seq;
}

export function useStartingPlayer() {
  const numPlayers = GameStore((s) => s.numPlayers);
  const gameLayout = GameStore((s) => s.gameLayout);
  const setStartingPlayerId = GameStore((s) => s.setStartingPlayerId);

  const weightsRef = useRef<Record<number, number>>({});
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
      setStartingPlayerId(null);
    },
    []
  );

  const getWeights = () => {
    const w = weightsRef.current;
    if (Object.keys(w).length !== numPlayers)
      for (let i = 1; i <= numPlayers; i++) w[i] = 1;
    return w;
  };

  const pickWeighted = (): number => {
    const w = getWeights();
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let id = 1; id <= numPlayers; id++) {
      r -= w[id];
      if (r <= 0) return id;
    }
    return numPlayers;
  };

  const chooseStartingPlayer = () => {
    timersRef.current.forEach(clearTimeout);

    const winner = pickWeighted();
    weightsRef.current[winner] *= 0.74;

    const seq = buildSequence(winner, gameLayout);
    let accumulated = 0;
    const timers: NodeJS.Timeout[] = [];

    seq.forEach((id, i) => {
      accumulated += DELAYS[Math.min(i, DELAYS.length - 1)];
      timers.push(setTimeout(() => setStartingPlayerId(id), accumulated));
    });

    // Clear highlight 2s after animation ends
    timers.push(setTimeout(() => setStartingPlayerId(null), accumulated + 2000));

    timersRef.current = timers;
  };

  return { chooseStartingPlayer };
}
