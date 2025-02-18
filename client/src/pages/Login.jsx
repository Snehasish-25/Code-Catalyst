import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  //Handling multiple input fields together
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput(() => ({ ...signupInput, [name]: value }));
    } else {
      setLoginInput(() => ({ ...loginInput, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData)
      toast.success(registerData.message || "Signup successfull");
    if (registerError)
      toast.error(registerError.data.err.message || "Signup Failed");
    if (loginIsSuccess && loginData)
    {
      toast.success(loginData.message || "Login successfull");
      navigate("/");
    }
     
    if (loginError) toast.error(loginError.data.err.message || "Login Failed");
  }, [
    registerData,
    loginData,
    loginError,
    registerError,
    registerIsLoading,
    loginIsLoading,
  ]);

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Tabs defaultValue="signup" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2 border-2 border-gray-300">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card className="shadow-lg shadow-gray-700">
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                {/*htmlFor connects the <label> to an input element using the id attribute of the input.When you click on the label, the associated input field gets focused automatically*/}
                <Input
                  type="text"
                  placeholder="Eg.-Snehasish"
                  required
                  id="name"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Eg.-abc@gmail.com"
                  required
                  id="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Eg.-abc123#hello"
                  required
                  id="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card className="shadow-lg shadow-gray-700">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your login credentials and click Login button when you're
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Eg.-abc@gmail.com"
                  required
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => handleInputChange(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Eg.-abc123#hello"
                  required
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => handleInputChange(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
