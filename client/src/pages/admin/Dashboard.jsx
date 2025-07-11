// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetAllPurchasedCoursesQuery } from "@/features/api/purchaseApi";
// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const Dashboard = () => {

//   const {data, isSuccess, isError, isLoading} = useGetAllPurchasedCoursesQuery();

//   if(isLoading) return <h1>Loading...</h1>
//   if(isError) return <h1 className="text-red-500">Failed to get purchased course</h1>

//   const purchasedCourse = data.data || [];

//   const courseData = purchasedCourse.map((course) => ({
//     name: course.courseId.courseTitle,
//     price: course.courseId.coursePrice
//   }))
 
//   const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);

//   const totalSales = purchasedCourse.length;

//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       <Card className="shadow-lg dark:shadow-lg hover:shadow-xl  dark:shadow-gray-700    transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"> {/* Added dark classes */}
//         <CardHeader>
//           <CardTitle className="text-gray-900 dark:text-gray-100">Total Sales</CardTitle> {/* Added dark text color */}
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600 dark:text-blue-400"> {/* Dark mode text color */}
//             {totalSales}
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg dark:shadow-lg hover:shadow-xl dark:shadow-gray-700   transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"> {/* Added dark classes */}
//         <CardHeader>
//           <CardTitle className="text-gray-900 dark:text-gray-100">Total Revenue</CardTitle> {/* Added dark text color */}
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600 dark:text-blue-400"> {/* Dark mode text color */}
//             ₹{totalRevenue}
//           </p>
//         </CardContent>
//       </Card>

//       {/* Course Prices Card */}
//       <Card className="shadow-lg dark:shadow-lg hover:shadow-xl dark:shadow-gray-700 transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 dark:bg-gray-800 dark:border-gray-700 mr-12 mt-4"> {/* Added dark classes */}
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-100"> {/* Dark mode text color */}
//             Course Prices
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//               <XAxis
//                 dataKey="name"
//                 stroke="#6b7280"
//                 angle={-30} // Rotated labels for better visibility
//                 textAnchor="end"
//                 interval={0} // Display all labels
//                 className="dark:text-gray-100"
//               />
//               <YAxis stroke="#6b7280" className="dark:text-gray-100" /> {/* Dark mode text color */}
//               <Tooltip formatter={(value, name) => [`₹${value}, ${name}`]} />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#4a90e2" // Changed color to a different shade of blue
//                 strokeWidth={3}
//                 dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, ShoppingCart } from "lucide-react";


const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllPurchasedCoursesQuery();

  if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
  if (isError) return <h1 className="text-center text-red-500">Failed to get purchased course</h1>;

  const purchasedCourses = data?.data || [];

  const courseData = purchasedCourses.map(course => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice
  }));

  const totalRevenue = purchasedCourses.reduce((acc, item) => acc + (item.amount || 0), 0);
  const totalSales = purchasedCourses.length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 -mt-12 text-gray-800 dark:text-gray-100">📊 Admin Dashboard</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">

        {/* Total Sales */}
        <div className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg ">
            <CardHeader className="flex items-center gap-2 p-1">
              <ShoppingCart className="text-blue-500 dark:text-blue-400" />
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                {totalSales}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Courses Purchased</p>
            </CardContent>
          </Card>
        </div>

        {/* Total Revenue */}
        <div  className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md">
            <CardHeader className="flex items-center gap-2 p-1">
              <DollarSign className="text-green-500 dark:text-green-400 -pb-2" />
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                ₹{totalRevenue}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Lifetime Earnings</p>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Course Price Chart */}
      <div className="rounded-2xl overflow-hidden ">
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md -p-6">
          <CardHeader >
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">💰 Course Prices Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#6b7280" angle={-30} textAnchor="end" interval={0} />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value) => [`₹${value}`, "Price"]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

