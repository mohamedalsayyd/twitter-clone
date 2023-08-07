"use client";
import { signIn } from "next-auth/react";
const page = () => {
  return (
    <div className="flex  justify-center mt-20 space-x-4">
      <img
        className="hidden md:inline-flex object-cover md:w-44 md:h-80"
        src="https://spy.family/wp-content/uploads/2022/12/ch12findtimelinepngtwimg1920.png"
        alt="twitter image phone"
      />
      <div className="">
        <div className="flex flex-col items-center">
          <img
            src="https://i.postimg.cc/qv06TWTg/371907030-TWITTER-ICON-TRANSPARENT-1080.gif"
            alt="twitter logo"
            className="w-36 object-cover "
          />
          <p className="text-center text-sm italic my-10">
            This app is created by Mohamed Alsayyd
          </p>
          <button
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            log in with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
