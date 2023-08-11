import Feed from "./components/Feed/Feed";
import Modal from "./components/Modal/CommentModal";
import SideBar from "./components/SideBar/SideBar";
import Widgets from "./components/Widgets/Widgets";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto ">
      {/* side bar */}
      <SideBar />
      {/* feed */}
      <Feed />
      {/* widgets */}
      <Widgets />
      {/* Modal */}
      <Modal />
    </main>
  );
}
