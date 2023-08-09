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

const Post = ({ post }) => {
  const toast = useToast();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      window.location = "/auth/signin";
    }
  };
  const deletePost = async () => {
    deleteDoc(doc(db, "posts", post.id));
    if (post.data().image) {
      deleteObject(ref(storage, `/posts/${post.id}/image`));
    }
  };

  const handleDeletePost = () => {
    toast({
      status: "warning",
      duration: null,
      isClosable: false,
      position: "top",
      render: () => (
        <Stack bg="twitter.200" p={4} borderRadius="3">
          <Text color="black" mb={2}>
            Are you sure you want to delete this post ?
          </Text>
          <HStack spacing={4} justifyContent="center">
            <Button
              colorScheme="red"
              fontWeight="bold"
              size="sm"
              onClick={() => {
                deletePost();
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
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* image */}
      <img
        src={post.data().userImg}
        alt={post.data().username}
        className="h-11 w-11 rounded-full mr-4"
      />
      {/* right side */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
              {post.data().name.replace(/[^a-zA-Z]/g, "")}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.data().username.replace(/[^a-zA-Z]/g, "")} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post.data().text}
        </p>
        {/* post image */}
        <img
          src={post.data().image}
          alt={post.data().username}
          className="rounded-2xl mr-2"
        />
        {/* icons  */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          {session?.user.uid === post?.data().id && (
            <TrashIcon
              onClick={() => handleDeletePost()}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm`}>
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;
