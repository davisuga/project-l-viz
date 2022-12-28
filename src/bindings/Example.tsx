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
import {
  colorOfCell,
  colorOfPiece,
  Matrix5x5,
  PieceType,
  shapeOfPiece,
} from "../gamestate";

interface Piece {
  color: string;
  piece: number[][];
}

function MatrixRender({
  position,
  value,
  scale,
}: {
  position: [number, number, number];
  value: number[][];
  scale?: number;
}) {
  if (!value) {
    debugger;
  }
  return (
    <Box scale={scale} position={position}>
      {value?.map((row, i) =>
        row?.map(
          (piece, j) =>
            piece !== 1 && (
              <DreiBox
                key={i + j}
                args={[1, 1, 1]}
                position={[j, -i, piece !== 0 ? 0.3 : 0]}
              >
                <meshStandardMaterial color={colorOfCell(piece) || "white"} />
              </DreiBox>
            )
        )
      )}
    </Box>
  );
}

export const Card = ({
  position = [0, 0, 0],
  shape,
  score,
  reward,
  ...props
}: {
  position?: [number, number, number];
  shape: ProjectL.Matrix5x5;
  score: number;
  reward: {
    shape: Matrix5x5;
    color: string;
  };
}) => {
  const length = shape.length;

  return (
    <Box position={position}>
      <MatrixRender value={shape} position={[0, 0, 0]}></MatrixRender>
      <MatrixRender
        value={reward.shape}
        position={[4, 1.5, 0.4]}
        scale={0.4}
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
const value = ProjectL.sample;
export const Grid = <T extends unknown>({
  data,
  render,
  componentSize,
  spacing,
  rows = 2,
  columns = Math.round(data.length / rows),
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
const leftMost = -15;
function UserPieces({ value }: { value: PieceType[] }) {
  console.log("piece: ", value);

  return (
    <Flex flexDir="row" position={[leftMost, -25, 0]}>
      {value.map((item) => (
        <Box marginLeft={1} key={item}>
          <MatrixRender
            value={shapeOfPiece[item]}
            position={[0, 0, 0]}
          ></MatrixRender>
        </Box>
      ))}
    </Flex>
  );
}

export const Game = ({ value }: { value: ProjectL.GameState }) => {
  return (
    <Suspense fallback={"loading..."}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Flex flexDir="row">
        {value.black_puzzles.map((item) => (
          <Box marginLeft={10} key={item.points}>
            <Card
              shape={item.matrix}
              position={[0, 0, 0]}
              reward={{
                color: colorOfPiece[item.reward],
                shape: shapeOfPiece[item.reward],
              }}
              score={item.points}
            />
          </Box>
        ))}
      </Flex> */}
      <Grid
        data={value.white_puzzles}
        columns={4}
        rows={1}
        render={(item) => (
          <Card
            shape={item.matrix}
            position={[leftMost, 10, 0]}
            reward={{
              color: colorOfPiece[item.reward],
              shape: shapeOfPiece[item.reward],
            }}
            score={item.points}
          />
        )}
        componentSize={[10, 10]}
        spacing={[0, 0]}
      />
      <Grid
        data={value.black_puzzles}
        columns={4}
        rows={1}
        render={(item) => (
          <Card
            shape={item.matrix}
            position={[leftMost, 0, 0]}
            reward={{
              color: colorOfPiece[item.reward],
              shape: shapeOfPiece[item.reward],
            }}
            score={item.points}
          />
        )}
        componentSize={[10, 10]}
        spacing={[0, 0]}
      />
      <UserPieces
        value={Object.entries(value.players_pieces[1])
          .reduce(
            (acc, [pieceID, quantity]) => [
              ...Array(quantity).fill(pieceID),
              ...acc,
            ],
            []
          )
          .filter(Boolean)}
      />
      <Grid
        data={value.players_puzzles[0]}
        columns={4}
        rows={1}
        render={(item) => (
          <Card
            shape={item.matrix}
            position={[leftMost, -15, 0]}
            reward={{
              color: colorOfPiece[item.reward],
              shape: shapeOfPiece[item.reward],
            }}
            score={item.points}
          />
        )}
        componentSize={[10, 10]}
        spacing={[0, 0]}
      />
      <OrbitControls />
    </Suspense>
  );
};

export const Example = () => {
  return (
    <>
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
        {JSON.stringify(value)}
      </div>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-10, 0, 40] }}
        style={{ width: "100%", height: "100%", background: "black" }}
      >
        <Game value={ProjectL.sample} />
      </Canvas>
    </>
  );
};
