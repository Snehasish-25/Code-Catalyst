import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LECTURE_BASE_API = "http://localhost:3000/api/v1/course";
export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LECTURE_BASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({lectureTitle,courseId}) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: {lectureTitle},
      }),
    }),

    editLecture: builder.mutation({
    query: ({lectureId,courseId,updateData}) => ({
     
      url: `/${courseId}/lecture/${lectureId}`,
      method: "POST",
      body: updateData,
    }),
  }),

  removeLecture: builder.mutation({
    query: (lectureId) => ({
      url: `/lecture/${lectureId}`,
      method: "DELETE",
    }),
  }),

  getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    })

}),
});

export const{
    useCreateLectureMutation,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery
}=lectureApi;