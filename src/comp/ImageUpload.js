import React from "react";
import { useState, useEffect } from 'react';
// import Box from '@material-ui/core/Box';
// import UploadService from "../services/file-upload.js";
import { storage } from '../firebase/config';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [url] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      handleUpload();
    }
  }, [selectedImage]);


  const handleUpload = () => {
    if (!selectedImage) {
        alert("Please upload an image first!");
    }

    // const storageRef = storage.ref();

  

    storage.ref(`/images/${selectedImage.name}`).put(selectedImage)
    .on("state_changed" , alert("success") , alert);

    var starsRef = storage.ref().child(`/images/${selectedImage.name}`);

    starsRef.getDownloadURL()
  .then((url) => {

    console.log(url);

 
   
  })
  .catch((error) => {
    // Handle any errors
  });



    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    // const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    // uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //         const percent = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );

    //         // update progress
    //         setPercent(percent);
    //     },
    //     (err) => console.log(err),
    //     () => {
    //         // download url
    //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //             console.log(url);
    //         });
    //     }
    // );
};
  //   constructor(props) {
  //     super(props);
  //     this.selectFile = this.selectFile.bind(this);
  //     this.upload = this.upload.bind(this);

  //     this.state = {
  //       currentFile: undefined,
  //       previewImage: undefined,
  //       progress: 0,
  //       message: "",

  //       imageInfos: [],
  //     };
  //   }

  //   componentDidMount() {
  //     UploadService.getFiles().then((response) => {
  //       this.setState({
  //         imageInfos: response.data,
  //       });
  //     });
  //   }

  //   selectFile(event) {
  //     this.setState({
  //       currentFile: event.target.files[0],
  //       previewImage: URL.createObjectURL(event.target.files[0]),
  //       progress: 0,
  //       message: ""
  //     });
  //   }

  //   fileSelectedHandler = event => {
  //       console.log(event.target.files[0]);
  //   }

  //   upload() {
  //     this.setState({
  //       progress: 0,
  //     });

  //     UploadService.upload(this.state.currentFile, (event) => {
  //       this.setState({
  //         progress: Math.round((100 * event.loaded) / event.total),
  //       });
  //     })
  //       .then((response) => {
  //         this.setState({
  //           message: response.data.message,
  //         });
  //         return UploadService.getFiles();
  //       })
  //       .then((files) => {
  //         this.setState({
  //           imageInfos: files.data,
  //         });
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           progress: 0,
  //           message: "Could not upload the image!",
  //           currentFile: undefined,
  //         });
  //       });
  //   }

  //   render() {
  // const {
  //   currentFile,
  //   previewImage,
  //   progress,
  //   message,
  //   imageInfos,
  // } = this.state;

  return (
    <>

      <label className="btn btn-primary">📸 Upload Video
        <input accept="/gif/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={e => setSelectedImage(e.target.files[0])} />
      </label>
      {/* <input
        accept="video/*,image/*"
        type="file"
        id="select-image"
        onChange={e => setSelectedImage(e.target.files[0])}
      /> */}
      <label htmlFor="select-image">
        <img></img>

        {/* <button className="btn-primary">Upload Video</button> */}

        {/* <Button variant="contained" color="primary" component="span">
          Upload Video
        </Button> */}
      </label>
      {imageUrl && selectedImage && (
        // <Box mt={2} textAlign="center">
        //   <div>Image Preview:</div>
        //   <img src={imageUrl} alt={selectedImage.name} height="100px" />
        // </Box>
        <div>
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </div>
      )}
    </>

  );
};

export default ImageUpload;
