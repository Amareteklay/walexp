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
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isShareSubmitted, setIsShareSubmitted] = useState(false);

  const videoRef = useRef(null);
  const { dispatch } = useData();

  const handleReaction = (reaction) => {
    if (videoRef.current) {
      const timestamp = videoRef.current.currentTime;
      setSelectedEmoji(reaction);

      // Dispatch emoji reaction with timestamp
      dispatch({
        type: "SET_DATA",
        key: `emojiReaction_${videoId}`,
        value: {
          reaction,
          videoId,
          timestamp,
        },
      });
    }
  };

  const handleAddComment = () => {
    setOpen(true);

    // Record timestamp for comment dialog open
    dispatch({
      type: "SET_DATA",
      key: `commentDialogOpenTimestamp_${videoId}`,
      value: new Date().toISOString(),
    });
  };

  const handleSubmitComment = () => {
    const timestamp = new Date().toISOString();
    console.log("Submitting comment:", comment, "Timestamp:", timestamp);
    // Dispatch comment data with timestamp
    dispatch({
      type: "SET_DATA",
      key: `comment_${videoId}`,
      value: {
        comment,
        videoId,
        timestamp,
      },
    });

    setOpen(false);
    setCommentSubmitted(true);
  };

  const handleCancelComment = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const timestamp = new Date().toISOString();

    // Dispatch Next button click timestamp
    dispatch({
      type: "SET_DATA",
      key: `nextClick_${videoId}`,
      value: timestamp,
    });

    if (onProceed && nextScreen) {
      onProceed(nextScreen);
    }
  };

  const handleShareOptionChange = (value) => {
    setShareOption(value);
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);

    // Record timestamp for share dialog open
    dispatch({
      type: "SET_DATA",
      key: `shareDialogOpenTimestamp_${videoId}`,
      value: new Date().toISOString(),
    });
  };

  const handleShareSubmit = () => {
    const timestamp = new Date().toISOString();
    setIsShareDialogOpen(false);
    setIsShareSubmitted(true);

    // Dispatch share submission with timestamp
    dispatch({
      type: "SET_DATA",
      key: `shareOption_${videoId}`,
      value: {
        shareOption,
        timestamp,
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNextDisabled(false);
    }, 5000);

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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
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
          disabled={commentSubmitted}
          fontSize="12px"
          fontWeight={400}
          padding="6px 12px"
        />
        <CustomButton
          text={"Share"}
          onClick={handleShareClick}
          startIcon={<ShareIcon />}
          disabled={isShareSubmitted}
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography id="share-modal-title" variant="h6" sx={{mb: 2}} gutterBottom>
            Would you normally share this video on your social media?
          </Typography>
          <RadioGroup row value={shareOption} onChange={(e) => handleShareOptionChange(e.target.value)} sx={{mb: 2}}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <CustomButton text={"Submit"} onClick={handleShareSubmit} disabled={!shareOption} />
        </Box>
      </Modal>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, marginTop: 8 }}>
        <CustomButton
          id="nextButton"
          text={"Next"}
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
          disabled={isNextDisabled}
        />
      </Box>

      <CommentDialog
        open={open}
        comment={comment}
        onClose={handleCancelComment}
        onCommentChange={setComment}
        onSubmit={handleSubmitComment}
      />
    </Container>
  );
}

export default VideoScreen;
