import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";


type StatListProps = {
};

type StatItemProps = {
}

const StatItem = () => (
  <ListItem >
    <ListItemText
      secondary={
          <Typography align="left" component="span" variant="subtitle1">
            placeholder
          </Typography>
      }
    />       
    <Box sx={{display: "flex", alignItems: "center",flexDirection: "row"}}>
      <ListItemText
        secondary={
            <Typography color="#737680"  align="right" component="span" variant="subtitle1">
               placeholder
            </Typography>
        }
      />
    </Box>

  </ListItem>
);

export const StatList = ({}: StatListProps) => (
  <List >
  </List>
)






