import "./post.css";
import {ThumbUp, Edit , Delete } from "@mui/icons-material";
// import { Users } from "../../dummyData";
import { useState } from "react";
import sarc from '../../assets/sarc_logo.png'
import moment from 'moment';


export default function Post({ post, handleEdit, handleDelete }) {


  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  const dateTimeAgo = moment(new Date(post?.updated)).fromNow();
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <img
              className="postProfileImg"
              src={sarc}
              alt=""
            />
            <span className="postUsername">
              Sarc,IIT Bombay
            </span>
            <span className="postUsername">
            <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
            </span>
            <span className="postDate">{dateTimeAgo}</span>
          </div>
          <div className="postTopRight">
            <Edit onClick={handleEdit} />
            <Delete onClick={handleDelete} />
          </div>
        </div>
        <div className="postCenter">
          <h1 className="postText">{post?.title}</h1>
          <span className="postText">{post?.content}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked?<ThumbUp htmlColor="blue" onClick={likeHandler}/> :<ThumbUp onClick={likeHandler}/>}
            {isLiked?<span className="postLikeCounter">Liked</span> :''}
            {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" /> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}