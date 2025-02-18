import React from "react";
import Course from "./Course";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useLoadUserProfileQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const {data,isLoading}=useLoadUserProfileQuery();
  const myLearning =data?.user.enrolledCourses || [];
  return (
    <div className="max-w-6xl mx-auto my-20 px-4 md:px-0">
      <h1 className=" flex justify-center items-center font-bold text-2xl">
        MY LEARNINGS{" "}
      </h1>
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  my-8">
            {Array.from({ length: 12 }).map((__, index) => (
              <MyLearningSkeleton key={index} />
            ))}
          </div>
        ) : myLearning.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-12">
            <h2 className="font-semibold text-xl text-blue-500">
              You are not enrolled in any course.
            </h2>
            <h2 className="font-semibold text-xl text-blue-500">
              Let's Explore trending Courses!
            </h2>
            <Button className="bg-blue-500 dark:bg-gray-800 text-white rounded-full hover:bg-emerald-500 mt-6"><Link to={"/"}>Explore Courses</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  my-8">
            {myLearning.map((course, index) => (
              <Course key={index} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => {
  return (
    <div className="bg-gray-100 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
