import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Link2, Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  // NEW: Fetch user and authentication state from Redux
  const { user: reduxUser } = useSelector((state) => state.authSlice);
  const user = reduxUser;

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    if (isSuccess)
      toast.success(data.message || "User Logged Out Successfully");
  }, [isSuccess]);

  const role = user?.role;
  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-50 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl pirata-one-regular ">
              Code-Catalyst
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/">
            <div className="text-lg cursor-pointer">Home</div>
          </Link>
          <Link to="/about">
          <div className="text-lg cursor-pointer">About Us</div>
          </Link>
          
          {/* User Avatar and DarkMode Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                  <AvatarImage
                    src={user?.photoURL || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="flex items-center justify-center text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-600">
                    CN
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                <DropdownMenuLabel className="font-bold p-2 text-gray-700 dark:text-gray-300">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={"my-learning"}>
                    <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                      My Learning
                    </DropdownMenuItem>
                  </Link>

                  <Link to={"profile"}>
                    <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                      Edit Profile
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {role === "instructor" ? (
                  <>
                    <DropdownMenuSeparator />

                    <Link to={"admin/dashboard"}>
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button>
                <Link to={"/login"}>Signup</Link>
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">Code-Catalyst</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="outline"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-4 p-4">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold">Code-Catalyst</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator />
        <nav className="flex flex-col space-y-4 text-gray-700 dark:text-gray-300">
          <span className="hover:underline cursor-pointer text-lg font-medium">
            My Learning
          </span>
          <span className="hover:underline cursor-pointer text-lg font-medium">
            Edit Profile
          </span>
          <span className="hover:underline cursor-pointer text-lg font-medium">
            Log out
          </span>
        </nav>
        {role === "instructor" ? (
          <>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full" variant="default">
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
};
