import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_AUTH_BASE_API = "http://localhost:3000/api/v1/user";
export const authApi = createApi({
  reducerPath: "authApi",
 
  baseQuery: fetchBaseQuery({
    baseUrl: USER_AUTH_BASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //registerUser endpoint
    registerUser: builder.mutation({
      query: (inputData) => ({
        //inputData-->Login.jsx wale file se aayega
        url: "signup",
        method: "POST",
        body: inputData,
      }),
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      //This is an RTK Query lifecycle method that runs when the mutation starts.
      /*Basically onQueryStarted wale method ka use karne hum userLoggedIn wale action ke through user ke 
         loggedIn state ko manage kar rahe h when the user gets sucessfully loggedIn(queryFullfilled) then we
         dispatch an action to update the status of userLoggedIn */
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //console.log("From authApi ",result);
          dispatch(userLoggedIn({ user: result.data.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logoutUser:builder.mutation({
      query:()=> ({
        url:"logout",
        method:"GET"
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          //await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      }
    }),

    loadUserProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("From authApi ",result);
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      }

    }),

    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),






  }),
});

//auto -generated RTK hooks for interacting with the registerUser and loginUser endpoints-->to be used in Login.jsx
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserProfileQuery,
  useUpdateUserProfileMutation,
  useLogoutUserMutation
} = authApi;
