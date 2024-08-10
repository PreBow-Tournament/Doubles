import { Team, Game } from '..';

export function createGame(teams: Team[]): Game[] {
    const games: Game[] = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            const teamA = teams[i];
            const teamB = teams[j];
            if (i !== j && !teamA.some(player => teamB.includes(player))) games.push({ id: Math.random().toString(16).slice(2), players: [teamA, teamB], status: 'Pending' });
        }
    }
    return games;
}