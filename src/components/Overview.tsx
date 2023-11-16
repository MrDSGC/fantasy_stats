import { Box, Grid } from "@mui/material";
import { StatList } from "./StatList";

type Props = {
  currentWeek: string;
  statsList: any[];
}

export const Overview = ({
  currentWeek,
  statsList,
}: Props) => {

  const Header: React.FC = () => {
    const title = `Current Rankings for ${currentWeek}`;
    return <h1>{title}</h1>;
  }

  const renderLists = () => {
    // Replace this with your logic to generate or fetch the data for the lists
    const listsData = [
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
      { title: 'DrDrews Secret Power Rankings',
        statId: '0', 
      }
    ];


    return listsData.map((list, index) => (
      <Grid key={index} item xs={12} sm={2}>
        <Box 
          style={{
            padding: '4px', 
            border: '1px solid black', 
            borderRadius: '8px', 
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
          }} 
          height="100%"
        >
          <h3>{list.title}</h3>
          <StatList stats={statsList} statId={list.statId}/>
        </Box>
      </Grid>
    ));
  };

  return (
    <Box >
      <Header/>
      <Grid justifyContent="center" alignItems="center" container spacing={2}>
        {renderLists()}
      </Grid>
    </Box>
  );
};
