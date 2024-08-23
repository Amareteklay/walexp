import React, { useState } from "react";
import VideoScreen from "./VideoScreen";
import { videoData } from "../data/videoData"; // Assuming videoData is in a separate file

function VideoSeriesScreen({ onProceed }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < videoData.length) {
      setCurrentVideoIndex(nextIndex);
    } else {
      // All videos watched, proceed to the next stage
      onProceed();
    }
  };

  return (
    <VideoScreen
      videoSrc={videoData[currentVideoIndex].video}
      overlayText={videoData[currentVideoIndex].texts} // Assuming texts is passed as a whole
      videoId={videoData[currentVideoIndex].videoId}
      onProceed={handleNextVideo}
      nextScreen={
        currentVideoIndex + 1 < videoData.length ? videoData[currentVideoIndex + 1].videoId : null
      }
    />
  );
}

export default VideoSeriesScreen;
