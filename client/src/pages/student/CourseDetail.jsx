import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const safeExtract = (element) => (element ? element.outerHTML : "");
const parseDescription = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html"); //Converts the raw HTML string into a document object.

  const sections = [
    {
      title: "What You’ll Learn:",
      content:
        //safeExtract(doc.querySelector("h2")) +
        safeExtract(doc.querySelector("ul")),
    },
    {
      title: "Why Take This Course?",
      content: safeExtract(
        doc.querySelector("h3:nth-of-type(1)").nextElementSibling
      ),
    },
    {
      title: "Who Should Take This Course?",
      content: safeExtract(
        doc.querySelector("h3:nth-of-type(2)").nextElementSibling
      ),
    },
    {
      title: "Conclusion",
      content: safeExtract(doc.querySelector("p strong em")),
    },
  ];

  return sections.filter((section) => section.content !== ""); // Remove empty sections from the sections array
};

const CourseDetail = () => {
  const navigate=useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course-details</h1>;

  const { course, purchased } = data;

  const description = course.description;
  const sections = parseDescription(description);

  const handleContinueCourse=()=>{
    if(purchased)
      navigate(`/course-progress/${courseId}`);
  }



  return (
    <div className="space-y-5 mb-8">
      <div className="bg-[#2D2F31] text-white dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl pt-12">
            {course?.title}
          </h1>
          <p className="text-base md:text-lg text-gray-300">{course?.subTitle}</p>
          <p>
            Created By{"  "}
            <span className="text-blue-400 underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-gray-300">Students enrolled: {course.enrolledStudents.length}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          {/*<h1 className="font-bold text-xl md:text-2xl">Description</h1>*/}
          {/* <div className="text-sm" dangerouslySetInnerHTML={{__html:course.description}}/>*/}

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-400 pb-2 mb-4 dark:text-blue-400">
                  {section.title}
                </h2>
                <div className="prose max-w-none text-sm dark:text-gray-300">
                  <ul className="list-none space-y-2">
                    {/* Split the content into lines and add a bullet point for each */}
                    {section.content &&
                      section.content
                        .split(/<\/li>|<br>/) // Split by closing <li> or <br> tags
                        .filter((line) => line.trim() !== "") // Remove empty lines
                        .map((line, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4 mt-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: line 
                              }}
                            />
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <Card className=" dark:bg-gray-800 dark:text-gray-100">
            <CardHeader>
              <CardTitle className="font-bold text-xl md:text-2xl">Course Content</CardTitle>
              <CardDescription>
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p className="text-normal font-medium dark:text-gray-300">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
            <CardContent className="p-4 flex flex-col  ">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="text-lg font-medium text-blue-600 dark:text-blue-400" >{course.lectures[0].lectureTitle}</h1>
              <Separator className="my-2 bg-gray-400 dark:bg-gray-600" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹{course.coursePrice}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button className="w-full dark:bg-blue-500 hover:bg-blue-600" onClick={handleContinueCourse}>Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

// import BuyCourseButton from "@/components/BuyCourseButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// const safeExtract = (element) => (element ? element.outerHTML : "");
// const parseDescription = (html) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, "text/html");

//   const sections = [
//     {
//       title: "What You’ll Learn:",
//       content: safeExtract(doc.querySelector("ul")),
//     },
//     {
//       title: "Why Take This Course?",
//       content: safeExtract(
//         doc.querySelector("h3:nth-of-type(1)").nextElementSibling
//       ),
//     },
//     {
//       title: "Who Should Take This Course?",
//       content: safeExtract(
//         doc.querySelector("h3:nth-of-type(2)").nextElementSibling
//       ),
//     },
//     {
//       title: "Conclusion",
//       content: safeExtract(doc.querySelector("p strong em")),
//     },
//   ];

//   return sections.filter((section) => section.content !== "");
// };

// const CourseDetail = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const courseId = params.courseId;

//   const { data, isLoading, isError } =
//     useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Failed to load course-details</h1>;

//   const { course, purchased } = data;

//   const description = course.description;
//   const sections = parseDescription(description);

//   const handleContinueCourse = () => {
//     if (purchased) navigate(`/course-progress/${courseId}`);
//   };

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl pt-12">
//             {course?.title}
//           </h1>
//           <p className="text-base md:text-lg text-gray-300">{course?.subTitle}</p>
//           <p>
//             Created By {" "}
//             <span className="text-blue-400 underline italic">
//               {course?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm text-gray-400">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.createdAt.split("T")[0]}</p>
//           </div>
//           <p className="text-gray-300">Students enrolled: {course.enrolledStudents.length}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <div className="space-y-8">
//             {sections.map((section, index) => (
//               <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
//                 <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-400 pb-2 mb-4 dark:text-blue-400">
//                   {section.title}
//                 </h2>
//                 <div className="prose max-w-none text-sm dark:text-gray-300">
//                   <ul className="list-none space-y-2">
//                     {section.content &&
//                       section.content
//                         .split(/<\/li>|<br>/)
//                         .filter((line) => line.trim() !== "")
//                         .map((line, idx) => (
//                           <li key={idx} className="flex items-start gap-2">
//                             <span className="text-green-400">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={2}
//                                 stroke="currentColor"
//                                 className="w-4 h-4 mt-1"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                             </span>
//                             <span
//                               dangerouslySetInnerHTML={{
//                                 __html: line,
//                               }}
//                             />
//                           </li>
//                         ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Card className="bg-gray-800 text-gray-100">
//             <CardHeader>
//               <CardTitle className="font-bold text-xl md:text-2xl">Course Content</CardTitle>
//               <CardDescription className="text-gray-400">
//                 {course.lectures.length} lectures
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p className="text-gray-300">{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card className="bg-gray-800 text-gray-100">
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={course.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1 className="text-lg font-medium text-blue-400">{course.lectures[0].lectureTitle}</h1>
//               <Separator className="my-2 bg-gray-600" />
//               <h1 className="text-lg md:text-xl font-semibold">₹{course.coursePrice}</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleContinueCourse}>Continue Course</Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;
