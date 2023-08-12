"use client";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../../../atom/modalAtom";
import Modal from "react-modal";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);
  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comment"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  };
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          // solve the console error
          ariaHideApp={false}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white z-50 border-2 rounded-xl shadow-md focus-visible:border-none"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-9 h-9 flex items-center justify-center"
              >
                <XIcon className="h-[22px] text-gray-700 " />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-200"></span>
              {/* image */}
              <img
                src={post?.data()?.userImg}
                alt={post.data()?.username}
                className="h-11 w-11 rounded-full mr-4"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
                {post.data()?.name.replace(/[^a-zA-Z]/g, "")}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post.data()?.username.replace(/[^a-zA-Z]/g, "")} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] ">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex p-3 space-x-3 ">
              <img
                src={session.user.image}
                alt="user_img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div>
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-600 tracking-wide min-h-[50px] text-gray-700"
                    rows="2"
                    placeholder="Write your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        key={selectedFile}
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> */}
                    </div>
                    {/* <EmojiPicker className="absolute" /> */}
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim("")}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95 "
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
