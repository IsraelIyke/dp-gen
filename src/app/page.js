"use client";
import React, { useState, useRef } from "react";
import { Footer, Form, Hero, Nav, Timer } from "./Components";

const DPGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState("");
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const generateDP = () => {
    if (!selectedImage || !user) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // High-resolution export
    canvas.width = 3000;
    canvas.height = 4000;

    const frameImage = new Image();
    frameImage.src = "/frame2.png";

    frameImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

      const image = new Image();
      image.src = selectedImage;

      image.onload = () => {
        // User image placement
        ctx.drawImage(
          image,
          980,
          1000,
          canvas.width - 1900,
          canvas.height - 2950
        );

        // Text
        ctx.fillStyle = "#000";
        ctx.font = "bold 100px Arial";
        ctx.textAlign = "left";
        ctx.fillText(user, 1400, 2200);

        const dpDataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dpDataUrl;
        a.download = "devfest.png";
        a.click();
      };
    };
  };

  return (
    <div className="container">
      <Nav />
      <Hero />

      <main className="dp-main">
        <form className="form-container" onSubmit={(e) => e.preventDefault()}>
          <h3>
            <b>Customise your Devfest DP</b>
          </h3>

          <label>Name</label>
          <input
            className="form-name"
            value={user}
            placeholder="Your name"
            onChange={(e) => setUser(e.target.value)}
          />
          <div className="form-info">
            Nickname, first name, how you want it
          </div>

          <label>Insert your picture</label>

          <div className="drag-main">
            <div className="drag-container">
              <div className="form-drag-drop">
                <p>Drag and drop to upload or</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="previewImage"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="form-info">
            Preferably in a square resolution
          </div>

          <button
            type="button"
            className="form-button"
            disabled={!selectedImage || !user}
            onClick={generateDP}
          >
            Generate and Download DP
          </button>
        </form>
      </main>

      <canvas ref={canvasRef} hidden />
      <Timer />
      <Footer />
    </div>
  );
};

export default DPGenerator;
