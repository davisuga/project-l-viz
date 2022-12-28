import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Billboard,
  OrbitControls,
  RoundedBox,
  Text,
  Box as DreiBox,
  Plane,
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
      {value?.map((row, i) => (
        <Flex key={i} flexDir="column">
          {row?.map(
            (piece, j) =>
              piece !== 1 && (
                <Box key={i + j} flexGrow={1} position={[j, -i, 0]}>
                  <meshStandardMaterial color={colorOfCell(piece) || "white"} />
                </Box>
              )
          )}
        </Flex>
      ))}
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

export const Grid = <T extends unknown>({
  data,
  render,
  componentSize,
  spacing,
  rows = 2,
  columns = Math.ceil(data.length / rows),
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
            <Box key={`${i} ${j}`} position={[x, y, 0]}>
              {render(item)}
            </Box>
          );
        })
      )}
      ,
    </Box>
  );
};
function UserPieces({ value }: { value: PieceType[] }) {
  console.log("piece: ", value);
  return (
    <Grid
      position={[-2, -30, 0]}
      data={value}
      render={(item: PieceType) => (
        <MatrixRender
          value={shapeOfPiece[item]}
          position={[0, 0, 0]}
        ></MatrixRender>
      )}
      componentSize={[5, 5]}
      spacing={[0, 0]}
    />
  );
}
const value = ProjectL.sample;
export const Game = ({ value }: { value: ProjectL.GameState }) => {
  return (
    <Suspense fallback={"loading..."}>
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
              shape={item.matrix}
              position={[0, 0, 0]}
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

        {/* <UserPieces
          value={Object.entries(value.players_pieces[1])
            .reduce(
              (acc, [pieceID, quantity]) => [
                ...Array(quantity).fill(Number(pieceID)),
                ...acc,
              ],
              []
            )
            .filter(Boolean)}
        /> */}

        <Grid
          data={value.players_puzzles[0]}
          columns={4}
          rows={1}
          render={(item) => (
            <Card
              shape={item.matrix}
              position={[0, -15, 0]}
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
      </Canvas>
    </Suspense>
  );
};
const Layout = () => {
  const { height, width } = useThree((state) => state.viewport);

  return (
    <Suspense>
      <Flex
        size={[width, height, 0]}
        position={[-width / 2, height / 2, 0]}
        flexDirection="row"
        justifyContent="center"
        wrap="wrap"
        // padding={0.1}
      >
        {value.players_puzzles[0].map((item) => (
          <Box centerAnchor key={item.points}>
            <Card
              shape={item.matrix}
              // position={[0, -15, 0]}
              reward={{
                color: colorOfPiece[item.reward],
                shape: shapeOfPiece[item.reward],
              }}
              score={item.points}
            />
          </Box>
        ))}
        {/* <Box centerAnchor>
          <meshStandardMaterial color="black" />
        </Box>
        <Box centerAnchor>
          <meshStandardMaterial color="black" />
        </Box>
        <Box centerAnchor>
          <meshStandardMaterial color="black" />
        </Box> */}
        {/* <Box centerAnchor flexGrow={1}>
          <torusGeometry args={[2, 2, 32, 32]} />
        </Box> */}
        <Box width="auto" height="auto" flexGrow={1} centerAnchor>
          {(width, height) => <Plane args={[width, height]} />}
        </Box>
      </Flex>
      <OrbitControls />
    </Suspense>
  );
};

export const Example = () => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 40] }}
      style={{ width: "100%", height: "100%" }}
    >
      <Layout />;
    </Canvas>
  );
  return <Game value={ProjectL.sample} />;
};
