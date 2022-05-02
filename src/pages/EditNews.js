import React, { useState, useEffect } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToastContainer, toast } from 'react-toastify';

import { Editor } from "react-draft-wysiwyg";
import {useNavigate, useParams} from "react-router-dom"

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
// import { SpinnerCircular,SpinnerRoundOutlined } from 'spinners-react';

import axios from 'axios'

function EditNews() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState(null);
  const user = JSON.parse(localStorage.getItem('ChenNew-user'))
  const params = useParams()

  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  const navigate = useNavigate()

  const save=async()=>{
    setLoading(true)
    try{
      const payload ={
        title,
        description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        postedBy: {
          userid: user._id,
          email: user.email
        },
        newsid: params.newsid
      };

      await axios.post('/api/newsitems/editnewsitem', payload);
      setLoading(false)
      toast("News edited successfully", "success")
      //alert('news added successfully')
      navigate('/home')
    }catch(error){
      console.log(error)
      toast("something went wrong", "error")
      setLoading(false)
    }
  }
  const getData = async()=>{
    setLoading(true);
    try{
      const result = await axios.post('/api/newsitems/getnewsitembyid', {
        newsid: params.newsid,
      });
      console.log(result);
      setTitle(result.data.title)
      setDescription(result.data.description)
     setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.content))))
      //setNewsItems(result.data)

      setLoading(false);
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  };
  useEffect(() => {
    getData();
  },[])

  return (
    <Layout>
       {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">EditNews</h1>
      <div className="px-5 pt-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 w-full border-gray-300 my-2 px-5"
          name=""
          id=""
          rows="4"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="border-2 border-gray-300 mx-5 rounded px-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorClassName="draft-editor"
        />
      </div>
      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button className="px-5 py-2 bg-red-700 text-sm text-white" onClick={() => navigate('/home')}>Back</button>
        <button className="px-5 py-2 bg-green-500 text-sm text-white" onClick={save}>SAVE</button>
      </div>
    </Layout>
  );
}

export default EditNews;
