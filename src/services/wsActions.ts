import * as _ from "lodash";

export interface WsActionsInterface {
  sendAddLetter: (string) => void;
  sendDeleteLetter: () => void;
}

function sendAddLetter(ws: WebSocket, letter: string) {
  const event = {
    action: "ADD_LETTER",
    params: letter,
  };
  sendEvent(ws, event);
}

function sendDeleteLetter(ws: WebSocket) {
  const event = {
    action: "DELETE_LETTER",
    params: null,
  };
  sendEvent(ws, event);
}

function sendEvent(ws: WebSocket, e: object) {
  // probably a good idea, but not strictly necessary?
  // if (ws.readyState != WebSocket.OPEN) {
  //   return;
  // }
  ws.send(JSON.stringify(e));
}

export function generateActions(ws: WebSocket): WsActionsInterface {
  return {
    sendAddLetter: _.partial(sendAddLetter, ws),
    sendDeleteLetter: _.partial(sendDeleteLetter, ws),
  };
}
