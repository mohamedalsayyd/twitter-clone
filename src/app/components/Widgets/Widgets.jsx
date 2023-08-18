"use client";
import { SearchIcon } from "@heroicons/react/outline";
import News from "../News/News";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Server-side function to fetch randomUsers data
const fetchRandomUsers = async () => {
  const res = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );
  const randomUsers = await res.json();
  return randomUsers.results;
};

const fetchNewsData = async () => {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );
  const newsResults = await res.json();
  return newsResults.articles;
};
const Widgets = () => {
  const [newsData, setNewsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [articleNum, setArticleNum] = useState(3);
  const [userNum, setUserNum] = useState(3);

  useEffect(() => {
    fetchNewsData().then((articles) => setNewsData(articles));
    fetchRandomUsers().then((user) => setUsersData(user));
  }, []);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8">
      <div className="w-[90%] xl:w-[100%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full  relative ">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[100%] ">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        <AnimatePresence>
          {newsData.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News key={article.title} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      <div className=" text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 mt-4 w-[90%] xl:w-[100%] ">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
          {usersData.slice(0, userNum).map((user) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key={user.login.username}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
            >
              <img
                src={user.picture.thumbnail}
                alt={user.login.username}
                width="40"
                className="rounded-full"
              />
              <div className="truncate ml-4 leading-5">
                <h4 className="font-bold hover:underline text-[14px] truncate">
                  {user.login.username}
                </h4>
                <h5 className="text-[13px] text-gray-500 truncate">
                  {user.name.first + " " + user.name.last}{" "}
                </h5>
              </div>
              <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
                Follow
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setUserNum(userNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
