"use client";
import { SparklesIcon } from "@heroicons/react/outline";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import PersonalPost from "../PersonalPost/PersonalPost";
const PersonalProfile = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);
  const id = useParams();
  const profileId = id.profileId;
  const { data: session } = useSession();
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Profile</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <div>
        <div className="z-[-1] bg-sky-600 ">
          {session && (
            <img
              className="h-[260px] m-auto"
              src="https://i.postimg.cc/xTQSnvcx/ceecaefa-3778-4b77-9d41-b0e0fdcd54d7.jpg"
              alt={`bg-img for ${session.user.name}`}
            />
          )}
        </div>
        <div className="-mt-8 flex justify-between w-[90%] m-auto">
          {session && (
            <>
              <img
                src={session.user.image}
                alt={session.user.name}
                className="rounded-full hover:brightness-95 cursor-pointer"
              />
              <div className="flex items-center mt-3">
                <button className="rounded-full border border-gray-600 px-2 py-1">
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
        <AnimatePresence>
          {posts.map((post) => {
            const postData = post.data();
            console.log(postData);
            return (
              postData.id === profileId && (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <PersonalPost key={post.id} id={post.id} post={post} />
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PersonalProfile;
