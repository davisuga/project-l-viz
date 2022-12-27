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
import { colorOfPiece, PieceType, shapeOfPiece } from "../gamestate";
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
  shape,
  score,
  color,
  ...props
}: {
  board: number[][];
  position?: [number, number, number];
  shape: ProjectL.Matrix5x5;
  score: number;
  color: string;
}) => {
  const length = board.length;

  return (
    <Box position={position}>
      <MatrixRender value={examplePuzzle} position={[0, 0, 0]}></MatrixRender>
      <MatrixRender
        value={shape}
        position={[4, 1.5, 0.4]}
        scale={0.4}
        color={color}
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
  render,
  componentSize,
  spacing,
  rows = 2,
  columns = data.length / rows,
  position = [0, 0, 0],
}: {
  data: T[];
  render: (item: T) => React.ReactNode;
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
        row.map((item, j) => {
          const x = j * (spacing[0] + componentSize[0]);
          const y = i * (spacing[1] + componentSize[1]);

          return (
            <Box key={i + j} position={[x, y, 0]}>
              {render(item)}
            </Box>
          );
        })
      )}
      ,
    </Box>
  );
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
        <div>Score: {value?.players_points[0]}</div>
        <div>White cards left: {value?.white_puzzles_remaining}</div>
        <div>Black cards left: {value?.black_puzzles_remaining}</div>
      </div>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 40] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Grid
          data={[...value.black_puzzles, ...value.white_puzzles]}
          render={(item) => (
            <Card
              board={item.matrix}
              position={[0, 0, 0]}
              color={colorOfPiece[item.reward]}
              shape={shapeOfPiece[item.reward]}
              score={1}
            />
          )}
          componentSize={[10, 10]}
          spacing={[0, 0]}
        />
        <Grid
          position={[-2, -30, 0]}
          data={Object.values(value.players_pieces[0])}
          render={(item: PieceType) => (
            <MatrixRender
              value={shapeOfPiece[item]}
              position={[0, 0, 0]}
              color={colorOfPiece[item]}
            ></MatrixRender>
          )}
          componentSize={[5, 5]}
          spacing={[0, 0]}
        />
        <Grid
          data={value.players_puzzles[0]}
          columns={4}
          rows={1}
          render={(item) => (
            <Card
              board={examplePuzzle}
              position={[0, -15, 0]}
              color={colorOfPiece[item.reward]}
              shape={shapeOfPiece[item.reward]}
              score={1}
            />
          )}
          componentSize={[10, 10]}
          spacing={[0, 0]}
        />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
};

export const Example = () => {
  return <Game value={ProjectL.sample} />;
};
