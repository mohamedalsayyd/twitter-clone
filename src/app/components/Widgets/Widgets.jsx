"use client";
import { SearchIcon } from "@heroicons/react/outline";
import News from "../News/News";
import { useEffect, useState } from "react";

// Server-side function to fetch data
const fetchData = async () => {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );
  const newsResults = await res.json();
  return newsResults.articles;
};
const Widgets = () => {
  const [data, setData] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    fetchData().then((articles) => setData(articles));
  }, []);

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative ">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {data.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
