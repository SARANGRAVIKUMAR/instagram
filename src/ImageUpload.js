import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    // to upload images

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    // to set progress bar

    uploadTask.on(
      //progress function
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },

      (error) => {
        // to cheack for error while uploading file

        console.log(error);
        alert(error.message);
      },
      () => {
        // function to get the download link for the image

        // in storage go to the ref images go to the images name  and get downlod url
        //images refers to the one in 18th line in upload images
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("post").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setImage("");
            setCaption("");
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUpload_progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="enter a caption...."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageUpload_button" onClick={handleUpload}>
        Upload file
      </Button>
    </div>
  );
};

export default ImageUpload;
