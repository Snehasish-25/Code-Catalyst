import RichTextEditor from "@/components/RichTextEditor";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useUpdateCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();

  const courseId = params.courseId;

  const [input, setInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const [updateCourse, { data, isSuccess, isLoading, error }] =
    useUpdateCourseMutation();

  const { data: getCourseDataById, isLoading: getCourseByIdIsLoading ,refetch} =
    useGetCourseByIdQuery(courseId);

  const course = getCourseDataById?.data;

  const [publishCourse] =
    usePublishCourseMutation();

  useEffect(() => {
    if (course) {
      refetch();
      setInput({
        title: course.title,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [getCourseDataById,refetch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const handleCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const handleThumbnail = (e) => {
    const thumbnail = e.target.files?.[0];
    if (thumbnail) {
      setInput({ ...input, courseThumbnail: thumbnail });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(thumbnail);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseLevel", input.courseLevel);
    formData.append("courseThumbnail", input.courseThumbnail);
    updateCourse({ formData, courseId });
    navigate("/admin/courses");
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
        navigate("/admin/courses")
      }
    } catch (error) {
      toast.error(error.data.message || "Failed to publish or unpublish Course");
    }
  }

  useEffect(() => {
    if (isSuccess)
      toast.success(data?.message || "Course updated Successfully");
    if (error)
      toast.error(
        error.data.message || "Unable to create course successfully hehe"
      );
  }, [isSuccess, error]);

  if (getCourseByIdIsLoading) return <h1>Loading...</h1>;
  

  return (
    <Card className="mr-12">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={getCourseDataById?.data?.lectures.length === 0}
            onClick={() =>
              publishStatusHandler(
                getCourseDataById?.data?.isPublished ? "false" : "true"
              )
            }
          >
            {getCourseDataById?.data?.isPublished  ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="Eg.- FullStack Development Bootcamp"
            />
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={handleChange}
              placeholder="Eg.- Become a Fullstack developer from zero to hero in 8 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5 ">
            <div>
              <Label>Category</Label>
              <Select onValueChange={handleCategory} value={input.category}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>

                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="React JS">React JS</SelectItem>
                    <SelectItem value="Redux">Redux</SelectItem>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Backend Development">
                      Backend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                onValueChange={handleCourseLevel}
                value={input.courseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>

                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Price in (INR)</Label>
              <Input
                type="number"
                value={input.coursePrice}
                name="coursePrice"
                onChange={handleChange}
                placeholder="₹499"
                className="w-fit"
              />
            </div>
          </div>
          <div className="pt-2">
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={handleThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>

          <div className="pt-2">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleUpdate}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
