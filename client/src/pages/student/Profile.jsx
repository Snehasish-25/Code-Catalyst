// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   DialogHeader,
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Loader2 } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import Course from "./Course";
// import {
//   useLoadUserProfileQuery,
//   useUpdateUserProfileMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState("");

//   const { isLoading, refetch } = useLoadUserProfileQuery();

//   const { user: reduxUser } = useSelector((state) => state.authSlice);  //directly user ka info Store se hi fetch karlo isse store.jsx me jo additional code likhna padraha tha woh nahi likhna padega 
//   const user = reduxUser;
  
//   const [
//     updateUserProfile,
//     {
//       data: updateUserProfileData,
//       error:updateUserProfileError,
//       isError,
//       isSuccess: updateUserProfileisSuccess,
//       isLoading:updateUserProfileisLoading
//     },
//   ] = useUpdateUserProfileMutation();

   

//   const handleOnChange = (e) => {
//     const file = e.target.files?.[0]; // Get the first file from the input
//     if (file) {
//       setProfilePhoto(file); // Update the state with the selected file
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("profilePhoto", profilePhoto);
  
//       await updateUserProfile(formData).unwrap();
//       toast.success("User profile updated successfully!");
//     } catch (err) {
//       console.error("Error response:", err); // Log error for debugging
//       toast.error(err?.data?.message || "Failed to update user profile!");
//     }
//   };
  
//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (updateUserProfileisSuccess)
//     {
//       refetch();
//       toast.success(updateUserProfileData.message || "User Profile updated Successfully");
//     }
      
//     if (isError)
//       toast.error(updateUserProfileError.message || "Failed to update user profile successfully");
//   }, [updateUserProfileError, updateUserProfileisSuccess, updateUserProfileData,isError]);
  

//   if (isLoading) {
//     return <h1>Wait while Profile is Loading...</h1>;
//   }
//   console.log(user.enrolledCourses);

//   return (
//     <div className="h-screen w-screen ">
//       <div className="max-w-5xl mx-auto px-4 pt-24">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoURL || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-medium text-gray-700 dark:text-gray-300 ml-2">
//                 {user?.name}
//               </span>
//             </h1>
//           </div>

//           <div className="mb-2">
//             <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-medium text-gray-700 dark:text-gray-300 ml-2">
//                 {user?.email}
//               </span>
//             </h1>
//           </div>

//           <div className="mb-2">
//             <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-medium text-gray-700 dark:text-gray-300 ml-2">
//                 {user?.role.toUpperCase()}
//               </span>
//             </h1>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click <b>Save</b> when
//                   you're done.
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     type="file"
//                     onChange={handleOnChange}
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <DialogTrigger asChild>
//                   <Button disabled={updateUserProfileisLoading} onClick={handleUpdateUser}>
//                     {updateUserProfileisLoading ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                         wait
//                       </>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </Button>
//                 </DialogTrigger>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-bold text-lg">Courses you're enrolled in :</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user?.enrolledCourses.length === 0 ? (
//             <h1 className="text-lg font-normal">
//               OOPs!! You haven't enrolled on any course yet.
//             </h1>
//           ) : (
//             user?.enrolledCourses.map((course, index) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
  
//   );
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import Course from "./Course";
import {
  useLoadUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { isLoading, refetch } = useLoadUserProfileQuery();

  const { user: reduxUser } = useSelector((state) => state.authSlice);
  const user = reduxUser;

  const [
    updateUserProfile,
    {
      data: updateUserProfileData,
      error: updateUserProfileError,
      isError,
      isSuccess: updateUserProfileisSuccess,
      isLoading: updateUserProfileisLoading,
    },
  ] = useUpdateUserProfileMutation();

  const handleOnChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("profilePhoto", profilePhoto);

      await updateUserProfile(formData).unwrap();
      toast.success("User profile updated successfully!");
    } catch (err) {
      console.error("Error response:", err);
      toast.error(err?.data?.message || "Failed to update user profile!");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (updateUserProfileisSuccess) {
      refetch();
      toast.success(updateUserProfileData.message || "User Profile updated Successfully");
    }

    if (isError)
      toast.error(updateUserProfileError.message || "Failed to update user profile successfully");
  }, [updateUserProfileError, updateUserProfileisSuccess, updateUserProfileData, isError]);

  if (isLoading) {
    return <h1>Wait while Profile is Loading...</h1>;
  }

  return (
    <div className="h-screen w-screen bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 pt-24">
        <h1 className="font-bold text-2xl text-center md:text-left text-gray-900 dark:text-gray-100">PROFILE</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 shadow-lg dark:shadow-none">
              <AvatarImage
                src={user?.photoURL || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="mb-2">
              <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Name:
                <span className="font-medium text-gray-700 dark:text-gray-300 ml-2">
                  {user?.name}
                </span>
              </h1>
            </div>

            <div className="mb-2">
              <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Email:
                <span className="font-medium text-gray-700 dark:text-gray-300 ml-2">
                  {user?.email}
                </span>
              </h1>
            </div>

            <div className="mb-2">
              <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Role:
                <span className="font-medium text-gray-700 dark:text-gray-300 ml-2">
                  {user?.role.toUpperCase()}
                </span>
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="mt-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click <b>Save</b> when you're done.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="col-span-3 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Profile Photo</Label>
                    <Input
                      type="file"
                      onChange={handleOnChange}
                      accept="image/*"
                      className="col-span-3 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button
                      disabled={updateUserProfileisLoading}
                      onClick={handleUpdateUser}
                      className="bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100 shadow-md hover:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      {updateUserProfileisLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">Courses you're enrolled in :</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
            {user?.enrolledCourses.length === 0 ? (
              <h1 className="text-lg font-normal text-gray-900 dark:text-gray-300">
                OOPs!! You haven't enrolled in any course yet.
              </h1>
            ) : (
              user?.enrolledCourses.map((course, index) => (
                <Course course={course} key={course._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
