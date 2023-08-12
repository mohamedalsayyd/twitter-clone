"use client";
import {
  ChartBarIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import { db, storage } from "../../../../firebase";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useToast, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../../../atom/modalAtom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Comment = ({ comment, commentId, oraginalPostId }) => {
  const toast = useToast();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", oraginalPostId, "comment", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, oraginalPostId, commentId]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likeComment = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            oraginalPostId,
            "comment",
            commentId,
            "likes",
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            oraginalPostId,
            "comment",
            commentId,
            "likes",
            session?.user.uid
          ),
          {
            username: session.user.username,
          }
        );
      }
    } else {
      window.location = "/auth/signin";
    }
  };
  const deleteCommet = async () => {
    deleteDoc(doc(db, "posts", oraginalPostId, "comment", commentId));
  };

  const handleDeleteComment = () => {
    toast({
      status: "warning",
      duration: null,
      isClosable: false,
      position: "top",
      render: () => (
        <Stack bg="twitter.200" p={4} borderRadius="3">
          <Text color="black" mb={2}>
            Are you sure you want to delete this comment ?
          </Text>
          <HStack spacing={4} justifyContent="center">
            <Button
              colorScheme="red"
              fontWeight="bold"
              size="sm"
              onClick={() => {
                deleteCommet();
                toast.closeAll();
              }}
            >
              Yes
            </Button>
            <Button
              size="sm"
              bg="black"
              color="white"
              onClick={() => toast.closeAll()}
            >
              No
            </Button>
          </HStack>
        </Stack>
      ),
    });
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-[50px]">
      {/* image */}
      <img
        src={comment?.userImg}
        alt={comment?.username}
        className="h-11 w-11 rounded-full mr-4"
      />
      {/* right side */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
              {comment?.name.replace(/[^a-zA-Z]/g, "")}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{comment?.username.replace(/[^a-zA-Z]/g, "")} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] ">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* post text */}

        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {comment?.comment}
        </p>

        {/* icons  */}
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center">
            <ChatIcon
              onClick={() => {
                setPostId(oraginalPostId);
                session ? setOpen(!open) : (window.location = "/auth/signin");
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
          </div>
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likeComment}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likeComment}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm`}>
                {likes.length}
              </span>
            )}
          </div>
          {session?.user.uid === comment?.uid && (
            <TrashIcon
              onClick={() => handleDeleteComment()}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
