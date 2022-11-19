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

export const Example = () => {
  const [xCorner, yCorner, zCorner] = [-50, 25, 0];
  return (
    <Suspense fallback={"loading..."}>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 40] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {boardMatrix.map((row, i) =>
          row.map((_, j) => {
            const x = xCorner + i * 10;
            const y = yCorner - j * 10;

            return (
              <Card
                key={i + j}
                position={[x, y, zCorner]}
                board={examplePuzzle}
                reward={L}
                score={i + 1}
              />
            );
          })
        )}

        <OrbitControls />
      </Canvas>
    </Suspense>
  );
};
