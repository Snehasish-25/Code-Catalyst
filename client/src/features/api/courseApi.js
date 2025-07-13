import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_BASE_API = "http://localhost:3000/api/v1/course";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Courses"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_BASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //createCousre endpoint
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["Refetch_Creator_Courses"],
    }),

    getSearchCourse:builder.query({
      query: ({searchQuery, categories, sortByPrice}) => {
        // Build query string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

        // append cateogry 
        if(categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`; 
        }

        // Append sortByPrice if available
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
        }

        return {
          url:queryString,
          method:"GET", 
        }
      }
    }),

    getCreatorCourses: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Courses"],
    }),

    updateCourse: builder.mutation({
      query: ({formData,courseId}) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Courses"],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),

    getLectures: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
    }),

    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Refetch_Creator_Courses"],
    }),

    getPublishedCourses: builder.query({
      query: () => ({
        url: `/published-courses`,
        method: "GET",
      }),
    }),

    
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useGetLecturesQuery,
  usePublishCourseMutation,
  useGetPublishedCoursesQuery,
  useGetSearchCourseQuery
} = courseApi;
