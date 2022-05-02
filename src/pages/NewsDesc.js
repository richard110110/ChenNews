import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';

function NewsDesc() {
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/newsitems/getnewsitembyid", {newsid: params.newsid});
      setLoading(false);
      setNewsItem(result.data)
    }catch (error) {
      console.error(error)
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  },[])
    const params = useParams()
  return (
    <Layout>
        {loading ? (<Spinner />) : (
          <div className="p-5">
          <h1 className="my-3 text-2xl font-semibold">{newsItem?.title}</h1>
          <hr />
            {newsItem!==null && ReactHtmlParser(draftToHtml(JSON.parse(newsItem?.content)))}
          </div>
        )}
    </Layout>
  )
}

export default NewsDesc