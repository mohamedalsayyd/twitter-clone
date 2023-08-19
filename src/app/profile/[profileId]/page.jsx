"use client";
import SideBar from "@/app/components/SideBar/SideBar";
import Widgets from "@/app/components/Widgets/Widgets";
import CommentModal from "@/app/components/Modal/CommentModal";
import PersonalProfile from "@/app/components/PersonalProfile/PersonalProfile";

const page = () => {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto ">
      {/* side bar */}
      <SideBar />
      {/* post */}
      <PersonalProfile />
      {/* widgets */}
      <Widgets />
      {/* Modal */}
      <CommentModal />
    </main>
  );
};

export default page;
