"use client";
import { useState, useRef } from "react";
import { Footer, Hero, Nav, Timer } from "./Components";
import "./globals.css";

export default function DPGenerator() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const generateAndDownloadDP = async () => {
    if (!previewUrl) return;

    setIsGenerating(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const userImg = new Image();
    userImg.src = previewUrl;

    const frameImg = new Image();
    frameImg.src = "/Base.png";

    await Promise.all([
      new Promise((res) => (userImg.onload = res)),
      new Promise((res) => (frameImg.onload = res)),
    ]);

    const SIZE = 800;
    canvas.width = SIZE;
    canvas.height = SIZE;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Draw user image
    ctx.drawImage(userImg, 0, 0, SIZE, SIZE);

    // Draw frame overlay
    ctx.drawImage(frameImg, 0, 0, SIZE, SIZE);

    const link = document.createElement("a");
    link.download = "generated-dp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    setIsGenerating(false);
  };

  return (
    <>
      <Nav />
      <Hero />

      <main className="dp-wrapper">
        <section className="dp-card">
          <h2>Create Your DP</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {previewUrl && (
            <div className="preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}

          <button
            disabled={!imageFile || isGenerating}
            onClick={generateAndDownloadDP}
          >
            {isGenerating ? "Generating..." : "Generate & Download"}
          </button>

          <p className="hint">
            Use a square image for best results.
          </p>
        </section>

        <canvas ref={canvasRef} hidden />
      </main>

      <Timer />
      <Footer />
    </>
  );
}
