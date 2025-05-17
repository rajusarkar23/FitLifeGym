import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// POST TYPE
interface Post {
  id: number;
  textContent: string;
  postImageUrl: string;
  postBelongTo: number;
  postOwnerImageUrl: string;
  postCreatorImageUrl: string;
  postCreatorName: string;
  createdAt: string;
}
// MEMBER PROFILE TYPES
interface MemberProfile {
  imageUrl: string | null;
  userName: string | null;
  name: string | null;
  gender: string | null;
  profession: string | null;
  dob: string | null;
  memberId: number | null;
}
// COMMENT TYPES
interface PostComment {
  id: number;
  comment: string;
  commentFor: number;
  commentByName: string;
  commentByUserId: number;
  userProfileUrl: string;
}

// LIKES TYPE
interface Like {
  id: number;
  likeFor: number;
  likeBy: number;
}

// FINAL STORE TYPES
interface SpaceStore {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  //Post contents
  posts: Post[];
  postComments: PostComment[];
  memberProfile: MemberProfile[];
  likes: Like[];
  // fetch
  fetchPosts: ({ authCookie }: { authCookie: string }) => Promise<void>;
  // add comment
  addComment: ({
    authCookie,
    commentByName,
    commentFor,
    comment,
    commentByUserId,
    userProfileUrl,
    id,
  }: {
    authCookie: string;
    commentFor: number;
    comment: string;
    commentByName: string;
    commentByUserId: number;
    id: number;
    userProfileUrl: string;
  }) => Promise<void>;
  // fetch comments
  fetchComments: ({
    ids,
    authCookie,
  }: {
    ids: number[];
    authCookie: string;
  }) => Promise<void>;
  // get member profile
  getProfile: ({
    userName,
    authCookie,
  }: {
    userName: string;
    authCookie: string;
  }) => Promise<void>;
  // fetch likes
  fetchLikes: ({ ids }: { ids: number[] }) => Promise<void>;
  // manage likes
  manageLike: ({
    postId,
    userId,
    authCookie,
  }: {
    postId: number;
    userId: number;
    authCookie: string;
  }) => Promise<void>;
}
// STORE LOGICS
const useSpaceStore = create(
  persist<SpaceStore>(
    (set) => ({
      isLoading: false,
      isError: false,
      errorMessage: null,
      posts: [],
      postComments: [],
      memberProfile: [],
      likes: [],
      // fetch posts
      fetchPosts: async ({ authCookie }) => {
        set({ isLoading: true, isError: false, errorMessage: null, posts: [] });

        try {
          await axios
            .get(`${NEXT_PUBLIC_BACKEND_URL}/member/post/get-home-posts`, {
              headers: {
                Authorization: authCookie,
              },
            })
            .then((res) => {
              console.log(res.data);

              if (res.data.success) {
                set({
                  isLoading: false,
                  isError: false,
                  posts: res.data.posts,
                });
              } else {
                set({
                  isLoading: false,
                  isError: true,
                  errorMessage: res.data.message,
                });
              }
            })
            .catch((err) => {
              set({
                isLoading: false,
                isError: true,
                errorMessage: err.response.data.message,
              });
            });
        } catch (error) {
          console.log(error);
          set({
            isLoading: false,
            isError: true,
            errorMessage: "Something went wrong, try again",
          });
        }
      },
      // add comment
      addComment: async ({
        authCookie,
        commentFor,
        commentByName,
        commentByUserId,
        comment,
        id,
        userProfileUrl,
      }) => {
        //set comment to the local storage
        set((state) => {
          return {
            postComments: [
              ...state.postComments,
              {
                id,
                comment,
                commentFor,
                commentByName,
                commentByUserId,
                userProfileUrl,
              },
            ],
          };
        });
        // send backend req
        try {
          await axios.post(
            `${NEXT_PUBLIC_BACKEND_URL}/member/post/comment/add-comment`,
            {
              comment,
              userName: commentByName,
              commentFor,
            },
            {
              headers: {
                Authorization: authCookie,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      },
      // fetch comments
      fetchComments: async ({ ids, authCookie }) => {
        set({ postComments: [] });
        console.log(authCookie);

        try {
          await axios
            .post(
              `${NEXT_PUBLIC_BACKEND_URL}/member/post/comment/fetch-comments`,
              {
                ids,
              },
              {
                headers: {
                  Authorization: authCookie,
                },
              }
            )
            .then((res) => {
              if (res.data.success) {
                set({ postComments: res.data.comments });
              } else {
                set({ postComments: [] });
              }
            });
        } catch (error) {
          console.log(error);
        }
      },
      // get member profile
      getProfile: async ({ authCookie, userName }) => {
        set({
          isLoading: true,
          isError: false,
          errorMessage: null,
          memberProfile: [],
        });

        try {
          await axios
            .get(
              `${NEXT_PUBLIC_BACKEND_URL}/member/profile/get-profile?userName=${userName}`,
              {
                headers: {
                  Authorization: authCookie,
                },
              }
            )
            .then((response) => {
              if (response.data.success) {
                set({
                  memberProfile: response.data.memberProfile,
                  isLoading: false,
                });
              }
            })
            .catch((error) => {
              set({
                isError: true,
                memberProfile: [],
                errorMessage: error.response.data.message,
              });
            });
        } catch (error) {
          console.log(error);
          set({
            isError: true,
            memberProfile: [],
            errorMessage: "Something went wrong",
          });
        }
      },
      // fetclikes
      fetchLikes: async ({ ids }) => {
        set({ likes: [] });
        try {
          await axios
            .post(`${NEXT_PUBLIC_BACKEND_URL}/member/post/like/fetch`, {
              ids,
            })
            .then((res) => {
              set({ likes: res.data.likes });
            })
            .catch((err) => {
              console.log(err);
              set({ likes: [] });
            });
        } catch (error) {
          console.log(error);
          set({ likes: [] });
        }
      },
      // manage likes
      manageLike: async ({ postId, userId, authCookie }) => {
        // set the comment to state
        set((prev) => {
          const isLiked = prev.likes.some((like) => like.likeFor === postId);
          if (isLiked) {
            return {
              likes: prev.likes.filter((like) => like.likeFor !== postId),
            };
          } else {
            return {
              likes: [
                ...prev.likes,
                { id: 0, likeFor: postId, likeBy: userId },
              ],
            };
          }
        });
        // db call
        try {
          await axios.post(
            `${NEXT_PUBLIC_BACKEND_URL}/member/post/like/manage`,
            {
              post: postId,
            },
            {
              headers: {
                Authorization: authCookie,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    { name: "space-store" }
  )
);

export { useSpaceStore };
