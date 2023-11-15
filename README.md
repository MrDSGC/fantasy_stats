# Fantasy Stats (WIP)

Hitting Yahoo Api to return team data and visualize scoring for weekly updates

## Setup

The stat app has 3 running processes:
- frontend application
- backend server
- backend bundler
- 
### React Frontend App

This is a simple frontend app that will call our express server and display data of your league.

#### steps
1. cd into the root directory and run `npm i`
2. call `npm start` This runs the frontend app in the development mode.
3. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Express server

We use a seperate express backend to make calls to the yahoo api for OAuth. its important for this server to have valid certs to successfully autheticate with yahoo.

#### startup steps

1. Use mkcert to generate certificates for server. make sure the file names match the filepath in app.ts
2. Create client app on [yahoo developer site](https://developer.yahoo.com/apps/) 
3. cd into the `./server` directory. this is where the backend logic lives.
4. run `npm i`
5. create local `.env` file based on `.env.example` and fill in your client_id and client_secret
6. run `npx tsc-watch` to bundle app.ts into app.js (the server reads app.js to build)
7. run `node dist/app.js` to being running the server on `https://localhost:3000`

Hell yeah now your backend is running and you should be able to make postman request directly to localhost

## API endpoints

### GET /start
This queries yahoo api for an access token needed to request our OAuth2 token

### GET /callback
This is the redirect uri that yahoo sends their accesscode to. we do logic here to fetch the 1st access token required to make api calls for fantasy stats

### /fbb_teams
This fetches league member stats

### /fbb_stats
This fetches league member stats by id and date

## Troubleshooting

### locahost:3000 ERR_NOT_FOUND

Make sure you're hitting `https://` vs `http://`
