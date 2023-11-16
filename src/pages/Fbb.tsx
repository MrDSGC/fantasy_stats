// Fantays Basketball Stats page
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { getToday, getYesterday, getWeekStart, getDatesInRange, extractMonthAndDay} from '../utils/dates';
import { Overview } from '../components/Overview';
import { Matchup} from '../components/Matchup';
import { getOpp, parseZeros } from '../utils/stats';

type Props = {
  authToken: any;
  refreshToken:any;
}


const Fbb = ({
  authToken, 
  refreshToken, 
}: Props) => {
  
  const baseUrl = 'https://localhost:3000/';
  const authArgs = `authToken=${authToken}&refreshToken=${refreshToken}`;

  const [selectedOption, setSelectedOption] = useState('overview'); // 'teams' or 'stats'
  const [currentWeek, setCurrentWeek] = useState('');

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  
  let HARDCODED_HASH_MAP = [
      {
        teamId: 1,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 2,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 3,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 4,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 5,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 6,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 7,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 8,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 9,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId:10,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId:11,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId:12,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        ftPer: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
  ];

  const [teams, setTeams] = useState([]);
  const [leagueName, setLeagueName] = useState(null);
  const [season, setSeason] = useState('');
  const [leagueKey, setLeagueKey] = useState('');
  const [statsList, setStatsList] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [matchupData, setMatchupData] = useState([]);


  const Header: any = () => {
    const title = `${leagueName} ${season}`;

    return <h1> {leagueName ? title : "FBB"}</h1>;
  }

  const clear = () => {
    setStatsList([]);
    setTeams([]); 
  }

  const getTeams = () => {
    try {

      axios.get(
        `${baseUrl}fbb_teams?${authArgs}`
      ).then((response: any) => {

        setTeams(response.data.leagueTeams);
        setLeagueKey(response.data.leagueData.leagueKey);
        setSeason(response.data.leagueData.season);
        setLeagueName(response.data.leagueData.leagueName);
      
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }



  const getStats = async (date: any, teamId: any) => {
    try {
      const response = axios.get(
        `${baseUrl}fbb_stats?${authArgs}&date=${date}&teamId=${teamId}`
      )
      
      return response;
    } catch (error) {
      console.error('Error:', error );
    } 
  }

  const getStatsByDate = async (date: any) => {
    // Use Promise.all to wait for all promises to resolve
    const updatedTeams = await Promise.all(
      HARDCODED_HASH_MAP.map(async (team: any) => {
        const newTeam = { ...team };
  
        try {
          // Wait for the asynchronous result from getStats
          const res: any = await getStats(date, team.teamId);
          const statsArray = res.data;
  
          statsArray.forEach((stat: any) => {
            switch (stat.statId) {
              case '9004003':
                const [fgA, fgM] = stat.value.split('/');
                newTeam.fgA = parseInt(parseZeros(fgA));
                newTeam.fgM = parseInt(parseZeros(fgM));
                break;
              case '9007006':
                const [ftA, ftM] = stat.value.split('/');
                newTeam.ftA = parseInt(parseZeros(ftA));
                newTeam.ftM = parseInt(parseZeros(ftM));
                break;
              case '10':
                newTeam.threePM += parseInt(parseZeros(stat.value));
                break;
              case '12':
                newTeam.pt += parseInt(parseZeros(stat.value));
                break;
              case '15':
                newTeam.reb += parseInt(parseZeros(stat.value));
                break;
              case '16':
                newTeam.ass += parseInt(parseZeros(stat.value));
                break;
              case '17':
                newTeam.stl += parseInt(parseZeros(stat.value));
                break;
              case '18':
                newTeam.blk += parseInt(parseZeros(stat.value));
                break;
              case '19':
                newTeam.to += parseInt(parseZeros(stat.value));
                break;
              default:
                break;
            }
          });
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
  
        return newTeam;
      })
    );
  
    return updatedTeams;
  };

  const getCurrentStatTotal: any = () => {

    let resultTeams: any = [
      {
        teamId: 1,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 2,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 3,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 4,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 5,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 6,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 7,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 8,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId: 9,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId:10,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId:11,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
      {
        teamId:12,
        fgA: 0,
        fgM: 0,
        ftA: 0,
        ftM: 0,
        threePM: 0,
        pt: 0,
        reb: 0,
        ass: 0,
        stl: 0,
        blk: 0,
        to: 0 
      },
    ];

    resultTeams = resultTeams.map((stats: any) => {
      const matchingTeam: any = teams.find((team: any) => {
        return parseInt(team.teamId) === parseInt(stats.teamId);
      });
  
      if (matchingTeam) {
        // If a matching team is found, add the teamName property to the stats object
        return {
          ...stats,
          teamName: matchingTeam.teamName,
          teamLogo: matchingTeam.teamLogo
        };
      }

      // If no matching team is found, return the original stats object
      return stats;
    });

    const today = getToday();
    const weekStart = getWeekStart();
    const dateRange = getDatesInRange(weekStart, today);
    const calculatedWeek: string = `${extractMonthAndDay(weekStart)} - ${extractMonthAndDay(today)}`;
    
    setCurrentWeek(calculatedWeek);
  
    // Map the promises for each date
    const promises = dateRange.map(date => {
      return getStatsByDate(date)
        .then((res) => {
          res.forEach((team: any) => {
            resultTeams[team.teamId - 1].ftA += team.ftA;
            resultTeams[team.teamId - 1].ftM += team.ftM;
            resultTeams[team.teamId - 1].fgA += team.fgA;
            resultTeams[team.teamId - 1].fgM += team.fgM;
            resultTeams[team.teamId - 1].ass += team.ass;
            resultTeams[team.teamId - 1].blk += team.blk;
            resultTeams[team.teamId - 1].pt += team.pt;
            resultTeams[team.teamId - 1].reb += team.reb;
            resultTeams[team.teamId - 1].stl += team.stl;
            resultTeams[team.teamId - 1].to += team.to;
            resultTeams[team.teamId - 1].threePM += team.threePM;
          });
        });
    });
  
    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        setStatsList(resultTeams);
      })
      .catch((error) => {
        console.error('Error updating stats list:', error);
      });

  }

  const getMatchups = () => {
    try {

      axios.get(
        `${baseUrl}fbb_scoreboard?${authArgs}`
      ).then((response: any) => {

        setMatchups(response.data);
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getH2HData = () => {

    let resultH2H: any = [
      {
        teamId: 1,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 2,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 3,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 4,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 5,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 6,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 7,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 8,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId: 9,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId:10,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId:11,
        oppId: 0,
        dailyStats: [],
      },
      {
        teamId:12,
        oppId: 0,
        dailyStats: [],
      },
    ];

    resultH2H = resultH2H.map((stats: any) => {
      const matchingTeam: any = teams.find((team: any) => {
        return parseInt(team.teamId) === parseInt(stats.teamId);
      });
  
      if (matchingTeam) {
        // If a matching team is found, add the teamName property to the stats object
        return {
          ...stats,
          teamName: matchingTeam.teamName,
          teamLogo: matchingTeam.teamLogo,
          oppId: getOpp(matchups, matchingTeam.teamId)
        };
      }

      // If no matching team is found, return the original stats object
      return stats;
    });

    const today = getToday();
    const weekStart = getWeekStart();
    const dateRange = getDatesInRange(weekStart, today);
    const calculatedWeek: string = `${extractMonthAndDay(weekStart)} - ${extractMonthAndDay(today)}`;
    
    setCurrentWeek(calculatedWeek);

    const promises = dateRange.map(date => {
      return getStatsByDate(date)
        .then((res) => {
          res.forEach((team: any) => {
            const currDateStat = {
              date: date,
              ftA: team.ftA,
              ftM: team.ftM,
              fgA: team.fgA,
              fgM: team.fgM,
              ass: team.ass,
              blk: team.blk,
              pt: team.pt,
              reb: team.reb,
              stl: team.stl,
              to: team.to,
              threePM: team.threePM,
            };
            
            resultH2H[team.teamId - 1].dailyStats.push(currDateStat);
          });
        });
    });
  
    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        setMatchupData(resultH2H);
      })
      .catch((error) => {
        console.error('Error updating stats list:', error);
      });

  }

  return (
    <div>
      <Header/>

      <Box>
        <Select value={selectedOption} onChange={handleOptionChange}>
          <MenuItem value="overview">Overview</MenuItem>
          <MenuItem value="h2h">Head 2 head</MenuItem>
        </Select>
        <Button onClick={() => {getTeams()}}>
          Fetch Teams
        </Button>
        <Button onClick={() => {getCurrentStatTotal()}}>
          Fetch Team Stats
        </Button>
        <Button onClick={() => {getMatchups()}}>
          Fetch Team Matchups
        </Button>
        <Button onClick={() => {getH2HData()}}>
          Fetch Team Matchups Data
        </Button>
        <Button onClick={() => {console.log(statsList)}}>
          Check Data
        </Button>
        <Button onClick={() => {clear()}}>
          Clear Data
        </Button>
      </Box>
      {selectedOption === 'overview' && (
        <Overview 
          statsList={statsList} 
          currentWeek={currentWeek}
        />
      )}
      {selectedOption === 'h2h' && (
        <Matchup matchupData={matchupData} matchups={matchups} />
      )}
    </div>
  );
};

export default Fbb;
