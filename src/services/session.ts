import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GameParameters } from "../types/game";

const apiPath = "http://localhost:9000";
const wsPath = "ws://localhost:9000";

let ws: WebSocket;

function getWS(): WebSocket {
  if (!ws) {
    ws = new WebSocket(wsPath);
  }
  return ws;
}

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (build) => ({
    // TODO: the http request is completely redundant right now, need to remove?
    getGameParams: build.query<GameParameters, string>({
      query: (value: string) => "",
      async onCacheEntryAdded(
        value: string,
        { cacheDataLoaded, cacheEntryRemoved },
      ) {
        console.log(`adding entry for ${value}`);
        const ws = getWS();
        ws.addEventListener("open", (event) => {
          ws.send("foobar");
        });
        ws.addEventListener("message", (event) => {
          console.log(event);
        });
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetGameParamsQuery } = sessionApi;
