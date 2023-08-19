"use client";
import Image from "next/image";
import SideBarMenuItem from "../SideBarMenuItem/SideBarMenuItem";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon as DotsCircleHorizontalIconSolid,
} from "@heroicons/react/solid";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = (text) => {
    if (text === "profile") {
      router.push(`/profile/${session.user.uid}`);
    } else if (text === "home") {
      router.push(`/`);
    }
  };

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full ">
      {/* Logo */}
      <Link href="/" className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          src="https://i.postimg.cc/qv06TWTg/371907030-TWITTER-ICON-TRANSPARENT-1080.gif"
          width="50"
          height="50"
          alt="logo"
        />
      </Link>
      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SideBarMenuItem
          handleClick={() => handleClick("home")}
          text="Home"
          Icon={HomeIcon}
          active={`/`}
        />
        <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SideBarMenuItem
              handleClick={() => handleClick("profile")}
              active={`/profile/${session.user.uid}`}
              text="Profile"
              Icon={UserIcon}
            />
            <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIconSolid} />
          </>
        )}
      </div>
      {session ? (
        <>
          {/* Button */}
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>
          {/* Mini-profile */}

          <Popover>
            <PopoverTrigger>
              <button
                type="button"
                className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start fixed bottom-3"
              >
                <img
                  src={session.user.image}
                  alt="profile_img"
                  className="h-10 w-10 rounded-full xl:mr-2"
                />
                <div className="leading-5 hidden xl:inline">
                  <h4 className="font-bold">{session.user.name}</h4>
                  <p className="text-gray-500">
                    @{session.user.username.replace(/[^a-zA-Z]/g, "")}
                  </p>
                </div>
                <DotsCircleHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              boxShadow="2xl"
              p="6"
              rounded="md"
              bg="white"
              className="flex justify-center items-center w-64 h-11 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 "
            >
              <PopoverArrow />
              <PopoverBody>
                <Button
                  className="p-2 rounded-full text-white"
                  onClick={signOut}
                  bg="red.400"
                  color="white"
                >
                  Log out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <>
          <Link
            href="/auth/signin"
            className="bg-blue-400   text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:flex xl:justify-center items-center"
          >
            Sign in
          </Link>
        </>
      )}
    </div>
  );
};

export default SideBar;
