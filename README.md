# DP Generator

A sleek web app that lets you generate stylish display pictures (DPs) with custom overlays. Upload your photo, see a live preview, and download your personalized DP instantly. Built with **React**, **Next.js (App Router)**, and **Canvas API**.

---

## Features

- Upload any image to use as your DP.
- Live preview of the uploaded image.
- Automatic overlay with a base frame.
- Generate and download your DP in high-quality PNG format.
- Simple, responsive, and user-friendly interface.
- Easily extensible for multiple frames or badges.

---

## Demo

https://dp-gen-devfest.vercel.app/

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/IsraelIyke/dp-gen.git
cd dp-generator
````

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Click the file input to upload your image.
2. Preview your uploaded image in the live preview panel.
3. Click **Generate & Download DP** to create your final display picture.
4. The generated DP will download automatically as `devfest.png`.

---

## Project Structure

```
src/
├─ app/
│  ├─ page.js          # Main DP generator component
│  ├─ Components/
│  │  ├─ Nav.js        # Navigation
│  │  ├─ Hero.js       # Hero section
│  │  ├─ Timer.js      # Timer component
│  │  └─ Footer.js     # Footer section
├─ public/
│  ├─ Base.png          # Overlay frame for DP
```

* `canvasRef` is used to render images on a hidden canvas before exporting as PNG.
* Overlay logic is fully customizable—replace `Base.png` with your own frames.

---

## Future Improvements

* Multiple frame selection for different DP styles.
* Drag-and-drop positioning and scaling of uploaded images.
* Add badges, stickers, or text overlays.
* Automatic export for social media sizes (Instagram, WhatsApp, etc.).
* Dark/light mode toggle for the interface.

---

## Technologies Used

* **React 18** (with hooks)
* **Next.js App Router**
* **Canvas API**
* **TailwindCSS** for styling (optional)
