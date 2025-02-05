import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Typography, RadioGroup, FormControlLabel, Radio, Modal } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import EmojiReaction from "../components/EmojiReaction";
import CommentDialog from "../components/CommentDialog";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function VideoScreen({
  videoSrc,
  overlayText,
  videoId,
  onProceed,
  nextScreen,
  factInfo,
  emojiType,
}) {
  const [videoData, setVideoData] = useState({
    emojiReaction_reaction: null,
    emojiReaction_timestamp: null,
    comment: "",
    commentTimestamp: null,
    commentDialogTimestamp: null,
    shareOption: "",
    shareDialogTimestamp: null,
    shareTimestamp: null,
    nextTimestamp: null,
  });

  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [shareSubmitted, setShareSubmitted] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const videoRef = useRef(null);
  const { dispatch } = useData();

  const commentEnabledVideoIds = new Set(["video00", "video2", "video5", "video7", "video10", "video12", "video15", "video17", "video20", "video22", "video25"]);

  const showCommentButton = commentEnabledVideoIds.has(videoId);

  // Handle emoji reaction click
  const handleReaction = (reaction) => {
    if (videoRef.current) {
      const timestamp = videoRef.current.currentTime;

      // Store emoji reaction and timestamp separately
      setVideoData((prevData) => ({
        ...prevData,
        emojiReaction_reaction: reaction,
        emojiReaction_timestamp: timestamp,
      }));
    }
  };

  // Open and log the comment dialog
  const handleAddComment = () => {
    setCommentDialogOpen(true);
    setVideoData(prevData => ({
      ...prevData,
      commentDialogTimestamp: new Date().toISOString(),
    }));
  };

  // Handle comment submission
  const handleSubmitComment = () => {
    const timestamp = new Date().toISOString();
    setVideoData(prevData => ({
      ...prevData,
      commentTimestamp: timestamp,
    }));
    setCommentSubmitted(true);
    setCommentDialogOpen(false);
  };

  // Open and log the share dialog
  const handleShareClick = () => {
    setShareDialogOpen(true);
    setVideoData(prevData => ({
      ...prevData,
      shareDialogTimestamp: new Date().toISOString(),
    }));
  };

  // Handle share option selection and submission
  const handleShareSubmit = () => {
    const timestamp = new Date().toISOString();
    setVideoData(prevData => ({
      ...prevData,
      shareTimestamp: timestamp,
    }));
    setShareSubmitted(true);
    setShareDialogOpen(false);
  };

  const handleShareOptionChange = (event) => {
    setVideoData(prevData => ({
      ...prevData,
      shareOption: event.target.value,
    }));
  };

  // Finalize and dispatch video data on Next
  const handleNext = () => {
    const timestamp = new Date().toISOString();
    setVideoData(prevData => {
      const newData = { ...prevData, nextTimestamp: timestamp };
      console.log("Next timestamp", timestamp);  // Log the new timestamp immediately
  
      dispatch({
        type: "SET_DATA",
        key: `videoData_${videoId}`,
        value: newData,
      });
  
      if (onProceed && nextScreen) {
        onProceed(nextScreen);
      }
  
      return newData;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNextDisabled(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <VideoPlayer videoSrc={videoSrc} overlayText={overlayText} factInfo={factInfo} ref={videoRef} />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <EmojiReaction
          selectedEmoji={videoData.emojiReaction_reaction}
          onReaction={handleReaction}
          interactive={true}
          emojiType={emojiType}
        />
        {showCommentButton && (
          <CustomButton
            text={"Comment"}
            onClick={handleAddComment}
            startIcon={<AddCommentIcon />}
            disabled={commentSubmitted}
            fontSize="12px"
            fontWeight={400}
            padding="6px 12px"
          />
        )}
        <CustomButton
          text={"Share"}
          onClick={handleShareClick}
          startIcon={<ShareIcon />}
          disabled={shareSubmitted}
          fontSize="12px"
          fontWeight={400}
          padding="6px 12px"
        />
      </Box>

      {/* Share Dialog */}
      <Modal open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
          <Typography variant="h6">Would you share this video on social media?</Typography>
          <RadioGroup row value={videoData.shareOption} onChange={handleShareOptionChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="don't know" control={<Radio />} label="Don't know" />
          </RadioGroup>
          <CustomButton text={"Submit"} onClick={handleShareSubmit} disabled={!videoData.shareOption} />
        </Box>
      </Modal>

      {/* Next Button */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, marginTop: 8 }}>
        <CustomButton id="nextButton" text={"Next"} onClick={handleNext} endIcon={<ArrowForwardIcon />} disabled={isNextDisabled} />
      </Box>

      {/* Comment Dialog */}
      <CommentDialog
        open={commentDialogOpen}
        comment={videoData.comment}
        onClose={() => setCommentDialogOpen(false)}
        onCommentChange={(text) => setVideoData(prevData => ({ ...prevData, comment: text }))}
        onSubmit={handleSubmitComment}
      />
    </Container>
  );
}

export default VideoScreen;
