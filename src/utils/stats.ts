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

export const getDisplayStatFromTeam = (team: any, statId: string) => {
  switch (statId) {
    case '5':
      const diff_fga = team.diff_fgA;
      const diff_fgm = team.diff_fgM;
      const diff_fg: any = (diff_fga === 0 && diff_fgm === 0) ? (0).toFixed(3) :(diff_fga / diff_fgm).toFixed(3);
      const fg: any = (team.fgA === 0 && team.fgM === 0) ? (0).toFixed(3) :(team.fgA / team.fgM).toFixed(3);
      const fgdiff_string = diff_fg < 0 ? `(-${diff_fg})` : `(+${diff_fg})`;
      return `${fg} ${fgdiff_string}`;
    case '8':
      const diff_fta = team.diff_ftA;
      const diff_ftm = team.diff_ftM;
      const diff_ft: any = (diff_fta === 0 && diff_ftm === 0) ? (0).toFixed(3) :(diff_fta / diff_ftm).toFixed(3);
      const ft: any = (team.ftA === 0 && team.ftM === 0) ? (0).toFixed(3) :(team.ftA / team.ftM).toFixed(3);
      const ftdiff_string = diff_ft < 0 ? `(-${diff_ft})` : `(+${diff_ft})`;
      return `${ft} ${ftdiff_string}`;
    case '10':
      const diff_threePM = team.diff_threePM;
      return `${team.threePM} (+${diff_threePM})`
    case '12':
      const diff_pt = team.diff_pt;
      return `${team.pt} (+${diff_pt})`
    case '15':
      const diff_reb = team.diff_reb;
      return `${team.reb} (+${diff_reb})`
    case '16':
      const diff_ass = team.diff_ass;
      return `${team.ass} (+${diff_ass})`
    case '17':
      const diff_stl = team.diff_stl;
      return `${team.stl} (+${diff_stl})`
    case '18':
      const diff_blk = team.diff_blk;
      return `${team.blk} (+${diff_blk})`
    case '19':
      const diff_to = team.diff_to;
      return `${team.to} (+${diff_to})`
    case '0':
      const diff_secret = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
      return `??? (+${diff_secret})`;
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