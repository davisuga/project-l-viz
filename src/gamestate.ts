/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum Piece {
  L = 1,
  Green = 2,
  Corner = 3,
  Purple = 4,
  T = 5,
  Red = 6,
  Ladder = 7,
  Dot = 8,
  UNRECOGNIZED = -1,
}

export function pieceFromJSON(object: any): Piece {
  switch (object) {
    case 1:
    case "L":
      return Piece.L;
    case 2:
    case "Green":
      return Piece.Green;
    case 3:
    case "Corner":
      return Piece.Corner;
    case 4:
    case "Purple":
      return Piece.Purple;
    case 5:
    case "T":
      return Piece.T;
    case 6:
    case "Red":
      return Piece.Red;
    case 7:
    case "Ladder":
      return Piece.Ladder;
    case 8:
    case "Dot":
      return Piece.Dot;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Piece.UNRECOGNIZED;
  }
}

export function pieceToJSON(object: Piece): string {
  switch (object) {
    case Piece.L:
      return "L";
    case Piece.Green:
      return "Green";
    case Piece.Corner:
      return "Corner";
    case Piece.Purple:
      return "Purple";
    case Piece.T:
      return "T";
    case Piece.Red:
      return "Red";
    case Piece.Ladder:
      return "Ladder";
    case Piece.Dot:
      return "Dot";
    case Piece.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface IntList {
  values: number[];
}

export interface Puzzle {
  id: number;
  reward: Piece;
  points: number;
  content: IntList[];
}

export interface PieceQuantity {
  piece: Piece;
  quantity: number;
}

export interface GameState {
  blackCardsLeft: number;
  whiteCardsLeft: number;
  blackCards: Puzzle[];
  whiteCards: Puzzle[];
  score: number;
  deck: Puzzle[];
  availablePieces: PieceQuantity[];
}

function createBaseIntList(): IntList {
  return { values: [] };
}

export const IntList = {
  encode(
    message: IntList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.values) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.values.push(reader.int32());
            }
          } else {
            message.values.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IntList {
    return {
      values: Array.isArray(object?.values)
        ? object.values.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: IntList): unknown {
    const obj: any = {};
    if (message.values) {
      obj.values = message.values.map((e) => Math.round(e));
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IntList>, I>>(object: I): IntList {
    const message = createBaseIntList();
    message.values = object.values?.map((e) => e) || [];
    return message;
  },
};

function createBasePuzzle(): Puzzle {
  return { id: 0, reward: 1, points: 0, content: [] };
}

export const Puzzle = {
  encode(
    message: Puzzle,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.reward !== 1) {
      writer.uint32(16).int32(message.reward);
    }
    if (message.points !== 0) {
      writer.uint32(24).int32(message.points);
    }
    for (const v of message.content) {
      IntList.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Puzzle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePuzzle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.reward = reader.int32() as any;
          break;
        case 3:
          message.points = reader.int32();
          break;
        case 4:
          message.content.push(IntList.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Puzzle {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      reward: isSet(object.reward) ? pieceFromJSON(object.reward) : 1,
      points: isSet(object.points) ? Number(object.points) : 0,
      content: Array.isArray(object?.content)
        ? object.content.map((e: any) => IntList.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Puzzle): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.reward !== undefined && (obj.reward = pieceToJSON(message.reward));
    message.points !== undefined && (obj.points = Math.round(message.points));
    if (message.content) {
      obj.content = message.content.map((e) =>
        e ? IntList.toJSON(e) : undefined
      );
    } else {
      obj.content = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Puzzle>, I>>(object: I): Puzzle {
    const message = createBasePuzzle();
    message.id = object.id ?? 0;
    message.reward = object.reward ?? 1;
    message.points = object.points ?? 0;
    message.content = object.content?.map((e) => IntList.fromPartial(e)) || [];
    return message;
  },
};

function createBasePieceQuantity(): PieceQuantity {
  return { piece: 1, quantity: 0 };
}

export const PieceQuantity = {
  encode(
    message: PieceQuantity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.piece !== 1) {
      writer.uint32(8).int32(message.piece);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PieceQuantity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePieceQuantity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.piece = reader.int32() as any;
          break;
        case 2:
          message.quantity = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PieceQuantity {
    return {
      piece: isSet(object.piece) ? pieceFromJSON(object.piece) : 1,
      quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
    };
  },

  toJSON(message: PieceQuantity): unknown {
    const obj: any = {};
    message.piece !== undefined && (obj.piece = pieceToJSON(message.piece));
    message.quantity !== undefined &&
      (obj.quantity = Math.round(message.quantity));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PieceQuantity>, I>>(
    object: I
  ): PieceQuantity {
    const message = createBasePieceQuantity();
    message.piece = object.piece ?? 1;
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseGameState(): GameState {
  return {
    blackCardsLeft: 0,
    whiteCardsLeft: 0,
    blackCards: [],
    whiteCards: [],
    score: 0,
    deck: [],
    availablePieces: [],
  };
}

export const GameState = {
  encode(
    message: GameState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.blackCardsLeft !== 0) {
      writer.uint32(8).int32(message.blackCardsLeft);
    }
    if (message.whiteCardsLeft !== 0) {
      writer.uint32(16).int32(message.whiteCardsLeft);
    }
    for (const v of message.blackCards) {
      Puzzle.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.whiteCards) {
      Puzzle.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.score !== 0) {
      writer.uint32(40).int32(message.score);
    }
    for (const v of message.deck) {
      Puzzle.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.availablePieces) {
      PieceQuantity.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blackCardsLeft = reader.int32();
          break;
        case 2:
          message.whiteCardsLeft = reader.int32();
          break;
        case 3:
          message.blackCards.push(Puzzle.decode(reader, reader.uint32()));
          break;
        case 4:
          message.whiteCards.push(Puzzle.decode(reader, reader.uint32()));
          break;
        case 5:
          message.score = reader.int32();
          break;
        case 6:
          message.deck.push(Puzzle.decode(reader, reader.uint32()));
          break;
        case 7:
          message.availablePieces.push(
            PieceQuantity.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameState {
    return {
      blackCardsLeft: isSet(object.blackCardsLeft)
        ? Number(object.blackCardsLeft)
        : 0,
      whiteCardsLeft: isSet(object.whiteCardsLeft)
        ? Number(object.whiteCardsLeft)
        : 0,
      blackCards: Array.isArray(object?.blackCards)
        ? object.blackCards.map((e: any) => Puzzle.fromJSON(e))
        : [],
      whiteCards: Array.isArray(object?.whiteCards)
        ? object.whiteCards.map((e: any) => Puzzle.fromJSON(e))
        : [],
      score: isSet(object.score) ? Number(object.score) : 0,
      deck: Array.isArray(object?.deck)
        ? object.deck.map((e: any) => Puzzle.fromJSON(e))
        : [],
      availablePieces: Array.isArray(object?.availablePieces)
        ? object.availablePieces.map((e: any) => PieceQuantity.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GameState): unknown {
    const obj: any = {};
    message.blackCardsLeft !== undefined &&
      (obj.blackCardsLeft = Math.round(message.blackCardsLeft));
    message.whiteCardsLeft !== undefined &&
      (obj.whiteCardsLeft = Math.round(message.whiteCardsLeft));
    if (message.blackCards) {
      obj.blackCards = message.blackCards.map((e) =>
        e ? Puzzle.toJSON(e) : undefined
      );
    } else {
      obj.blackCards = [];
    }
    if (message.whiteCards) {
      obj.whiteCards = message.whiteCards.map((e) =>
        e ? Puzzle.toJSON(e) : undefined
      );
    } else {
      obj.whiteCards = [];
    }
    message.score !== undefined && (obj.score = Math.round(message.score));
    if (message.deck) {
      obj.deck = message.deck.map((e) => (e ? Puzzle.toJSON(e) : undefined));
    } else {
      obj.deck = [];
    }
    if (message.availablePieces) {
      obj.availablePieces = message.availablePieces.map((e) =>
        e ? PieceQuantity.toJSON(e) : undefined
      );
    } else {
      obj.availablePieces = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameState>, I>>(
    object: I
  ): GameState {
    const message = createBaseGameState();
    message.blackCardsLeft = object.blackCardsLeft ?? 0;
    message.whiteCardsLeft = object.whiteCardsLeft ?? 0;
    message.blackCards =
      object.blackCards?.map((e) => Puzzle.fromPartial(e)) || [];
    message.whiteCards =
      object.whiteCards?.map((e) => Puzzle.fromPartial(e)) || [];
    message.score = object.score ?? 0;
    message.deck = object.deck?.map((e) => Puzzle.fromPartial(e)) || [];
    message.availablePieces =
      object.availablePieces?.map((e) => PieceQuantity.fromPartial(e)) || [];
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
