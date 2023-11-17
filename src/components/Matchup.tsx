import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Chart } from "react-google-charts";
import { formatMatchupStats } from "../utils/stats";
import { useState } from "react";

type Props = {
  matchupData: any[];
  matchups: any[];
};



const statsList = [
  { title: 'Cat Totals',
    statId: '0', 
  },
  { title: 'Mr. Efficiency',
    statId: '5', 
  },
  { title: 'Free throws are free',
    statId: '8', 
  },
  { title: 'Splash Bros',
    statId: '10', 
  },
  { title: 'Buckets',
    statId: '12', 
  },
  { title: 'Board man gets paid',
    statId: '15', 
  },
  {
    title: 'Point God',
    statId: '16',
  },
  {
    title: 'Cookies',
    statId: '17',
  },
  { title: 'Block party',
    statId: '18', 
  },
  { title: 'Protect the rock',
    statId: '19', 
  },
];

export const Matchup = ({
  matchupData, 
  matchups
}: Props) => {

  const [graphData, setGraphData] = useState<any>([]);
  const [currMatchup, setCurrMatchup] = useState(0);
  const [options,setOptions] = useState([]);
  const numberArray = [0, 1, 2, 3, 4, 5];

  const clearGraphData = () => {
    setGraphData([]);
  }

  const handleChange = (event: any) => {
    console.log(event.target);
    setCurrMatchup(parseInt(event.target.value, 10));
  };

  const formatGraphData = () => {

    const matchUpGraphs = matchups.map((matchup) => {
      const newMatchup = {
        ...matchup,
      };

      const p1 =  matchupData.find((team: any) => team.teamId === parseInt(matchup.player1));
      const p2 = matchupData.find((team: any) => team.teamId === parseInt(matchup.player2));
      newMatchup.player1 = p1;
      newMatchup.player2 = p2;

      return newMatchup;
    })
    const graphResults: any =[]; // matchupDataExample[];

    // const finalMatchupDataExample = {
    //   player1: {
    //     teamId: '',
    //     teamLogo: '',
    //     teamName: ''
    //   },
    //   player2: {
    //     teamId: '',
    //     teamLogo: '',
    //     teamName: ''
    //   },
    //   data: [ // array of 10 arrays with data
    //     [
    //       ["date","player1name", "player2name"],
    //       ['day1', "p1_stat1", "p2_stat1"]
    //       ['day2', "p1_stat2", "p2_stat2"]
    //     ],
    //     [
    //       ...
    //     ],
    //   options: [
    //     {
    //       title: 'Stat',
    //       curveType: 'function',
    //       legend: {position: "right"}
    //     }
    //   ]
    // }

    matchUpGraphs.forEach((matchup: any) => {

      const player1 = {
        teamId: matchup.player1.teamId,
        teamName: matchup.player1.teamName,
        teamLogo: matchup.player1.teamLogo
      };
      const player2 = {
        teamId: matchup.player2.teamId,
        teamName: matchup.player2.teamName,
        teamLogo: matchup.player2.teamLogo
      };

      const allMatchupData: any[] = [];
      const allOptions: any = [];

      statsList.forEach((stat: any) => {
        const currOptions = {
          title: `${stat.title}`,

        }
        allOptions.push(currOptions);

        const currMatchups = formatMatchupStats(
          matchup.player1.dailyStats,
          matchup.player2.dailyStats,
          matchup.player1.teamName,
          matchup.player2.teamName,
          stat.statId
        );

        allMatchupData.push(currMatchups);
      })

      const finalMatchups = {
        player1: player1,
        player2: player2,
        data: allMatchupData,
      }
      setOptions(allOptions); 
      return graphResults.push(finalMatchups);
    })
    console.log(graphResults)
    setGraphData(graphResults);
  }
  const addUpScores = (data: any) => {
    const modifiedArray: any = [...data];


    // Iterate starting from the second element (index 1)
    for (let i = 1; i < modifiedArray.length; i++) {
      for (let j = 2; j < modifiedArray[i].length; j++) {
        if (i === 1 || i === 2) {
// TODO NAN BUG
// ALSO UPDATE THE STATSLIST PAGE TO SHOW CHANGE FROM PREVIOUS DAY
          modifiedArray[i][j][1][0] = modifiedArray[i][j - 1][1][0] + modifiedArray[i][j][1][0];
          modifiedArray[i][j][1][1] = modifiedArray[i][j - 1][1][1] + modifiedArray[i][j][1][1];
          modifiedArray[i][j][2][0] = modifiedArray[i][j - 1][2][0] + modifiedArray[i][j][2][0];
          modifiedArray[i][j][2][1] = modifiedArray[i][j - 1][2][1] + modifiedArray[i][j][2][1];
        } else {
          modifiedArray[i][j][1] = modifiedArray[i][j - 1][1] + modifiedArray[i][j][1];
          modifiedArray[i][j][2] = modifiedArray[i][j - 1][2] + modifiedArray[i][j][2];
        }

      }
    }
    
    console.log(modifiedArray);
    return modifiedArray;
  };

  const formatTotalCats = () => {
    const allAddedWins: any = graphData.map((matchupGraph: any) => {
      const addedWins: any = populateTotalWins(matchupGraph.data, matchupGraph.player1.teamName, matchupGraph.player2.teamName);

      matchupGraph.data = addedWins;

      return matchupGraph;
    })

    const addedUpScores: any = allAddedWins.map((matchupGraph: any) => {
      const addedScore: any = addUpScores(matchupGraph.data);
      matchupGraph.data = addedScore;
      return matchupGraph;
    })

    setGraphData(addedUpScores);
    console.log("formatted wins")
  }

  const populateTotalWins = (data: any, teamName1: any, teamName2: any) => {
    data[0] = populateLogic(data, teamName1, teamName2);
    return data;
  }
  const populateLogic = (data: any, teamName1: any, teamName2: any) => {

    const winsCat = [
      [
        'Date', 
        teamName1,
        teamName2
      ]
    ];

    for (let i = 1; i < data.length; i++) {
      const currentCat = data[i];

      if (winsCat.length < 2) {
        currentCat.forEach((day: any, index: any) => {
          if (index !== 0) {
            let currDayStat = [day[0]];
            if (day[1] > day[2]) {
              currDayStat.push(1);
              currDayStat.push(0);
            } else if (day[1] < day[2]) {
              currDayStat.push(0);
              currDayStat.push(1);
            } else {
              currDayStat.push(0);
              currDayStat.push(0);
            }
            winsCat.push(currDayStat);
          }
        });
      } else {
        currentCat.forEach((day: any, index: any) => {
          if(index !== 0) {
            if (day[0] === winsCat[index][0]) {
              if (day[1] > day[2]) {
                winsCat[index][1] ++;
              } else {
                winsCat[index][2] ++;
              }
            }
          }
        })
      }
    }
  
    return winsCat;
  }
  

  return (
    <Box
    >
      <Button onClick={() => (formatGraphData())}>
        Format Data for graph
      </Button>
      <Button onClick={() => (console.log(graphData))}>
        Check Graph Data
      </Button>
      <Button onClick={() => (formatTotalCats())}>
        format total cats
      </Button>
      <Button onClick={() => (clearGraphData())}>
        clear Graph Data
      </Button>

      <FormControl>
        <InputLabel id="matchup-label">Select Matchup:</InputLabel>
        <Select
          labelId="matchup-label"
          id="matchup-select"
          value={currMatchup}
          label="Select Matchup"
          onChange={handleChange}
        >
          {numberArray.map((value) => (
            <MenuItem key={value} value={value}>
              Matchup {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl><br/>
      <Typography>
        Note: TODAY's efficiency stats assume 0% shooting that day until games have been played out.  
      </Typography>

      {graphData.length > 0 && graphData[currMatchup].data.map((data: any, index: any,) => {

        let newData;
        if (index === 1 || index === 2) {
          let displayData = [...data];

           newData = displayData.map((date: any, index: any) => {
            if (index !== 0) {
              date[1] = (date[1][0] / date[1][1]).toFixed(3)
              date[2] = (date[2][0] / date[2][1]).toFixed(3)
            }

            return date;
          })
        } else {
           newData = data;
        }

        return (
          <Chart
            key={index}          
            chartType="LineChart"
            width="600px"
            height="400px"
            data={newData ?? []}
            options={options[index] ?? []}
          />
        )
        
      })}
    </Box>
  )
}