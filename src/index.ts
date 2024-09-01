import express from 'express';
import path from 'path';
import { winner, two, FormResults, capitalise, createGame, createTeams } from './utils';
import mongoose from 'mongoose';
import { mongooseURI, admins } from './assets/config.json';
import { pointsSchema, gamesSchema } from './schemas';
import session from 'express-session';
import bodyParser from 'body-parser';

declare module 'express-session' {
    interface SessionData {
        user: {
            username: string;
        }
    }
}

mongoose.connect(mongooseURI)
    .then(() => console.log('Successfully connected to database'))
    .catch(console.error);

// const players1 = ['iCompass', 'CommunistPoultry', 'bwonzey', 'Impossibleness', 'iDueled'];
// const teams = createTeams(players1);
// const games = createGame(teams);

// const clear = () => new Promise<void>(async (resolve) => {
//     (await gamesSchema.find({})).forEach(async (game, index, array) => {
//         await gamesSchema.findOneAndDelete(game._id);
//         if (index === array.length - 1) resolve();
//     });
// });

// const loadGames = () => new Promise<void>(async (resolve) => {
//     games.forEach(async ({ id, players, status, map, time, results }, index, array) => {
//         await new gamesSchema({
//             id,
//             players,
//             status,
//             map,
//             time,
//             results: typeof results === 'string' ? [] : results
//         }).save();
//         if (index === array.length - 1) resolve();
//     });
// });

const app = express();
const port = 3000 || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/scripts'));

app.use(session({
    secret: 'this_is_mega_secret',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.get('/', async (req, res) => {
    const user = req.session.user;

    const points = new Map<string, Map<string, Number>>();
    (await pointsSchema.find({})).forEach(({ key, value }) => {
        points.set(key, value as Map<string, number>);
    });

    // await clear();
    // await loadGames();

    const loaded = await gamesSchema.find({});

    res.status(200).render('games.ejs', { games: loaded, points, user, error: null });
});

app.post('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/error/niceTry');

    const { id, players, map, time, score1, score2, colour1, colour2, damage1, damage2 }: FormResults = req.body;
    const split = players.split(',');
    const teams = [split.slice(0, 2), split.slice(2)];

    // console.log({ id, players, map, time, score1, score2, colour1, colour2, damage1, damage2 });

    const valid: (two.RawMap | 'undecided')[] = Array.from(two.rawMaps.values());
    valid.push('undecided');

    if (!valid.includes(map.toLowerCase() as any)) return res.redirect('/error/map');
    if (colour1 === colour2 && colour1 !== undefined) return res.redirect('/error/colours');
    
    if (!time) {
        gamesSchema.findOne({ id }).then(data => {
            data.map = map[0].toUpperCase() + map.slice(1);
            data.save();
        }).catch(console.error);
    } else {
        if (map === 'undecided') return res.redirect('/error/map');

        gamesSchema.findOne({ id }).then(data => {
            data.map = map[0].toUpperCase() + map.slice(1);
            data.time = time;
            data.results = [
                { winner: winner([score1, score2], [damage1, damage2]) === 0, players: teams[0], colour: capitalise(colour1), score: parseInt(score1), damage: damage1 },
                { winner: winner([score1, score2], [damage1, damage2]) === 1, players: teams[1], colour: capitalise(colour2), score: parseInt(score2), damage: damage2 }
            ] as any;
            data.status = 'Finished';
            data.save();
        }).catch(console.error);
    }

    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = admins.find(u => u.username.toLowerCase() === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
});

// app.get('/upload', (req, res) => {
//     const user = req.body.user;

//     if (!user) {
//         return res.status(401).json({ status: 'Unauthorised', code: 401, message: 'Client not logged in' });
//     }
// });

app.get('/error/map', (req, res) => {
    res.status(400).json({ status: 'Bad Request', code: 400, message: 'Invalid map' });
});
app.get('/error/colours', (req, res) => {
    res.status(400).json({ status: 'Bad Request', code: 400, message: 'Colours are equal' });
});
app.get('/error/niceTry', (req, res) => {
    res.status(401).json({ status: 'Bad Request', code: 401, message: 'Unauthorised' });
});

console.log('Website now online');

app.listen(port);