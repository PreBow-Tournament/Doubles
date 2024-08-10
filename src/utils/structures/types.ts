import { two } from '../maps';

export type Team = [string, string];
export type GamePlayers = [Team, Team];

const scoreRange = [0, 1, 2, 3, 4, 5] as const;

export interface GameTeam {
    readonly players: Team;
    readonly colour: 'red' | 'blue';
    readonly score: typeof scoreRange[number];
    readonly damage: number;
    readonly pressure: `${number}%`;
    readonly blocksPlaced: number;
    readonly blocksBroken: number;
}

export type Status = 'Pending' | 'Finished';
export type Results = [GameTeam, GameTeam];
export type Time = `${number}:${number}`
export type Map = two.RawMap;