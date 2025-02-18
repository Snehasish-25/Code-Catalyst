import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation, useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCourse ,{data,isSuccess,isLoading,error}]=useCreateCourseMutation();

  

  const handleCategory = (value) => {
    setCategory(value);
  };
  
  const handleCreateCourse = async () => {
    await createCourse({title:courseTitle,category});
    navigate("/admin/courses");
  };

  useEffect(()=>{
    if(isSuccess)
      toast.success(data?.message || "Course created successfully");
    if(error)
      toast.error(error?.data?.err?.message || "Unable to create course successfully");
  },[isSuccess,error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add course, add some basic course details for your new course.
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
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={handleCategory} value={category}>
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
        <div className="flex items-center gap-2 pt-4">
          <Button variant="outline" onClick={() => navigate("/admin/courses")}>
            Back
          </Button>
          <Button onClick={handleCreateCourse} disabled={isLoading} >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 m-2 animate-spin" />
                Please Wait
              </>
            ) : (
              <>Create</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
