import { Card, CardContent} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Course = ({course}) => {

  return (
    
    <Link to={`http://localhost:5173/course-detail/${course._id}`}>
        <Card className="overflow-hidden rounded-lg bg-[#d8f3dc] 
        dark:bg-gray-900 dark:text-gray-100
        shadow-lg dark:shadow-gray-700 hover:shadow-xl dark:hover:shadow-gray-600
        transform hover:scale-105 cursor-pointer transition-all duration-300">
        <div className='relative'>
            <img 
            src={course.courseThumbnail}
            alt='course'
            className='w-full h-36 object-cover rounded-t-lg'>
            </img>
        </div>
        <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          {course.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-full overflow-hidden ">
              <AvatarImage src={course.creator?.photoURL || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{course.creator?.name}</h1>
          </div>
          <Badge className={'bg-blue-500 dark:bg-blue-700  text-white px-2 py-1 text-xs rounded-full'}>{course.courseLevel}</Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹{course.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
    
  )
}

export default Course;

