import { Player, Team } from '..';

export function createTeams(names: Player[]): Team[] {
    const teams: Team[] = [];
    for (let i = 0; i < names.length; i++) {
        for (let j = i + 1; j < names.length; j++) {
            teams.push([names[i].name, names[j].name]);
        }
    }
    return teams;
}