export const getStatFromTeam = (team: any, statId: string) => {
  switch (statId) {
    case '5':
      return (team.fgA / team.fgM).toFixed(3);
    case '8':
      return (team.ftA / team.ftM).toFixed(3);
    case '10':
      return team.threePM
    case '12':
      return team.pt
    case '15':
      return team.reb
    case '16':
      return team.ass
    case '17':
      return team.stl
    case '18':
      return team.blk
    case '19':
      return team.to
    case '0':
      return '???';
    default:
      break;
  }
}

export const parseZeros = (value: any) => {
  return value === '-' ? 0 : value; 
}

export const getOpp = (matchups: any, playerId: any) => {
  for (const matchup of matchups) {
    if (matchup.player1.includes(playerId)) {
      return matchup.player2;
    } else if (matchup.player2.includes(playerId)) {
      return matchup.player1;
    }
  }
  return null; // Return null if the player ID is not found in the array
}
