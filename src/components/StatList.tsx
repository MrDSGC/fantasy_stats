import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { getStatFromTeam } from '../utils/stats';
import crownImage from '../assests/crown.png';

type StatListProps = {
  stats: any[]; // Assuming 'stats' is an array of objects
  statId: string;
};

const sortByAsending = ({stats, statId}: {stats: any; statId: any}) => {
  return stats.sort((a:any, b: any) => parseFloat(getStatFromTeam(a, statId)) - parseFloat(getStatFromTeam(b, statId)));
}

const sortByDecending = ({stats, statId}: {stats: any; statId: any}) => {
  return stats.sort((a:any, b: any) => parseFloat(getStatFromTeam(b, statId)) - parseFloat(getStatFromTeam(a, statId)));
}

const sortByRandom = (stats: any) => {
  for (let i = stats.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [stats[i], stats[j]] = [stats[j], stats[i]];
  }
  return stats;
}



export const StatList: React.FC<StatListProps> = ({ stats, statId }) => {
  // Sorting the data based on the specified statId
  let sortedData;

  if (statId === '19') {
    sortedData = sortByAsending({stats, statId});
  } else if (statId === '0') {
    sortedData = sortByRandom(stats)
  } else {
    sortedData = sortByDecending({stats,statId})
  }

  // Taking the top 5 items
  const top5Data = sortedData.slice(0, 5);

  return (
<List>
  {top5Data.map((item: any, index: any) => {

    if (index === 0) {
      return (
        <ListItem 
          key={index} 
          style={{ 
            padding: '4px', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'yellow',
            borderRadius: '5px',
            border: '1px solid black',
            marginBottom: '4px',
            fontWeight: 'bold' 
          }}
        >
          <img alt="crown" height="30px" width="30px" src={crownImage}/>
          <img alt="teamLogo" style={{paddingRight: '4px'}} height="100px" width="100px" src={item.teamLogo} />
          <Typography 
            variant='h6'
            sx={{
              fontWeight: 'bold' 
            }}
          >{item.teamName}</Typography>
          <Typography
            sx={{
              fontWeight: 'bold' ,
              border: '2px solid red',
              borderRadius: '5px',
              padding: '4px',
            }}
          >{getStatFromTeam(item, statId)}</Typography>
        </ListItem>
      )
    }else {
      return (
        <ListItem key={index} style={{ 
          padding: '2px 4x', 
          backgroundColor: 'greenyellow',
          borderRadius: '5px',
          border: '1px solid black',
          marginBottom: '4px',
          }}
        >
          <img alt="teamLogo" style={{paddingRight: '4px'}} height="30px" width="30px" src={item.teamLogo} />
          <ListItemText primary={item.teamName} secondary={`${getStatFromTeam(item, statId)}`} />
        </ListItem>
      )
    }
})}
</List>
  );
};
