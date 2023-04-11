import { Game } from 'interfaces';
import { RtkQueryUtils } from 'utils-client';

import { apiSlice } from '../api/api.slice';
import { TAG_TYPES } from '../api/api.constants';

export const gamesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      query: () => ({
        url: '/games',
        method: 'GET',
      }),
      providesTags: RtkQueryUtils.generateProvidesTagsForListing(
        TAG_TYPES.GAMES,
      ),
    }),

    startGame: builder.mutation<any, { board?: string }>({
      query: ({ board = '---------' } = {}) => ({
        url: `/games`,
        method: 'POST',
        body: { board },
      }),
      invalidatesTags: (result, error, data) => [
        { type: TAG_TYPES.GAMES, data },
      ],
    }),

    getGame: builder.query<Game, string>({
      query: (id) => ({
        url: `/games/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: TAG_TYPES.GAMES, id }],
    }),

    removeGame: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/games/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: TAG_TYPES.GAMES }],
    }),

    postMove: builder.mutation<any, { id: string; board: string }>({
      query: ({ id, board }) => ({
        url: `/games/${id}`,
        method: 'PUT',
        body: { board },
      }),
      invalidatesTags: () => [{ type: TAG_TYPES.GAMES }],
    }),
  }),
});

export const {
  useGetGameQuery,
  useGetGamesQuery,
  useRemoveGameMutation,
  usePostMoveMutation,
  useStartGameMutation,
} = gamesSlice;
