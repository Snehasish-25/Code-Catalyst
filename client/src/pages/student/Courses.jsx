
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";
import { toast } from "sonner";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCoursesQuery();

  useEffect(() => {
    if (isError) toast.error("Some error occurred while fetching courses");
  }, [isError]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-all">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-extrabold text-3xl text-center mb-10 text-gray-900 dark:text-gray-100">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((__, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.data &&
              data.data.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-gray-700 hover:shadow-lg dark:hover:shadow-gray-600 transition-all rounded-lg overflow-hidden">
      <Skeleton className="w-full h-40 dark:bg-gray-700" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full dark:bg-gray-700" />
            <Skeleton className="h-4 w-20 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-16 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-1/4 dark:bg-gray-700" />
      </div>
    </div>
  );
};
