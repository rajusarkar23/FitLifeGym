"use client";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  CircleCheck,
  Loader,
  Pen,
  SquarePen,
} from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/config";
import axios from "axios";

const MemberPage = ({ authCookie }: { authCookie: string }) => {
  const { getProfile } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [selectedGenderValue, setSelectedGenderValue] = useState("");
  // console.log(selectedGenderValue);

  const [date, setDate] = React.useState<Date | undefined>(
    new Date("Mon Jan 01 2000   00:00:00 GMT+0530 (India Standard Time")
  );

  const [isProfessionInputFieldDisabled, setIsProfessionInputFieldDisabled] =
    useState(true);

  const [isProfessionUpdating, setIsProfessionUpdating] = useState(false);
  const [professionUpdatingError, setProfessionUpdatingError] = useState("");
  const [isProfessionUpdatingError, setIsProfessionUpdatingError] =
    useState(false);
  const [isEditingProfession, setIsEditingProfession] = useState(false);
  const [profession, setProfession] = useState("");
  const [isGenderUpdating, setIsGenderUpdating] = useState(false);
  const [isGenderUpdateSuccess, setIsGenderUpdateSuccess] = useState(false);
  const [isGenderUpdateError, setIsGenderUpdateError] = useState(false);
  const [genderUpdateErrorMessage, setGenderUpdateErrorMessage] = useState("");
  const [isDobUpdating, setIsDobUpdating] = useState(false);
  const [isDobUpdatingSuccess, setIsDobUpdatingSuccess] = useState(false);
  const [isDobUpdatingError, setIsDobUpdatingError] = useState(false);
  const [dobUpdatingError, setDobUpdatingError] = useState("");
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isProfileUpdateError, setIsProfileUpdateError] = useState(false);
  const [profileUpdateErrorMessage, setProfileUpadateError] = useState("");

  // refs
  const professionRef = useRef<HTMLInputElement>(null);
  const profilePhotoRef = useRef<HTMLInputElement>(null);

  const fetchMemberProfile = async () => {
    await getProfile({
      authCookie,
      userName: `${useUserStore.getState().username}`,
    });
    setDate(new Date(useUserStore.getState().memberProfile[0].dob!));
  };

  useEffect(() => {
    setLoading(true);
    fetchMemberProfile();
    setLoading(false);
  }, []);

  if (loading || useUserStore.getState().isLoading) {
    return (
      <div className="flex justify-center items-center-[40vh]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-center items-center mt-10">
      <div>
        {useUserStore.getState().memberProfile.length !== 0 && (
          <div className="w-[250px] h-[250px] rounded-full overflow-hidden">
            <Image
              src={useUserStore.getState().memberProfile[0].imageUrl!}
              alt="profile_image"
              width={250}
              height={250}
              className="w-full h-full object-cover"
            />
            <div className="mt-[-60px] ml-44">
              <Button
                variant={"outline"}
                className="absolute text-xs h-6"
                onClick={() => {
                  profilePhotoRef.current?.click()!;
                }}
              >
                {isProfileUpdating ? (
                  <Loader className="animate-spin" />
                ) : (
                  <p>Change photo</p>
                )}
              </Button>
            </div>

            <div className="hidden">
              <Input
                type="file"
                ref={profilePhotoRef}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  const formData = new FormData();
                  formData.append("file", file!);
                  try {
                    setIsProfileUpdating(true);
                    setIsProfileUpdateError(false);
                    await axios
                      .post(
                        `${NEXT_PUBLIC_BACKEND_URL}/member/post/upload-post-image`,
                        formData
                      )
                      .then(async (response) => {
                        if (response.data.success) {
                          try {
                            const sendReq = await fetch(
                              `${NEXT_PUBLIC_BACKEND_URL}/member/profile/update-profile-photo?data=${response.data.fileUrl}`,
                              {
                                method: "PUT",
                                headers: {
                                  Authorization: authCookie,
                                },
                              }
                            );

                            const res = await sendReq.json();

                            if (res.success) {
                              fetchMemberProfile();
                              setIsProfileUpdating(false);
                            }
                          } catch (error) {
                            console.log(error);
                            setProfileUpadateError("Something is broken");
                          }
                        }
                      })
                      .catch((error) => {
                        setIsProfileUpdating(false);
                        setIsProfileUpdateError(true);
                        setProfileUpadateError(error.response.data);
                      });
                  } catch (error) {
                    console.log(error);
                    setIsProfileUpdating(false);
                    setIsProfileUpdateError(true);
                    setProfileUpadateError("Something is broken");
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="py-4">
        {useUserStore.getState().memberProfile.length !== 0 && (
          <div>
            <div className="pt-8">
              <p className="text-2xl text-center">
                Hello,{" "}
                <span className="font-bold text-zinc-700">
                  {useUserStore.getState().memberProfile[0].name}
                </span>
              </p>
            </div>

            <div className="mt-8 border rounded shadow p-4">
              {/* Show plan details */}
              <div className="sm:flex sm:flex-row flex-col sm:space-x-16">
                <div className="text-xl">
                  <p className="text-sm">
                    Current plan:{" "}
                    <span className="font-bold uppercase text-zinc-600">
                      {useUserStore.getState().selectedPlan}
                    </span>
                  </p>
                  <p className="text-sm">
                    Plan started:{" "}
                    <span className="font-bold text-zinc-600">
                      {format(
                        useUserStore.getState().memberProfile[0]
                          .planPurchasedOn!,
                        "PPP"
                      )}
                    </span>
                  </p>
                  <p className="text-sm">
                    Plan started:{" "}
                    <span className="font-bold text-zinc-600">
                      {format(
                        useUserStore.getState().memberProfile[0].planEndsOn!,
                        "PPP"
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  <div>
                    <div>
                      <p className="text-sm font-semibold">Profession:</p>
                      <div className="flex">
                        <Input
                          placeholder="Enter what you do"
                          className="h-8"
                          defaultValue={
                            useUserStore.getState().memberProfile[0].profession!
                          }
                          disabled={isProfessionInputFieldDisabled}
                          ref={professionRef}
                          onChange={(e) => {
                            setProfession(e.target.value);
                          }}
                        />

                        {isEditingProfession ? (
                          <Button
                            className="h-8 font-bold"
                            disabled={isProfessionUpdating}
                            onClick={async () => {
                              try {
                                setIsProfessionUpdating(true);
                                setIsProfessionUpdatingError(false);
                                const sendReq = await fetch(
                                  `${NEXT_PUBLIC_BACKEND_URL}/member/profile/update-profession?data=${profession}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      Authorization: authCookie,
                                    },
                                  }
                                );
                                const res = await sendReq.json();

                                if (res.success) {
                                  setIsEditingProfession(false);
                                  setIsProfessionInputFieldDisabled(true);
                                  fetchMemberProfile();
                                  setIsProfessionUpdating(false);
                                } else {
                                  setIsEditingProfession(false);
                                  setIsProfessionInputFieldDisabled(true);
                                  setIsProfessionUpdating(false);
                                  setIsProfessionUpdatingError(true);
                                  setProfessionUpdatingError(res.message);
                                }
                              } catch (error) {
                                console.log(error);
                                setIsProfessionUpdatingError(true);
                                setProfessionUpdatingError(
                                  "Something is broken"
                                );
                              }
                            }}
                          >
                            {isProfessionUpdating ? (
                              <Loader className="animate-spin" />
                            ) : (
                              <p>Update</p>
                            )}
                          </Button>
                        ) : (
                          <SquarePen
                            size={30}
                            onClick={() => {
                              setIsProfessionInputFieldDisabled(
                                !isProfessionInputFieldDisabled
                              );
                              setIsEditingProfession(true);

                              setTimeout(() => {
                                professionRef.current?.focus();
                              }, 10);
                            }}
                            className="bg-red-400 rounded p-0.5 hover:cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                    {/* GENDER */}
                    <p className="text-sm mt-2 font-semibold">Gender</p>
                    <div>
                      <Select
                        defaultValue={
                          typeof useUserStore.getState().memberProfile[0]
                            .gender === "string"
                            ? useUserStore.getState().memberProfile[0].gender!
                            : "select"
                        }
                        onValueChange={async (e) => {
                          // setSelectedGenderValue(e.valueOf.toString())
                          // console.log(e);

                          if (e === "select") {
                            console.log("select");
                            return;
                          }

                          try {
                            setIsGenderUpdating(true);
                            setIsGenderUpdateSuccess(false);
                            setIsGenderUpdateError(false);
                            const sendReq = await fetch(
                              `${NEXT_PUBLIC_BACKEND_URL}/member/profile/update-gender?data=${e}`,
                              {
                                method: "PUT",
                                headers: {
                                  Authorization: authCookie,
                                },
                              }
                            );

                            const res = await sendReq.json();

                            if (res.success) {
                              setIsGenderUpdating(false);
                              setIsGenderUpdateSuccess(true);
                            } else {
                              setIsGenderUpdating(false);
                              setIsGenderUpdateError(true);
                              setGenderUpdateErrorMessage(res.message);
                            }
                          } catch (error) {
                            console.log(error);
                            setIsGenderUpdating(false);
                            setIsGenderUpdateError(true);
                            setGenderUpdateErrorMessage("Something is broken");
                          }
                        }}
                      >
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {isGenderUpdating && (
                        <p className="flex items-center font-bold text-blue-600">
                          Updating...{" "}
                          <Loader className="animate-spin" size={15} />
                        </p>
                      )}
                      {isGenderUpdateSuccess && (
                        <p className="flex items-center text-green-600 font-bold">
                          Success{" "}
                          <CircleCheck
                            size={15}
                            className="text-green-600 ml-1"
                          />
                        </p>
                      )}
                    </div>
                    {/* DOB */}
                    <p className="text-sm mt-2 font-semibold">DOB:</p>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={async (newDate) => {
                              setDate(newDate);

                              try {
                                setIsDobUpdating(true);
                                setIsDobUpdatingError(false);
                                setIsDobUpdatingSuccess(false);
                                const sendReq = await fetch(
                                  `${NEXT_PUBLIC_BACKEND_URL}/member/profile/update-dob?data=${newDate}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      Authorization: authCookie,
                                    },
                                  }
                                );
                                const res = await sendReq.json();

                                if (res.success) {
                                  setIsDobUpdating(false);
                                  setIsDobUpdatingSuccess(true);
                                } else {
                                  setIsDobUpdating(false);
                                  setIsDobUpdatingError(true);
                                  setDobUpdatingError(res.message);
                                }
                              } catch (error) {
                                console.log(error);
                                setIsDobUpdating(false);
                                setIsDobUpdatingError(true);
                                setDobUpdatingError("Something is broken");
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {isDobUpdating && (
                        <p className="text-blue-600 font-bold flex items-center">
                          Updating...{" "}
                          <Loader className="animate-spin" size={18} />
                        </p>
                      )}
                      {isDobUpdatingSuccess && (
                        <p className="text-green-600 font-bold flex items-center">
                          Success <CircleCheck size={18} />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPage;
