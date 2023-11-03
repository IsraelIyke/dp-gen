"use client";
import React, { useState } from "react";
import { Footer, Form, Hero, Nav, Timer } from "./Components";

const DPGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const generateDP = () => {
    // Implement your image processing logic here if needed.

    // To make it downloadable, you can use the same code as before.
    // I'm using the example code for simplicity.

    const canvas = document.createElement("canvas");
    canvas.width = 3000;
    canvas.height = 4000;
    // Increase the height to accommodate the text

    const context = canvas.getContext("2d");

    const frameImage = new Image();
    frameImage.src = "/frame.png"; // Load your frame image
    frameImage.onload = () => {
      context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        context.drawImage(
          image,
          980,
          1000,
          canvas.width - 1900,
          canvas.height - 2550
        );

        // Add text below the image
        context.fillStyle = "black"; // Set text color
        context.font = "20px Arial"; // Set font style
        context.textAlign = "center";
        context.fillText("Will Be At", canvas.width / 2, canvas.height - 20);

        // To make it downloadable, you can use the same code as before.
        const dpDataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dpDataUrl;
        a.download = "profile_picture.png";
        a.click();
      };
    };
  };

  return (
    <div className="container">
      <Nav />
      <Hero />
      <Form />
      <div className="drag-main">
        <div className="drag-container">
          <div className="form-drag-drop">
            <p>Drag and drop to upload or</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Image"
                className="previewImage"
              />
            )}
          </div>
        </div>
      </div>

      <div className="form-info">Preferrably in a square resolution</div>

      <button className="form-button" onClick={generateDP}>
        Generate and Download DP
      </button>
      <Timer />
      <Footer />
    </div>
  );
};

export default DPGenerator;
