import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/lectureApi";
import { useGetLecturesQuery } from "@/features/api/courseApi";

const MEDIA_API = "http://localhost:3000/api/v1/media";

const LectureTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;

  const {
    data: lectureData,
    isLoading: lectureIsLoading,
    isSuccess: lectureIsSuccess,
    refetch: refetchLecture,
  } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData;

  const [lectureTitle, setLectureTitle] = useState();
  const [isFree, setIsFree] = useState(false);
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const [editLecture, { data, isSuccess, isLoading, error }] =
    useEditLectureMutation();
  const [
    removeLecture,
    {
      isSuccess: removeLectureIsSuccess,
      isLoading: removeLectureIsLoading,
      error: removeLectureError,
    },
  ] = useRemoveLectureMutation();

  const { refetch } = useGetLecturesQuery(courseId);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData(); //FormData is used to send files in an HTTP request.
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        //console.log(res);
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  const handleEditLecture = async () => {
    const updateData = {
      lectureTitle,
      isPreviewFree: isFree,
      videoInfo: uploadVideoInfo,
    };
    await editLecture({ courseId, lectureId, updateData });
    navigate(`/admin/courses/${courseId}/lecture`);
  };

  const handleRemove = async () => {
    await removeLecture(lectureId);
    navigate(`/admin/courses/${courseId}/lecture`);
  };

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    if (error) toast.error(error.data.message);
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeLectureIsSuccess) {
      toast.success("Lecture deleted successfully");
      refetch();
    }

    if (removeLectureError)
      toast.error("Unable to delete lecture successfully");
  }, [removeLectureIsSuccess, removeLectureError]);

  

  useEffect(() => {
    if(lectureIsSuccess)
    {
    console.log(lectureData);
    setLectureTitle(lecture.data.lectureTitle);
    setIsFree(lecture.data.isPreviewFree);
    }
  }, [lectureIsSuccess]);

  useEffect(() => {
    // Refetch the lecture data when the component is revisited (re-mounted or lectureId changes)
    if (lectureId) {
      refetchLecture();
    }
  }, [lectureId, refetchLecture]);
  

  if(lectureIsLoading)
    return (<p>Lecture details Loading...</p>)

  return (
    <Card className="mr-12" >
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button
            disabled={removeLectureIsLoading}
            variant="destructive"
            onClick={handleRemove}
          >
            {removeLectureIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            onChange={fileChangeHandler}
            accept="video/*"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Is this video FREE?</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button disabled={isLoading} onClick={handleEditLecture}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
