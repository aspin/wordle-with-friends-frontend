import * as _ from "lodash";

export interface WsActionsInterface {
  sendAddLetter: (string) => void;
}

function sendAddLetter(ws: WebSocket, letter: string) {
  const event = {
    action: "ADD_LETTER",
    params: letter,
  };
  ws.send(JSON.stringify(event));
}

export function generateActions(ws: WebSocket): WsActionsInterface {
  return {
    sendAddLetter: _.curry(sendAddLetter)(ws),
  };
}
