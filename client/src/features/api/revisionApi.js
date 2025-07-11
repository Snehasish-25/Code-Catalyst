import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REVISION_BASE_API = "http://localhost:3000/api/v1/revision";
export const revisionApi = createApi({
  reducerPath: "revisionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: REVISION_BASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createRevision: builder.mutation({
      query: (inputData) => ({
        url: "/",
        method: "POST",
        body: inputData,
      }),
    }),

    getUpcomingRevisions: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Revision_Status"],
    }),

    markRevisionCompleted: builder.mutation({
      query: ({ revisionId, scheduleIndex }) => ({
        url: `/${revisionId}/${scheduleIndex}`,
        method: "PUT",
      }),
      invalidatesTags: ["Refetch_Revision_Status"],
    }),
  }),
});

export const {
 useCreateRevisionMutation,
 useMarkRevisionCompletedMutation,
 useGetUpcomingRevisionsQuery
} = revisionApi;
