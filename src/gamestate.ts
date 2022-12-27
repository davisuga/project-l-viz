type EmptySpace = 0 | 1;
export enum PieceType {
  DOT = 2,
  GREEN = 3,
  CORNER = 4,
  BLUE = 5,
  LSHAPE = 6,
  PURPLE = 7,
  TSHAPE = 8,
  RED = 9,
  LADDER = 10,
}
export type Matrix5x5 = [
  [number, number, number, number, number],
  [number, number, number, number, number],
  [number, number, number, number, number],
  [number, number, number, number, number],
  [number, number, number, number, number]
];

export const colorOfPiece = {
  [PieceType.DOT]: "#FFED00",
  [PieceType.GREEN]: "#00A03A",
  [PieceType.CORNER]: "#F39200",
  [PieceType.BLUE]: "#0275BF",
  [PieceType.LSHAPE]: "#009DC5",
  [PieceType.PURPLE]: "#954091",
  [PieceType.TSHAPE]: "#E6017D",
  [PieceType.RED]: "#E50051",
  [PieceType.LADDER]: "#EC6607",
};

export const shapeOfPiece: Record<PieceType, Matrix5x5> = {
  [PieceType.DOT]: [
    [PieceType.DOT, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.GREEN]: [
    [PieceType.GREEN, 0, 0, 0, 0],
    [PieceType.GREEN, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.CORNER]: [
    [PieceType.CORNER, 0, 0, 0, 0],
    [PieceType.CORNER, PieceType.CORNER, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.BLUE]: [
    [PieceType.BLUE, 0, 0, 0, 0],
    [PieceType.BLUE, 0, 0, 0, 0],
    [PieceType.BLUE, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.LSHAPE]: [
    [PieceType.LSHAPE, 0, 0, 0, 0],
    [PieceType.LSHAPE, 0, 0, 0, 0],
    [PieceType.LSHAPE, PieceType.LSHAPE, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.PURPLE]: [
    [PieceType.PURPLE, 0, 0, 0, 0],
    [PieceType.PURPLE, 0, 0, 0, 0],
    [PieceType.PURPLE, 0, 0, 0, 0],
    [PieceType.PURPLE, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.TSHAPE]: [
    [PieceType.TSHAPE, PieceType.TSHAPE, PieceType.TSHAPE, 0, 0],
    [0, PieceType.TSHAPE, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.RED]: [
    [PieceType.RED, PieceType.RED, 0, 0, 0],
    [PieceType.RED, PieceType.RED, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [PieceType.LADDER]: [
    [PieceType.LADDER, PieceType.LADDER, 0, 0, 0],
    [0, PieceType.LADDER, PieceType.LADDER, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

enum Rotation {
  UP = 0,
  LEFT = 1,
  DOWN = 2,
  RIGHT = 3,
}

type PieceQuantity = Record<PieceType, number>;
type PlayerPieces = Record<number, PieceQuantity>;

export const sample = {
  black_puzzles: [
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1],
      ] as Matrix5x5,
      points: 3,
      reward: 10 as PieceType,
    },
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1],
      ] as Matrix5x5,
      points: 3,
      reward: 7 as PieceType,
    },
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
      ] as Matrix5x5,
      points: 4,
      reward: 3 as PieceType,
    },
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
      ] as Matrix5x5,
      points: 4,
      reward: 5 as PieceType,
    },
  ],
  white_puzzles: [
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
      ] as Matrix5x5,
      points: 1,
      reward: 3 as PieceType,
    },
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 1, 1, 1],
      ] as Matrix5x5,
      points: 0,
      reward: 4 as PieceType,
    },
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
      ] as Matrix5x5,
      points: 0,
      reward: 3 as PieceType,
    },
    {
      matrix: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 1, 1, 1],
      ] as Matrix5x5,
      points: 0,
      reward: 9 as PieceType,
    },
  ],
  black_puzzles_remaining: 11,
  white_puzzles_remaining: 25,
  piece_quantity: {
    "2": 0,
    "3": 11,
    "4": 15,
    "5": 15,
    "6": 15,
    "7": 15,
    "8": 15,
    "9": 15,
    "10": 15,
  } as PieceQuantity,
  players_pieces: {
    "0": {
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
    },
    "1": {
      "2": 1,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
    },
  } as PlayerPieces,
  players_points: {
    "0": 0,
    "1": 0,
  },
  players_puzzles: {
    "0": [
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 3, 3, 1, 1],
          [1, 2, 0, 0, 1],
          [1, 1, 1, 1, 1],
        ] as Matrix5x5,
        points: 1,
        reward: 5 as PieceType,
      },
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 1, 0, 1, 1],
          [0, 0, 2, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 2, 2],
        ] as Matrix5x5,
        points: 5,
        reward: 2 as PieceType,
      },
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 0, 1],
          [1, 1, 0, 2, 1],
          [0, 2, 0, 0, 1],
          [0, 2, 0, 2, 0],
        ] as Matrix5x5,
        points: 4,
        reward: 3 as PieceType,
      },
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 0, 1, 1, 1],
          [1, 0, 0, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 2, 0, 0, 1],
        ] as Matrix5x5,
        points: 3,
        reward: 5 as PieceType,
      },
    ],
    "1": [
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 0, 2, 0, 1],
          [3, 0, 2, 0, 0],
          [3, 3, 0, 0, 0],
          [1, 3, 0, 2, 1],
        ] as Matrix5x5,
        points: 5,
        reward: 2 as PieceType,
      },
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 3, 3, 1, 1],
          [1, 0, 0, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1],
        ] as Matrix5x5,
        points: 2,
        reward: 5 as PieceType,
      },
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 0, 0, 1, 1],
          [1, 1, 0, 0, 1],
          [1, 1, 1, 1, 1],
        ] as Matrix5x5,
        points: 0,
        reward: 10 as PieceType,
      },
      {
        matrix: [
          [1, 1, 1, 1, 1],
          [1, 1, 2, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 2, 0, 1],
          [1, 0, 0, 0, 1],
        ] as Matrix5x5,
        points: 3,
        reward: 8 as PieceType,
      },
    ],
  },
  current_player: 0,
  remaining_actions: 2,
  did_master_action: false,
  remaining_rounds: null as null | number,
  points_to_pay: 0,
};

export type GameState = typeof sample;
