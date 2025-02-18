import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/lectureApi";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LectureCard from "./LectureCard";
import { useGetLecturesQuery } from "@/features/api/courseApi";

const AddLecture = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [lectureTitle, setLectureTitle] = useState();
  const [createLecture, { data, isSuccess, isLoading, error }] =useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureIsLoading,
    isError: lectureError,
    refetch
  } = useGetLecturesQuery(courseId);

  const handleCreateLecture = async () => {
    setLectureTitle("");
    await createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess)
    {
      refetch();
      toast.success(data.message || "Lecture created successfully");
    }

    if (error) toast.error(error.data.message || "Unable to create Lecture");
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture.
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Title"
          />
        </div>
        <div className="flex items-center gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/courses/${courseId}`)}
          >
            Back to Courses
          </Button>
          <Button onClick={handleCreateLecture} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 m-2 animate-spin" />
                Please Wait
              </>
            ) : (
              <>Create Lecture</>
            )}
          </Button>
        </div>
        <div className="pt-8">
          {lectureIsLoading ? (
            <p className="text-lg font-medium">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-lg font-medium">Failed to load lectures.</p>
          ) : lectureData.data.length === 0 ? (
            <p className="text-lg font-medium">No lectures available</p>
          ) : (
            lectureData.data.map((lecture, index) => (
              <LectureCard
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLecture;
