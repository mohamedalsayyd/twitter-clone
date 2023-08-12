"use client";

import Post from "@/app/components/Post/Post";
import SideBar from "@/app/components/SideBar/SideBar";
import Widgets from "@/app/components/Widgets/Widgets";

import { Modal } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import CommentModal from "@/app/components/Modal/CommentModal";

const page = ({ params }) => {
  const [post, setPost] = useState();
  const id = params.postId;
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
  }, [db, id]);
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto ">
      {/* side bar */}
      <SideBar />
      {/* post */}
      <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky space-x-2 top-0 z-50 bg-white border-b border-gray-200 items-center">
          <Link href={"/"} className="hoverEffect">
            <ArrowLeftIcon className="h-5  " />
          </Link>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        </div>
        <Post post={post} key={id} id={id} />
      </div>
      {/* widgets */}
      <Widgets />
      {/* Modal */}
      <CommentModal />
    </main>
  );
};

export default page;
