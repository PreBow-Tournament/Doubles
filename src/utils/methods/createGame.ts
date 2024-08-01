import { GamePlayers, Team } from '..';

export function createGame(teams: Team[]): GamePlayers[] {
    const games: GamePlayers[] = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            const teamA = teams[i];
            const teamB = teams[j];
            if (i !== j && !teamA.some(player => teamB.includes(player))) games.push([teamA, teamB]);
        }
    }
    return games;
}