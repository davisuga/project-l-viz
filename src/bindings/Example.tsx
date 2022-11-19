import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import {
  Billboard,
  OrbitControls,
  RoundedBox,
  Text,
  Box as DreiBox,
} from "@react-three/drei";
import { Flex, Box } from "@react-three/flex";
const black = "#2a2a2a";
import * as ProjectL from "../gamestate";
const examplePuzzle = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];
const L = {
  color: "#0000ff",
  piece: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
  ],
};

interface Piece {
  color: string;
  piece: number[][];
}

function MatrixRender({
  position,
  value,
  color = "white",
  scale,
}: {
  position: [number, number, number];
  value: number[][];
  color?: string;
  scale?: number;
}) {
  return (
    <Box scale={scale} position={position}>
      {value.map((row, i) =>
        row.map(
          (piece, j) =>
            piece === 1 && (
              <DreiBox key={i + j} args={[1, 1, 1]} position={[j, -i, 0]}>
                <meshStandardMaterial color={color} />
              </DreiBox>
            )
        )
      )}
    </Box>
  );
}

export const Card = ({
  board,
  position = [0, 0, 0],
  reward,
  score,
  ...props
}: {
  board: number[][];
  position?: [number, number, number];
  reward: Piece;
  score: number;
}) => {
  const length = board.length;

  return (
    <Box position={position}>
      <MatrixRender value={examplePuzzle} position={[0, 0, 0]}></MatrixRender>
      <MatrixRender
        value={reward.piece}
        position={[4, 1.5, 0.4]}
        scale={0.4}
        color={reward.color}
      ></MatrixRender>
      <RoundedBox
        smoothness={5}
        radius={0.5}
        args={[length + 2, length + 2, 1]}
        position={[+2, -2, -0.01]}
      >
        <meshStandardMaterial color={black} />
      </RoundedBox>
      <Text
        position={[-0.5, +0.5, 0.5]}
        color={"#fff"}
        fontSize={1}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
      >
        {score}
      </Text>
    </Box>
  );
};
const boardMatrix: number[][] = Array(4).fill(Array(2).fill(0));

export const Grid = <T extends unknown>({
  data,
  Component,
  componentSize,
  spacing,
  rows = 2,
  columns = data.length / rows,
  position = [0, 0, 0],
}: {
  data: T[];
  Component: React.ReactNode;
  componentSize: [number, number];
  spacing: [number, number];
  rows?: number;
  columns?: number;
  position?: [number, number, number];
}) => {
  const resized = data.reduce<T[][]>((acc, value, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    acc[row][column] = value;
    return acc;
  }, Array(rows).fill(Array(columns).fill(0)));
  return (
    <Box position={position}>
      {resized.map((row, i) =>
        row.map((_, j) => {
          const x = j * (spacing[0] + componentSize[0]);
          const y = i * (spacing[1] + componentSize[1]);

          return (
            <Box key={i + j} position={[x, y, 0]}>
              {Component}
            </Box>
          );
        })
      )}
    </Box>
  );
};

const rotateMatrix = (matrix: number[][], degrees: number): number[][] => {
  if (degrees === 0) return matrix;
  const rotated = matrix.map((row, i) =>
    row.map((_, j) => matrix[matrix.length - 1 - j][i])
  );
  if (degrees <= 90) {
    return rotated;
  }
  return rotateMatrix(rotated, degrees - 90);
};
const mocked: ProjectL.GameState = {
  availablePieces: [
    {
      piece: ProjectL.Piece.L,
      quantity: 5,
    },
    {
      piece: ProjectL.Piece.Purple,
      quantity: 2,
    },
  ],
  blackCards: [
    {
      content: examplePuzzle.map((x) => ({ values: x })),
      points: 4,
      id: 1,
      reward: ProjectL.Piece.Purple,
    },
    {
      content: examplePuzzle.map((x) => ({ values: x })),
      points: 3,
      id: 1,
      reward: ProjectL.Piece.L,
    },
    {
      content: examplePuzzle.map((x) => ({ values: x })),
      points: 4,
      id: 1,
      reward: ProjectL.Piece.Purple,
    },
  ],
  whiteCards: [
    {
      content: examplePuzzle.map((x) => ({ values: x })),
      points: 1,
      id: 1,
      reward: ProjectL.Piece.Purple,
    },
    {
      content: examplePuzzle.map((x) => ({ values: x })),
      points: 2,
      id: 1,
      reward: ProjectL.Piece.L,
    },
    {
      content: examplePuzzle.map((x) => ({ values: x })),
      points: 3,
      id: 1,
      reward: ProjectL.Piece.Purple,
    },
  ],
  blackCardsLeft: 7,
  whiteCardsLeft: 5,
  deck: [],
};
export const Game = ({ value }: { value: ProjectL.GameState }) => {
  return (
    <Suspense fallback={"loading..."}>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          padding: 10,
          fontSize: 20,
        }}
      >
        <div>Score: {value?.score}</div>
        <div>White cards left: {value?.whiteCardsLeft}</div>
        <div>Black cards left: {value?.blackCardsLeft}</div>
      </div>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 40] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Grid
          data={Array(8).fill(0)}
          Component={
            <Card
              board={examplePuzzle}
              position={[0, 0, 0]}
              reward={L}
              score={1}
            />
          }
          componentSize={[10, 10]}
          spacing={[0, 0]}
        />
        <Grid
          position={[-2, -30, 0]}
          data={Array(16).fill(0)}
          columns={8}
          rows={2}
          Component={
            <MatrixRender
              value={rotateMatrix(L.piece, 90)}
              position={[0, 0, 0]}
              color={L.color}
            ></MatrixRender>
          }
          componentSize={[5, 5]}
          spacing={[0, 0]}
        />
        <Grid
          data={Array(4).fill(0)}
          columns={4}
          rows={1}
          Component={
            <Card
              board={examplePuzzle}
              position={[0, -15, 0]}
              reward={L}
              score={1}
            />
          }
          componentSize={[10, 10]}
          spacing={[0, 0]}
        />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
};

export const Example = () => {
  return <Game />;
};
