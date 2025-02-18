import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [currentLecture, setCurrentLecture] = useState(null);


  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess},
  ] = useInCompleteCourseMutation();

  // useEffect(() => {
  //   if (completedSuccess) {
  //     toast.success(markCompleteData?.message || "Course marked as completed");
  //     refetch();
  //   }
  //   else if (inCompletedSuccess) {
  //     toast.success(markInCompleteData?.message || "Course marked as inCompleted");
  //     refetch();
  //   }
  // }, [completedSuccess, inCompletedSuccess,markCompleteData,markInCompleteData,refetch]);

  useEffect(() => {
    if (currentLecture) {
      handleLectureProgress(currentLecture?._id);
    }
  }, [currentLecture]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load Course Details</p>;


  //console.log(data);
  const { courseDetails, progress, completed } = data.data;

  const { title } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };
  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };
  
  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
    refetch();
    toast.success(markCompleteData?.message || "Course marked as completed");
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
    refetch();
    toast.success(markInCompleteData?.message || "Course marked as Incompleted");
  };
 

  return (
    <div className="max-w-7xl mx-auto p-4 dark:bg-gray-900 dark:text-white">
      {/* Display course name  */}
      <div className="flex justify-between mb-4 mt-20">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4 dark:bg-gray-800">
          <div>
          {/*React does not reset the video tag’s src if the new value is undefined or null. 
          It continues playing the previous video.So if any lecture does not contain the videoUrl it shows the previous video*/}
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>{
                handleLectureProgress(
                  currentLecture?._id || initialLecture?._id
                )
              }
              
              }
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-1 md:pt-0 dark:border-gray-700">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture?._id === currentLecture?._id
                    ? `bg-gray-200 dark:bg-gray-700`
                    : `dark:bg-gray-800`
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 dark:text-gray-300 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600 dark:bg-green-700 dark:text-green-200"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;


