import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io, Socket } from "socket.io-client";
import { GameParameters } from "../types/game";

const apiPath = "http://localhost:9000";

let socket: Socket;

function getSocket(): Socket {
  if (!socket) {
    socket = io(apiPath);
  }
  return socket;
}

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (build) => ({
    getGameParams: build.query<GameParameters, string>({
      query: (value: string) => "",
      async onCacheEntryAdded(
        value: string,
        { cacheDataLoaded, cacheEntryRemoved },
      ) {
        console.log(`adding entry for ${value}`);
        const ws = getSocket();
        await cacheDataLoaded;
        ws.onAny(console.log);
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetGameParamsQuery } = sessionApi;
