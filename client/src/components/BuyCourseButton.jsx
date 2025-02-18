import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckOutSession,
    { data, isSuccess, isLoading, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const handlePurchaseCourse = async () => {
    await createCheckOutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) window.location.href = data.url;
    } else {
      toast.error("Invalid Response from server");
    }
    if (isError) {
      toast.error(error?.data.message || "Failed to create checkout session");
    }
  }, [isSuccess,isError,data,error]);
  return (
    <Button
      onClick={handlePurchaseCourse}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
