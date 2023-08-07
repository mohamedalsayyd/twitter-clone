import { SparklesIcon } from "@heroicons/react/outline";
import Input from "../Input/Input";
import Post from "../Post/Post";

const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "Mohamed Alsayyd",
      username: "mohamedalsayyd",
      userImg:
        "https://mohamed-alsayyd.vercel.app/_next/image?url=%2Fimgs%2FmyPic.png&w=1080&q=75",
      img: "https://images.unsplash.com/photo-1682687219640-b3f11f4b7234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      text: "nice view!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Mohamed Alsayyd",
      username: "mohamedalsayyd",
      userImg:
        "https://mohamed-alsayyd.vercel.app/_next/image?url=%2Fimgs%2FmyPic.png&w=1080&q=75",
      img: "https://plus.unsplash.com/premium_photo-1670537439541-d2eb20e1f6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      text: "amazing clock!",
      timestamp: "2 hours ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
