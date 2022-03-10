import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PlayerList from "../player_list/PlayerList";

interface SidebarProps {
  players: string[];
  sessionId: string;
  disconnect: () => void;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Stack spacing={2}>
      <Stack>
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Game ID
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {props.sessionId}
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{ mx: "auto", width: 200, display: "block" }}
            onClick={props.disconnect}
          >
            Disconnect
          </Button>
        </Box>
      </Stack>
      <PlayerList players={props.players} />
    </Stack>
  );
}
