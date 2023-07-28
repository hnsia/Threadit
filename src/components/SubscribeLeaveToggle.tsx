"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import { SubscribeToSubthreaditPayload } from "@/lib/validators/subthreadit";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface SubscribeLeaveToggleProps {
  subthreaditId: string;
  subthreaditName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  subthreaditId,
  subthreaditName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubthreaditPayload = {
        subthreaditId,
      };

      const { data } = await axios.post("/api/subthreadit/subscribe", payload);
      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong.",
        description:
          "Could not subscribe to subthreadit, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Subscribed.",
        description: `You are now subscribed to t/${subthreaditName}.`,
      });
    },
  });

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave community</Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;
