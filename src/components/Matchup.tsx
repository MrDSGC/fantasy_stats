import { Box } from "@mui/material"
import { Chart } from "react-google-charts";

type Props = {
  matchupData: any[];
  matchups: any[];
};

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

export const Matchup = ({matchupData, matchups}: Props) => {
  // the data is here! TODO: parse it into...
  // - 6 h2h pages that include line graphs for...
  //   - totalCats
  //   - fg%
  //   - ft%
  //   - threePM
  //   - pt
  //   - reb
  //   - ass
  //   - stl
  //   - blk
  //   - to

  const formatGraphData = () => {
    return;
  }

  console.log(matchupData)
  console.log(matchups)
  return (
    <Box
    >
      <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
    </Box>
  )
}