import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import { Button, Input } from "@material-ui/core";
import firebase from "firebase";

const Post = ({ user, postId, imageUrl, username, caption }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("post")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("post").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1620571514293-f2178438e96d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />

        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt=" {username}" />
      <h4 className="post_text">
        <strong>{username}</strong>:{caption}
      </h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>:{comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <Input
            className="post_input"
            type="text"
            placeholder="add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            disabled={!comment}
            className="post_button"
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
};

export default Post;
