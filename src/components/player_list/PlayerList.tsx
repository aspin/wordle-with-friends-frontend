import * as React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface PlayerListProps {
  players: string[];
}

export default function PlayerList(props: PlayerListProps) {
  function player(_value: string, i: number) {
    let divider = <Divider />;
    if (i == props.players.length - 1) {
      divider = undefined;
    }

    return (
      <React.Fragment key={props.players[i]}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.players[i]}
            secondary={props.players[i]}
          />
        </ListItem>
        {divider}
      </React.Fragment>
    );
  }

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Players
      </Typography>
      <List>{props.players.map(player)}</List>
    </div>
  );
}

