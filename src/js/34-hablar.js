/* ---------- talking ----------
   A box with who speaks, how fond of her they are (♥), what they say and what Ana can answer. */
// once each season, the first thing each of them says is about the season
/* (LINES and SEASON_LINES come from the characters) */
const DIAS_ESTACION = 14;   // (a season of the game: two weeks)
const seasonCount = () => Math.floor(dayT / DIAS_ESTACION) + game.seasonShift;