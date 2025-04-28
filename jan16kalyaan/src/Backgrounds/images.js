import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ImageGallery = () => {
  const [images, setImages] = useState([]); // Stores images from storage
  const [getImg, setGetimg] = useState([])
  const [selectedImage, setSelectedImage] = useState(null); // Selected image

  // Fetch images from backend or storage
  const nav = useNavigate()
  const image = async () => {
    const response = await fetch("http://localhost:5100/image")
    const result = await response.json()

    setGetimg(result)

    console.log(result);
  }
  // useEffect(() => {
  //   if (images) {
  //     // Convert byte array to a Base64 string
  //     const base64String = btoa(String.fromCharCode(...images));
  //     setGetimg(`data:image/jpeg;base64,${base64String}`);
  //   }
  // }, [images])

  // Handle save button
  const handleSave = async (name) => {
    localStorage.setItem("bg", `http://localhost:5100/uploads/${name}`)
    nav("/")
  };
 
  useEffect(() => {
    image()
    
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-6">Image Gallery</h2>
      <div className="w-[300px] h-full flex ">
        {
          getImg.map((name, id) => (
            <>
            <div>
              <img src={`http://localhost:5100/uploads/${name.name}`} alt="err" className="w-full h-full object-contain" />
              <button
                onClick={()=>handleSave(name.name)}
                className="px-6 py-2 bg-blue-600 text-black  font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Save Image
              </button>
              </div>
            </>
          ))
        }
      </div>
      {/* <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={`w-40 h-40 object-cover cursor-pointer rounded-lg border-2 ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div> */}


    </div>
  );
};

export default ImageGallery;
