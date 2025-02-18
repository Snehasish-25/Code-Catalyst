// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex">
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r shadow-2xl border-gray-300 dark:border-gray-700  pt-24 px-16 sticky top-0  h-screen">
//         <div className="space-y-4 ">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={32} className="mb-1" />
//             <h1 className="text-xl">Dashboard</h1>
//           </Link>
//           <Link to="courses" className="flex items-center gap-2">
//             <SquareLibrary size={32} className="mb-1" />
//             <h1 className="text-lg">Courses</h1>
//           </Link>
//         </div>
//       </div>
//       <div className="flex-1 pl-12 pt-28 ">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r shadow-xl dark:shadow-xl dark:shadow-gray-700 border-gray-300 dark:border-gray-700 pt-24 px-16 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={32} className="mb-1" />
            <h1 className="text-xl text-gray-900 dark:text-gray-100">Dashboard</h1>
          </Link>
          <Link to="courses" className="flex items-center gap-2">
            <SquareLibrary size={32} className="mb-1" />
            <h1 className="text-lg text-gray-900 dark:text-gray-100">Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 pl-12 pt-28">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
