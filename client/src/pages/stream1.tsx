import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const Stream1: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Checking stream status...");
  const streamURL =
    "https://cdn.brid.tv/live/partners/25680/sd/https://new.ptvcrickethd.com/pak/media.stream/playlist.m3u8";

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamURL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsStreamActive(true);
        setErrorMessage("");
        video.play();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setIsStreamActive(false);
          setErrorMessage("Livestream Not Started or Ended");
        }
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamURL;
      video.addEventListener("loadedmetadata", () => {
        setIsStreamActive(true);
        setErrorMessage("");
      });
      video.addEventListener("error", () => {
        setIsStreamActive(false);
        setErrorMessage("Livestream Not Started or Ended");
      });
    } else {
      setErrorMessage("Your browser does not support HLS playback.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 w-full bg-[#111] shadow-md px-6 py-4 z-50">
        <div className="text-orange-500 text-2xl font-bold">Fresh Stream</div>
      </header>

      <div className="pt-24 flex flex-col items-center px-4">
        <h1 className="text-2xl mb-6">Live Football Stream</h1>

        <video
          ref={videoRef}
          controls
          autoPlay
          className={`w-full max-w-4xl border border-gray-700 rounded-lg ${
            isStreamActive ? "" : "hidden"
          }`}
        />

        {!isStreamActive && (
          <div className="text-orange-400 mt-6 text-lg">{errorMessage}</div>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 px-6 py-3 bg-[#111] border-2 border-orange-500 text-orange-500 text-base rounded-md hover:bg-[#222] transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Stream1;
