"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const xml2js = require('xml2js');
const app = express();
const parser = new xml2js.Parser();
const yahooAuthUrl = 'https://api.login.yahoo.com/oauth2/request_auth';
const tokenUrl = 'https://api.login.yahoo.com/oauth2/get_token';
const redirectUri = 'https://localhost:3000/callback';
const clientId = (_a = process.env.CLIENT_ID) !== null && _a !== void 0 ? _a : '';
const clientSecret = (_b = process.env.CLIENT_SECRET) !== null && _b !== void 0 ? _b : '';
const fbbleagueId = '9037'; // 2023 GAMMA ALUMN
const ffbleagueId = '';
const FBB_STATS = {
    '9004003': 'FGM/A',
    '5': 'FG_PER',
    '9007006': 'FTM/A',
    '8': 'FT_PER',
    '10': '3PM',
    '12': 'PTS',
    '15': 'REBS',
    '16': 'ASS',
    '17': 'STL',
    '18': 'BLK',
    '19': 'TO',
};
// Paths to SSL certificate files
const privateKeyPath = 'certificates/localhost-key.pem';
const certificatePath = 'certificates/localhost.pem';
// Read SSL certificate files
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
// SSL configuration
const credentials = { key: privateKey, cert: certificate };
function flattenObject(obj) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key][0];
            result[key] = value;
        }
    }
    return result;
}
app.use(session({
    secret: 'grant',
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: false,
        domain: 'localhost',
        sameSite: false
    }
}));
app.use(cors({
    origin: ['http://localhost:8080/'],
    credentials: true,
    exposedHeaders: ["set-cookie", "ajax_redirect"],
    preflightContinue: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"],
    optionsSuccessStatus: 200,
}));
app.get('/', (req, res) => {
    // Redirect to your frontend app's homepage
    res.redirect('https://localhost/8080');
});
app.get('/start', (req, res) => {
    // Redirect the user to the Yahoo authorization URL
    const authorizationUrl = `${yahooAuthUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&language=en-us`;
    res.redirect(authorizationUrl);
});
app.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("wemadeit");
    try {
        // Check if the authorization code is present in the query parameters
        const authorizationCode = req.query.code;
        if (!authorizationCode) {
            return res.status(400).send('Authorization code not found');
        }
        // Use the authorization code to request an access token
        const tokenResponse = yield axios.post(tokenUrl, `client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${encodeURIComponent(authorizationCode)}&grant_type=authorization_code`);
        // Log the initial token response
        console.log('Initial Token Response:', tokenResponse.data);
        // Return the token data to the frontend app
        req.session.tokens = {
            access_token: tokenResponse.data.access_token,
            refresh_token: tokenResponse.data.refresh_token,
            expires_in: tokenResponse.data.expires_in
        };
        req.session.save((err) => {
            res.json(req.session.tokesn);
        });
    }
    catch (error) {
        console.error('Error in /callback route:', error);
        res.status(500).send('Internal Server Error');
    }
}));
const yahooApiRequest = (url, method = 'GET', params = {}, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        // Cant figure out how to persist req.session. 
        // let accessToken = req.session.tokens.access_token;
        let accessToken = req.query.authToken;
        let first = req.query.first;
        // if (first == '1') {
        //   // Access token has expired or is about to expire
        //   let refreshToken = req.query.refreshToken;
        //   // let refreshToken = req.session.tokens.refresh_token;
        //   // Use the refresh token to request a new access token
        //   const tokenResponse = await axios.post(
        //     tokenUrl,
        //     `client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&redirect_uri=${encodeURIComponent(redirectUri)}&refresh_token=${encodeURIComponent(refreshToken)}&grant_type=refresh_token`
        //     );
        //     // Log the refreshed token response
        //     console.log('Refreshed Token Response:', tokenResponse.data);
        //     // Cant figure how to update the session with the new access token
        //     // req.session.tokens.access_token = tokenResponse.data.access_token;
        //     // req.session.tokens.expires_in = tokenResponse.data.expires_in;
        //     // req.session.tokens.refresh_token = tokenResponse.data.refresh_token;
        //     req.session.tokens = {
        //       access_token: tokenResponse.data.access_token, 
        //       refresh_token: tokenResponse.data.refresh_token,
        //       expires_in: tokenResponse.data.expires_in
        //     };
        //     // hacky way to log the tokens and manually enter them into the frontend lol...
        //     console.log(req.session.tokens);
        //     // Use the new access token
        //     accessToken = tokenResponse.data.access_token;
        //   }
        const yahooApiUrl = 'https://fantasysports.yahooapis.com/fantasy/v2';
        console.log("making yahoo request");
        // Make the Yahoo API request
        return yield axios({
            method,
            url: `${yahooApiUrl}${url}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params,
        }).then((res) => {
            const result = parser.parseStringPromise(res.data);
            return result;
        });
    }
    catch (error) {
        console.error('Error making Yahoo API request:', ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message);
        throw error;
    }
});
// Endpoint to get Fantasy Basetball Leauge Information
app.get('/fbb_teams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getFbbLeague = `/league/nba.l.${fbbleagueId}/standings`;
    try {
        console.log("hit endpoint");
        // Make the Yahoo API request to get league information
        const response = yield yahooApiRequest(getFbbLeague, 'GET', {}, req);
        // Map fields we care about to league object
        const league = flattenObject(response.fantasy_content.league[0]);
        const leagueData = {
            leagueId: league.league_id,
            leagueKey: league.league_key,
            leagueName: league.name,
            season: league.season
        };
        const leagueTeams = league.standings.teams[0].team.map((team) => {
            return {
                teamId: team.team_id[0],
                teamKey: team.team_key[0],
                teamName: team.name[0],
                teamLogo: team.team_logos[0].team_logo[0].url[0],
                waiverPriority: team.waiver_priority[0],
                numOfMoves: team.number_of_moves[0],
                numOfTrades: team.number_of_trades[0],
                draftPos: team.draft_position[0],
                teamRank: team.team_standings[0].rank[0],
                teamWs: team.team_standings[0].outcome_totals[0].wins[0],
                teamLs: team.team_standings[0].outcome_totals[0].losses[0],
                teamTs: team.team_standings[0].outcome_totals[0].ties[0],
                winPercent: team.team_standings[0].outcome_totals[0].percentage[0],
            };
        });
        const parsedLeagueData = {
            leagueData: leagueData,
            leagueTeams: leagueTeams
        };
        // Send the league information back to the client
        res.json(parsedLeagueData);
    }
    catch (error) {
        console.error('Error in /ffb_teams route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Endpoint to get Fantasy Basetball Leauge Information
app.get('/fbb_stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 'YYYY-MM-DD` format 
    const date = req.query.date;
    const teamId = req.query.teamId;
    const getFbbStats = `/team/nba.l.${fbbleagueId}.t.${teamId}/stats;type=date;date=${date}`;
    try {
        console.log("hit endpoint");
        // Make the Yahoo API request to get league information
        const response = yield yahooApiRequest(getFbbStats, 'GET', {}, req);
        const teamStats = response.fantasy_content.team[0].team_stats[0].stats[0].stat;
        const parsedStats = teamStats.map((team) => {
            return {
                teamId: teamId,
                statId: team.stat_id[0],
                value: team.value[0],
                statName: FBB_STATS[team.stat_id[0]]
            };
        });
        console.log(parsedStats);
        // Send the league information back to the client
        res.json(parsedStats);
    }
    catch (error) {
        console.error('Error in /ffb_teams route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/fbb_scoreboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getFbbMatchups = `/league/nba.l.${fbbleagueId}/scoreboard`;
    try {
        console.log("hit endpoint");
        // Make the Yahoo API request to get league information
        const response = yield yahooApiRequest(getFbbMatchups, 'GET', {}, req);
        const matchups = response.fantasy_content.league[0].scoreboard[0].matchups[0].matchup;
        const parsedMatchups = matchups.map((matchup) => {
            const player1 = matchup.teams[0].team[0].team_id[0];
            const player2 = matchup.teams[0].team[1].team_id[0];
            return {
                player1: player1,
                player2: player2
            };
        });
        console.log(parsedMatchups);
        // Send the league information back to the client
        res.json(parsedMatchups);
    }
    catch (error) {
        console.error('Error in /ffb_scorecard route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Endpoint to get Fantasy Football League information
app.get('/ffb_league', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getFFB = '/league/nfl.l.';
    try {
        const leagueId = req.params.leagueId;
        const leagueUrl = getFFB + `${leagueId}`;
        // Make the Yahoo API request to get league information
        const leagueInfo = yield yahooApiRequest(leagueUrl, 'GET', {}, req);
        // Send the league information back to the client
        res.json(leagueInfo);
    }
    catch (error) {
        console.error('Error in /league route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
const server = https.createServer(credentials, app);
server.listen(3000, () => {
    console.log('Server is running on https://localhost:3000');
});
