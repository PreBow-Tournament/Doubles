import { Team } from '..';
import { two } from '../../maps';

const scoreRange = [0, 1, 2, 3, 4, 5] as const;

interface GameTeam {
    players: Team;
    colour: 'red' | 'blue';
    score: typeof scoreRange[number];
    damage: number;
    pressure: `${number}%`;
    blocksPlaced: number;
    blocksBroken: number;
}

export interface Game {
    status: 'Pending' | 'Finished';
    results?: [GameTeam, GameTeam];
    time?: `${number}:${number}`;
    map: two.RawMap;
}