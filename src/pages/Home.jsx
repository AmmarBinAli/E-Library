import bg from "../assets/bg.jpg";
import bg1 from "../assets/bg_1.jpg";
import bg2 from "../assets/bg_2.jpg";
import bg3 from "../assets/bg_3.jpg";
import { useState, useEffect } from "react";

export default function Home() {
  const images = [bg, bg1, bg2, bg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome to E-Library
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Explore books, manage your library, and more!
        </p>
      </div>
    </div>
  );
}
