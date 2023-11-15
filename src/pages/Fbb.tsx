// Fantays Basketball Stats page
import { useState } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import {getYesterday, getWeekStart, getDatesInRange} from '../utils/dates';

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
  
  let HARDCODED_HASH_MAP = [
      {
        teamId: 1,
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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

  const Header: any = () => {
    const title = `${leagueName} ${season}`;

    return <h1> {leagueName ? title : "FBB"}</h1>;
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

  const getAllCurrentStats = async (date: any) => {
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
              case '5':
                if (newTeam.fgPer === 0) {
                  newTeam.fgPer = parseFloat(stat.value);
                }
                const newFg = (newTeam.fgPer + parseFloat(stat.value)) / 2;
                newTeam.fgPer = newFg;
                break;
              case '8':
                if (newTeam.ftPer === 0) {
                  newTeam.ftPer = parseFloat(stat.value);
                }
                const newFt = (newTeam.ftPer + parseFloat(stat.value)) / 2;
                newTeam.ftPer = newFt;
                break;
              case '10':
                newTeam.threePM = parseInt(stat.value);
                break;
              case '12':
                newTeam.pt = parseInt(stat.value);
                break;
              case '15':
                newTeam.reb = parseInt(stat.value);
                break;
              case '16':
                newTeam.ass = parseInt(stat.value);
                break;
              case '17':
                newTeam.stl = parseInt(stat.value);
                break;
              case '18':
                newTeam.blk = parseInt(stat.value);
                break;
              case '19':
                newTeam.to = parseInt(stat.value);
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

    const resultTeams: any = [
      {
        teamId: 1,
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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
        fgPer: 0,
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

    const yesterday = getYesterday();
    const weekStart = getWeekStart();
    const dateRange = getDatesInRange(weekStart, yesterday);

    dateRange.forEach(date => {
      const teams = getAllCurrentStats(date);
      teams.then((res)=> {
        res.forEach((team: any) => {
          resultTeams[team.teamId - 1].ass += team.ass;
          resultTeams[team.teamId - 1].blk += team.blk;
          resultTeams[team.teamId - 1].fgPer += (resultTeams[team.teamId - 1].fgPer + team.fgPer) / 2;
          resultTeams[team.teamId - 1].ftPer += (resultTeams[team.teamId - 1].ftPer + team.ftPer) / 2;
          resultTeams[team.teamId - 1].pt += team.pt;
          resultTeams[team.teamId - 1].reb += team.reb;
          resultTeams[team.teamId - 1].stl += team.stl;
          resultTeams[team.teamId - 1].to += team.to;
          resultTeams[team.teamId - 1].threePM += team.threePM;
        })
      })
    })
    console.log(resultTeams);

    setStatsList(resultTeams);
  
  }

  return (
    <div>
      <Header/>

      <Box>
        <Button onClick={() => {getTeams()}}>
          Fetch Teams
        </Button>
        <Button onClick={() => {getCurrentStatTotal()}}>
          Fetch Team Stats
        </Button>
        <Button onClick={() => {console.log(statsList)}}>
          Check Data
        </Button>
      </Box>
      <Box>
        <Box>
          Placeholder for graph
        </Box>
        <Box>
          <Box>
            STATS PLACEHOLDER
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Fbb;
