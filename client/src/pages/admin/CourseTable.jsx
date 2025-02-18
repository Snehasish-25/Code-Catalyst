import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {

  const { data, isLoading } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Button onClick={() => navigate("create")}>Create a new course</Button>
      {data?.data ? (
        <Table className="mt-8">
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium ">{course.title}</TableCell>
                <TableCell>₹{course?.coursePrice || "N/A"}</TableCell>
                <TableCell>
                  <Badge>{course?.isPublished ? "Published" : "Draft"}</Badge>
                </TableCell>

                <TableCell>
                  <Button size="sm" variant="ghost" onClick={()=>navigate(`${course._id}`)}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
        <div className="flex items-center">
           <h1 className="text-2xl mt-4">You haven't published any course. Create a new course.</h1>
        </div>
          
        </>
      )}
    </div>
  );
};

export default CourseTable;
