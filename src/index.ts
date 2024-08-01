import { Player, createTeams, createGame } from './utils';

const players: Player[] = [
    { name: 'iDueled', points: 0 },
    { name: 'iCompass', points: 0 },
    { name: 'CommunistPoultry', points: 0 },
    { name: 'V3KY', points: 0 },
    { name: 'GoldenKoopa', points: 0 }
]

const teams = createTeams(players);
const games = createGame(teams);

console.log('Teams:');
teams.forEach(team => console.log(`[${team[0]}, ${team[1]}]`));

console.log('\Games:');
games.forEach(game => {
    console.log(`[${game[0][0]}, ${game[0][1]}] vs [${game[1][0]}, ${game[1][1]}]`);
});