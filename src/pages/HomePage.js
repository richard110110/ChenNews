import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import {useNavigate} from "react-router-dom"

import { ToastContainer, toast } from "react-toastify";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/newsitems/getallnewsitems");
      toast("News got successfully", "success");

      setNewsItems(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="grid px-20 sm:px-5 mt-5">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-2 h-10 w-full border-gray-300 px-5"
          placeholder="search news"
        />
      </div>
      {newsItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 mx-20 my-5">
          {newsItems
            .filter((item) =>
              item.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((item) => {
              return (
                <div className="shadow-md p-3 border cursor-pointer" onClick={()=>navigate(`/newsdesc/${item._id}`)}>
                  <h1 className="text-[#141318bd] text-lg font-semibold">
                    {item.title}
                  </h1>
                  <p>{item.description}</p>
                  <div className="flex justify-end flex-col items-end">
                    <span className="text-gray-500 text-sm">
                      By: {item.postedBy.email}
                    </span>
                    <span className="text-gray-500 text-sm">
                      On: {item.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
