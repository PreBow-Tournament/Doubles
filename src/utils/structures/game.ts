import { Status, Results, Map, Time, GamePlayers } from './types';

export interface Game {
    readonly id: string;
    readonly players: GamePlayers;
    status: Status;
    map?: Map | 'Undecided';
    time?: Time | 'N/A';
    results?: Results | 'N/A';
}