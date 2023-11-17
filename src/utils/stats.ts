import { extractMonthAndDay } from "./dates";

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


export const formatMatchupStats = (
  dailyStatsArr_P1: any[], 
  dailyStatsArr_P2: any[],
  teamName_P1: string,
  teamName_P2: string,
  statId: string
) => {
  if (statId === "0") {
    return [];
  }

  const formattedData = [
    [
      "Date", 
      teamName_P1, 
      teamName_P2
    ]
  ];
  const todaysDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  dailyStatsArr_P1.forEach((dailyStat: any) => {
    const currDate =  extractMonthAndDay(dailyStat.date);
    const today = currDate === todaysDate ? "TODAY" : currDate;
    const currDateStats = [
      today,
      getFbbMatchupStatByStatIdAndDate(dailyStatsArr_P1, statId, dailyStat.date),
      getFbbMatchupStatByStatIdAndDate(dailyStatsArr_P2, statId, dailyStat.date)
    ]
    formattedData.push(currDateStats);
  })
  return formattedData;
};

const getFbbMatchupStatByStatIdAndDate = (matchup: any, statId: any, date: any) => {

  const statToday = matchup.find((match: any) => match.date === date);

  switch (statId) {
    case '5':
      const fg = [statToday.fgA, statToday.fgM];
      console.log(fg);
      return fg
    case '8':
      const ft = [statToday.ftA, statToday.ftM];
      console.log(ft);
      return ft
    case '10':
      return statToday.threePM;
    case '12':
      return statToday.pt;
    case '15':
      return statToday.reb;
    case '16':
      return statToday.ass;
    case '17':
      return statToday.stl;
    case '18':
      return statToday.blk;
    case '19':
      return statToday.to;
    default:
      break;
  }
}