"use client";

import { useUserStore } from "@/store/user-store";
import {
  ChartNoAxesColumn,
  CheckCircle,
  CircleCheck,
  CirclePlus,
  Heart,
  LoaderCircle,
  MessageCircleMore,
  Send,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/config";
import { useMobile } from "@/hooks/use-mobile";

interface Like {
  id: number;
}
interface Dislike {
  id: number;
}
// comment types
interface Comment {
  id: number;
  comment: string;
  commentFor: number;
  commentByName: string;
  commentByUserId: number;
  userProfileUrl: string;
}

// edit username
function EditUserNameDialog({
  currentUserName,
  cookie,
}: {
  currentUserName: string;
  cookie: string;
}) {
  const router = useRouter();

  const [newUserName, setNewUserName] = useState("");

  const { updateUserName } = useUserStore();

  const handleClick = async () => {
    await updateUserName({ authCookie: cookie!, newUserName: newUserName });

    if (useUserStore.getState().isResponseOkay) {
      router.push(`/member/profile/${useUserStore.getState().username}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen
          size={18}
          className="ml-1 hover:scale-105 transition-all hover:cursor-pointer text-blue-400"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your username</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Current
            </Label>
            <Input
              id="currentUserName"
              defaultValue={currentUserName}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              New
            </Label>
            <Input
              id="newUserName"
              placeholder="Enter new username"
              className="col-span-3"
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// edit name
function EditNameDialog({
  currentName,
  cookie,
}: {
  currentName: string;
  cookie: string;
}) {
  const router = useRouter();
  const params = useParams();

  const [newName, setNewName] = useState("");

  const { updateName, getProfile } = useUserStore();

  const handleClick = async () => {
    await updateName({ authCookie: cookie!, newName: newName });

    await getProfile({
      authCookie: cookie,
      userName: params.username?.toString()!,
    });
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen
          size={18}
          className="ml-1 hover:scale-105 transition-all hover:cursor-pointer text-blue-400"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your name</DialogTitle>
          <DialogDescription>
            Make changes to your name here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Current
            </Label>
            <Input
              id="currentName"
              defaultValue={currentName}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              New
            </Label>
            <Input
              id="newName"
              placeholder="Enter new username"
              className="col-span-3"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// create a post
function CreatePost({ authToken }: { authToken: string }) {
  const [textContent, setTextContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [isFileUploadSuccess, setIsFileUploadSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPostCreationSuccess, setIsPostCreationSuccess] = useState(false);
  const [isPostCreating, setIspostCreating] = useState(false);

  const { fetchPosts } = useUserStore();

  return (
    <div className="flex justify-center">
      <Sheet>
        <SheetTrigger
          className="dark:bg-secondary bg-primary w-48 rounded h-8 flex items-center justify-center text-white"
          onClick={() => {
            setIsPostCreationSuccess(false);
          }}
        >
          <CirclePlus size={20} className="mr-1" /> Create a new post
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              Write down your post and upload an image below.
            </SheetTitle>
            <SheetDescription>
              {isFileUploadSuccess && (
                <Image
                  src={postImageUrl}
                  alt="post_image"
                  height={400}
                  width={400}
                  className="rounded"
                />
              )}
            </SheetDescription>
          </SheetHeader>
          <div className="w-80 space-y-3 mb-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label
                  htmlFor="textContent"
                  className="text-secondary dark:text-primary"
                >
                  Start typing
                </Label>
                <Textarea
                  placeholder="Type here"
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="imageUrl"
                  className="text-secondary dark:text-primary"
                >{`Upload image(optional)`}</Label>
                <Input
                  type="file"
                  id="file"
                  name="file"
                  onChange={async (e) => {
                    setFileUploading(true);
                    setIsFileUploadSuccess(false);
                    setIsError(false);
                    setPostImageUrl("");

                    const file = e.target.files?.[0];
                    const formData = new FormData();
                    formData.append("file", file!);
                    try {
                      await axios
                        .post(
                          `${NEXT_PUBLIC_BACKEND_URL}/member/post/upload-post-image`,
                          formData
                        )
                        .then((response) => {
                          if (response.data.success) {
                            setFileUploading(false);
                            setIsFileUploadSuccess(true);
                            setPostImageUrl(response.data.fileUrl);
                          }
                        })
                        .catch((error) => {
                          setFileUploading(false);
                          setIsError(true);
                          setIsFileUploadSuccess(false);
                          console.log(error);
                          setErrorMessage("error.response.message");
                        });
                    } catch (error) {
                      console.log(error);
                      setIsError(true);
                      setErrorMessage(
                        "Something went wrong, please try again."
                      );
                    }
                  }}
                />
                {fileUploading && <LoaderCircle className="animate-spin" />}
                {isFileUploadSuccess && (
                  <p className="flex items-center text-green-700">
                    Uploaded <CircleCheck size={20} className="ml-1" />
                  </p>
                )}
              </div>
            </div>
            <div>
              {useUserStore.getState().isError && (
                <p className="text-sm text-red-500 font-semibold">
                  Error: {useUserStore.getState().errorMessage}
                </p>
              )}
            </div>
            <Button
              className="w-24"
              onClick={async () => {
                setIsPostCreationSuccess(false);
                setIspostCreating(true);
                try {
                  await axios
                    .post(
                      `${NEXT_PUBLIC_BACKEND_URL}/member/post/create`,
                      {
                        textContent,
                        postImageUrl,
                      },
                      {
                        headers: {
                          Authorization: authToken,
                        },
                      }
                    )
                    .then((res) => {
                      if (res.data.success) {
                        setIsPostCreationSuccess(true);
                        setIspostCreating(false);
                        fetchPosts({ authCookie: authToken });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Post
              <Send />
            </Button>
            {isPostCreating && <LoaderCircle className="animate-spin" />}

            {isPostCreationSuccess && (
              <p className="text-xs font-semibold text-green-700 flex">
                <CheckCircle className="mr-1" size={15} />
                Post created successfully, you can close this window.
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// add comment
function AddComment({
  authToken,
  postId,
}: {
  authToken: string;
  postId: number;
}) {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState<Comment[]>([]);
  const { addComment } = useUserStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessageCircleMore
          onClick={() => {
            const isCommentAvailable = useUserStore
              .getState()
              .fetchComment.filter((comm) => comm.commentFor === postId);
            setCommentArray(isCommentAvailable);
          }}
          className="text-red-400 hover:scale-125 transition-all hover:cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 ">
            Comments <MessageCircleMore size={20} />
          </DialogTitle>
          {/* SHOW COMMENTS OF PEOPLE */}
          <div>
            {commentArray.length === 0 ? (
              <p>This post has no comments yet</p>
            ) : (
              commentArray.map((comm, index) => (
                <div key={index} className="flex items-center space-y-2 gap-1">
                  <div className="mt-1.5">
                    <Image
                      src={comm.userProfileUrl}
                      alt="profile_image"
                      width={40}
                      height={35}
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-gray-200 dark:bg-slate-800 h-auto sm:w-96 w-64 rounded-full px-6 flex items-center">
                    <p>
                      <span className="text-blue-600">
                        {comm.commentByName}
                      </span>
                      <span> {comm.comment}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogHeader>

        {/* COMMENT TEXT AREA AND BUTTON SECTION */}
        <div className="space-y-2">
          <Textarea
            placeholder="Comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="dark:bg-slate-800"
          />

          <Button
            onClick={() => {
              addComment({
                authCookie: authToken,
                comment,
                commentFor: postId,
                commentByName: useUserStore.getState().memberProfile[0].name!,
                commentByUserId: 0,
                id: 0,
                userProfileUrl:
                  useUserStore.getState().memberProfile[0].imageUrl!,
              });
              const isCommentAvailable = useUserStore
                .getState()
                .fetchComment.filter((comm) => comm.commentFor === postId);

              setCommentArray(isCommentAvailable);
              setComment("");
            }}
            className="w-full"
          >
            Comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfilePage({ cookie }: { cookie: string }) {
  const router = useRouter();
  if (useUserStore.getState().errorMessage === "No member found.") {
    router.push(`/member/dashboard/${useUserStore.getState().username}`);
  }

  const ids: any[] = useUserStore
    .getState()
    .postsCreatedByLogedinMember.map((post) => post.id);

  // is mobile or not
  const isMobile = useMobile()

  const params = useParams();
  const [loading, setLoadign] = useState(true);
  const { getProfile, fetchPosts, fetchLikes, manageLike, fetchComments } =
    useUserStore();

  // array of likes
  const [likeArray, setLikeArray] = useState<Like[]>([]);
  // array disliked
  const [dislikeArray, setDislikeArray] = useState<Dislike[]>([]);

  const getProfiledetails = async () => {
    setLoadign(true);
    await getProfile({
      authCookie: cookie,
      userName: params.username?.toString()!,
    });
    setLoadign(false);
  };

  useEffect(() => {
    getProfiledetails();
    fetchPosts({ authCookie: cookie });
    fetchLikes({ ids });
    fetchComments({ ids, authCookie: cookie });
  }, []);

  function GetLikeLengthAndCommentLength({ id }: { id: number }) {
    const findForLike = useUserStore
      .getState()
      .fetchLike.filter((like) => like.likeFor === id);
    const findComment = useUserStore
      .getState()
      .fetchComment.filter((comm) => comm.commentFor === id);

    return (
      <div className="flex items-center gap-2">
        {`${findForLike.length} likes ${findComment.length} comments`}
        <ChartNoAxesColumn className="text-red-400 hover:scale-125 transition-all hover:cursor-pointer" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <LoaderCircle color="#873636" className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {useUserStore.getState().memberProfile.length === 0 ? (
        <div className="flex justify-center min-h-[70vh]">
          <LoaderCircle color="#873636" className="animate-spin" />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[30vh] mt-10">
          <div>
            {/* Profile image section */}
            <div className="w-[250px] h-[250px] rounded-full overflow-hidden">
              <Image
                src={useUserStore.getState().memberProfile[0].imageUrl!}
                width={250}
                height={250}
                alt={useUserStore.getState().memberProfile[0].userName!}
                className="w-full h-full"
              />
            </div>
            {/* Profile details section */}
            <div className="mt-4">
              <div className="flex items-center justify-center">
                <p className="font-semibold text-3xl">
                  {useUserStore.getState().memberProfile[0].name}
                </p>
                <EditNameDialog
                  cookie={cookie}
                  currentName={useUserStore.getState().memberProfile[0].name!}
                />
              </div>
              <div className="flex items-center justify-center">
                <p className="font-semibold text-gray-300">
                  {useUserStore.getState().memberProfile[0].userName}
                </p>
                <EditUserNameDialog
                  cookie={cookie}
                  currentUserName={
                    useUserStore.getState().memberProfile[0].userName!
                  }
                />
              </div>

              <div>
                <CreatePost authToken={cookie} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* show posts */}
      <div className="flex flex-col items-center space-y-2">
        {useUserStore.getState().postsCreatedByLogedinMember.length > 0 &&
          useUserStore.getState().postsCreatedByLogedinMember.map((post) => (
            <div
              key={post.id!}
              className={isMobile ? "border w-[360px] px-4 rounded py-4 dark:bg-slate-900 shadow-lg" : "border w-[500px] px-4 rounded py-4 dark:bg-slate-900 shadow-lg"}
            >
              {/* show creator profile image,name and timestamp */}
              <div className="flex flex-row items-center gap-1">
                {/* creator image */}
                <div>
                  <Image
                    src={post.createImageUrl}
                    alt="creator_image"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                {/* name plus time */}
                <div>
                  <p className="text-sm font-semibold">{post.postCreator}</p>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="px-2 space-y-2">
                <div className="text-xl">
                  <p className="font-extralight">{post.textContent}</p>
                </div>
                <div>
                  {post.postImageUrl?.length! > 0 && (
                    <Image
                      src={post.postImageUrl!}
                      alt="post_image"
                      width={500}
                      height={500}
                      className="rounded"
                    />
                  )}
                </div>
              </div>

              <div className="justify-between flex mt-4 pl-2 border rounded-full h-10 items-center px-5 shadow-sm">
                <div className="">
                  {/* if already like available */}
                  {typeof post.likeBy === "number" ? (
                    <Heart
                      className={
                        dislikeArray.some((dislike) => dislike.id === post.id)
                          ? "text-red-400 hover:scale-125 hover:cursor-pointer transition-all"
                          : "fill-red-400 text-white hover:scale-125 hover:cursor-pointer transition-all"
                      }
                      onClick={async () => {
                        setDislikeArray((prev) => {
                          if (prev.some((dislike) => dislike.id === post.id)) {
                            // if exists only accept those, whose are not matched
                            return prev.filter(
                              (dislike) => dislike.id !== post.id
                            );
                          } else {
                            // add the new item/dislike
                            return [...prev, { id: post.id! }];
                          }
                        });

                        manageLike({
                          postId: post.id!,
                          userId: useUserStore.getState().fetchFor!,
                        });

                        try {
                          await axios.post(
                            `${NEXT_PUBLIC_BACKEND_URL}/member/post/like/manage`,
                            {
                              post: post.id,
                            },
                            {
                              headers: {
                                Authorization: cookie,
                              },
                            }
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    />
                  ) : (
                    <Heart
                      className={
                        likeArray.some((like) => like.id === post.id)
                          ? "fill-red-400 text-white hover:scale-125 hover:cursor-pointer transition-all"
                          : "text-red-400 hover:scale-125 hover:cursor-pointer transition-all"
                      }
                      onClick={async () => {
                        setLikeArray((prev) => {
                          // check if like exists
                          if (prev.some((like) => like.id === post.id)) {
                            // if exists only accept those, whose are not matched
                            return prev.filter((like) => like.id !== post.id);
                          } else {
                            // add the new item/like
                            return [...prev, { id: post.id! }];
                          }
                        });

                        manageLike({
                          postId: post.id!,
                          userId: useUserStore.getState().fetchFor!,
                        });

                        try {
                          await axios.post(
                            `${NEXT_PUBLIC_BACKEND_URL}/member/post/like/manage`,
                            {
                              post: post.id,
                            },
                            {
                              headers: {
                                Authorization: cookie,
                              },
                            }
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    />
                  )}
                </div>
                <div>
                  <AddComment authToken={cookie} postId={post.id!} />
                </div>
                <div>
                  <GetLikeLengthAndCommentLength id={post.id!} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
