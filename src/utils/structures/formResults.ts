export interface FormResults {
    id: string;
    players: `${string},${string},${string},${string}`;
    map: string;
    time?: string;
    colour1?: string;
    colour2?: string;
    score1?: string;
    score2?: string;
    damage1?: string,
    damage2?: string,
    winner?: number;
};