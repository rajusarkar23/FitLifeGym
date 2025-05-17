"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function PlanSelectionPage({
  authCookie,
}: {
  authCookie: string;
}) {
  const [plan, setPlan] = useState("");

  const { handlePlanSelection } = useUserStore();

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <div></div>

      <div className="border p-10 space-y-4">
        <Select onValueChange={(value) => setPlan(value)}>
          <h2 className="text-2xl">Select a plan to continue</h2>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div>
          {useUserStore.getState().isLoading ? (
            <Button
              variant={"outline"}
              disabled
              className="w-full"
              type="submit"
            >
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={async () => {
                await handlePlanSelection({ selectedPlan: plan, authCookie });
                if (
                  useUserStore.getState().isPlanSelected &&
                  useUserStore.getState().isUserLogedIn
                ) {
                  router.push(`/member/dashboard`);
                }
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
