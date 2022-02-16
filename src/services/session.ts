import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setParams, setWord } from "../features/game/gameSlice";
import { GameParameters, Session } from "../types/game";

const apiPath = "http://localhost:9000";
const wsPath = "ws://localhost:9000";

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (build) => ({
    newSession: build.query<Session, void>({
      query: () => "/new",
      async onCacheEntryAdded(_, {dispatch, cacheDataLoaded, cacheEntryRemoved}) {
        const session = (await cacheDataLoaded).data
        const ws = new WebSocket(`${wsPath}/session/${session.id}`)

        ws.addEventListener("message", event => {
          const data = JSON.parse(event.data)

          // TODO: convert to camelcase and matchup field names
          if ("word_length" in data) {
            dispatch(setParams({wordLength: data.word_length, maxGuesses: data.max_attempts}))
          }

          if ("event" in data) {
            if (data.event == "LETTER_ADDED") {
              dispatch(setWord({letters: data.params.split("")}))
            }
          }
        })

        await cacheEntryRemoved
        ws.close()
      }
    }),
  }),
});

export const { useNewSessionQuery } = sessionApi;
