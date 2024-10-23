// Updated VideoScreen Component
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
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [shareOption, setShareOption] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(true); // Initially disable the Next button
  const [commentSubmitted, setCommentSubmitted] = useState(false); // Track if the comment is submitted
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false); // Track if share dialog is open
  const [isShareSubmitted, setIsShareSubmitted] = useState(false); // Track if share is submitted

  // Create a ref for the video element
  const videoRef = useRef(null);
  const { dispatch } = useData();

  const handleReaction = (reaction) => {
    if (videoRef.current) {
      const timestamp = videoRef.current.currentTime;
      setSelectedEmoji(reaction);
      // Save emoji reaction data to the centralized state
      dispatch({
        type: "SET_DATA",
        key: `emojiReaction_${videoId}`,
        value: {
          reaction,
          videoId,
          timestamp,
        },
      });
    } else {
      console.error("Video element not found or not loaded yet.");
    }
  };

  const handleAddComment = () => {
    setOpen(true);
  };

  const handleSubmitComment = () => {
    const timestamp = new Date().toISOString();

    // Save comment and share option data to the centralized state
    dispatch({
      type: "SET_DATA",
      key: `comment_${videoId}`,
      value: {
        comment,
        shareOption,
        videoId,
        timestamp,
      },
    });
    setOpen(false);
    setCommentSubmitted(true); // Mark the comment as submitted
  };

  const handleCancelComment = () => {
    setOpen(false);
    // Do not mark comment as submitted if the dialog is simply closed
  };

  const handleNext = () => {
    const timestamp = new Date().toISOString();

    // Save next button click event to the centralized state
    dispatch({
      type: "SET_DATA",
      key: `nextClick_${videoId}`,
      value: {
        videoId,
        timestamp,
      },
    });

    if (onProceed && nextScreen) {
      onProceed(nextScreen);
    } else {
      console.error("onProceed or nextScreen is not defined.");
    }
  };

  const handleShareOptionChange = (value) => {
    setShareOption(value); // Update the shareOption when radio is selected
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);
  };

  const handleShareSubmit = () => {
    setIsShareDialogOpen(false);
    setIsShareSubmitted(true); // Mark the share as submitted
  };

  useEffect(() => {
    // Enable the Next button after 5 seconds
    const timer = setTimeout(() => {
      setIsNextDisabled(false);
    }, 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <VideoPlayer
        videoSrc={videoSrc}
        overlayText={overlayText}
        factInfo={factInfo}
        ref={videoRef}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Vertically center the items
          justifyContent: "center",
          gap: 2, // Add some space between the items
        }}
      >
        <EmojiReaction
          selectedEmoji={selectedEmoji}
          onReaction={handleReaction}
          interactive={true}
          emojiType={emojiType}
        />
        <CustomButton
          text={"Comment"}
          onClick={handleAddComment}
          startIcon={<AddCommentIcon />}
          disabled={commentSubmitted} // Disable button once comment is submitted
          fontSize="12px"
          fontWeight={400}
          padding="6px 12px"
        />
        <CustomButton
          text={"Share"}
          onClick={handleShareClick}
          startIcon={<ShareIcon />}
          disabled={isShareSubmitted} // Disable button once share is submitted
          fontSize="12px"
          fontWeight={400}
          padding="6px 12px"
        />
      </Box>

      <Modal
        open={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        aria-labelledby="share-modal-title"
        aria-describedby="share-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="share-modal-title" variant="h6" sx={{mb: 2}} gutterBottom>
            Would you normally share this video on your social media?
          </Typography>
          <RadioGroup
            sx={{mb: 2}}
            row
            value={shareOption}
            onChange={(e) => handleShareOptionChange(e.target.value)} // Corrected onChange handler
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <CustomButton
            text={"Submit"}
            onClick={handleShareSubmit}
            disabled={!shareOption} // Disable submit until an option is selected
          />
        </Box>
      </Modal>

      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Vertically center the items
          justifyContent: "center",
          gap: 2, // Add some space between the items
          marginTop: 8,
        }}
      >
        <CustomButton
          id="nextButton"
          text={"Next"}
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
          disabled={isNextDisabled} // Disable button based on state
        />
      </Box>

      <CommentDialog
        open={open}
        comment={comment}
        shareOption={shareOption}
        onClose={handleCancelComment} // Handle close without submission
        onCommentChange={setComment}
        onShareOptionChange={setShareOption}
        onSubmit={handleSubmitComment} // Handle actual submission
      />
    </Container>
  );
}

export default VideoScreen;
