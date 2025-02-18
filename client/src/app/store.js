import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { lectureApi } from "@/features/api/lectureApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore=configureStore({
    reducer:rootReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(authApi.middleware,courseApi.middleware,lectureApi.middleware,purchaseApi.middleware,courseProgressApi.middleware),
})

// const initializeApp=async()=>{
//     await appStore.dispatch(authApi.endpoints.loadUserProfile.initiate({},{forceRefetch:true}));
// }
// initializeApp();