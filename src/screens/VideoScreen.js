import React, { useRef, useReducer, useState, useEffect } from "react";
import { 
  Container, Box, Typography, RadioGroup, FormControlLabel, Radio, Modal 
} from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import EmojiReaction from "../components/EmojiReaction";
import CommentDialog from "../components/CommentDialog";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

// Helper to generate a timestamp in ISO format
const getTimestamp = () => new Date().toISOString();

// Initial state for video data
const initialState = {
  emojiReaction: null,
  emojiReactionAt: null,
  comment: "",
  commentAt: null,
  commentDialogAt: null,
  shareOption: "",
  shareDialogAt: null,
  shareAt: null,
  nextAt: null,
};

// Reducer to update videoData state
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function VideoScreen({
  videoSrc,
  overlayText,
  videoId,
  onProceed,
  nextScreen,
  factInfo,
  emojiType,
}) {
  const [videoData, dispatchVideoData] = useReducer(reducer, initialState);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [shareSubmitted, setShareSubmitted] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isDelayPassed, setIsDelayPassed] = useState(false);
  const videoRef = useRef(null);
  const { dispatch } = useData();

  // Set of video IDs where commenting is enabled
  const commentEnabledVideoIds = new Set([
    "video0", "video2", "video5", "video7", "video10",
    "video12", "video15", "video17", "video20", "video22", "video25"
  ]);
  const showCommentButton = commentEnabledVideoIds.has(videoId);

  // --- Handlers ---
  
  const handleReaction = (reaction) => {
    dispatchVideoData({ type: "SET_FIELD", field: "emojiReaction", value: reaction });
    
    if (videoRef.current) {
      const currentTime = getTimestamp();
      dispatchVideoData({ type: "SET_FIELD", field: "emojiReactionAt", value: currentTime });
    } else {
      console.log("videoRef.current is null");
    }
  };
  
  // Open comment dialog and record when it was opened.
  const handleAddComment = () => {
    setCommentDialogOpen(true);
    dispatchVideoData({ type: "SET_FIELD", field: "commentDialogAt", value: getTimestamp() });
  };

  // Handle comment submission: record the timestamp and close the dialog.
  const handleSubmitComment = () => {
    dispatchVideoData({ type: "SET_FIELD", field: "commentAt", value: getTimestamp() });
    setCommentSubmitted(true);
    setCommentDialogOpen(false);
  };

  // Open share dialog and record when it was opened.
  const handleShareClick = () => {
    setShareDialogOpen(true);
    dispatchVideoData({ type: "SET_FIELD", field: "shareDialogAt", value: getTimestamp() });
  };

  // Handle share option submission: record the timestamp and close the dialog.
  const handleShareSubmit = () => {
    dispatchVideoData({ type: "SET_FIELD", field: "shareAt", value: getTimestamp() });
    setShareSubmitted(true);
    setShareDialogOpen(false);
  };

  // Update share option when the user selects a radio button.
  const handleShareOptionChange = (event) => {
    dispatchVideoData({ type: "SET_FIELD", field: "shareOption", value: event.target.value });
  };

  // Finalize and dispatch the video data when Next is clicked.
  const handleNext = () => {
    // Create a final copy of videoData including the next timestamp.
    const newNextTimestamp = getTimestamp();
    const finalData = { ...videoData, nextAt: newNextTimestamp };

    // Flatten the finalData: for each property, create a key like "videoId_field".
    const flatData = {};
    Object.entries(finalData).forEach(([field, value]) => {
      flatData[`${videoId}_${field}`] = value;
    });

    // Dispatch each key-value pair as a separate action.
    Object.entries(flatData).forEach(([key, value]) => {
      dispatch({
        type: "SET_DATA",
        key,
        value,
      });
    });

    if (onProceed && nextScreen) {
      onProceed(nextScreen);
    }
  };

  // Enable the Next button only after a 10-second delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayPassed(true);
    }, 10000);
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
          selectedEmoji={videoData.emojiReaction}
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
        <Box sx={{ position: "absolute", top: "50%", left: "50%", 
                   transform: "translate(-50%, -50%)", width: 400, 
                   bgcolor: "background.paper", p: 4 }}>
          <Typography variant="h6">
            Would you share this video on social media?
          </Typography>
          <RadioGroup row value={videoData.shareOption} onChange={handleShareOptionChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="don't know" control={<Radio />} label="Don't know" />
          </RadioGroup>
          <CustomButton 
            text={"Submit"} 
            onClick={handleShareSubmit} 
            disabled={!videoData.shareOption} 
          />
        </Box>
      </Modal>

      {/* Next Button */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", 
                 gap: 2, marginTop: 8 }}>
        <CustomButton 
          id="nextButton" 
          text={"Next"} 
          onClick={handleNext} 
          endIcon={<ArrowForwardIcon />} 
          disabled={!isDelayPassed || !videoData.emojiReaction} 
        />
      </Box>

      {/* Comment Dialog */}
      <CommentDialog
        open={commentDialogOpen}
        comment={videoData.comment}
        onClose={() => setCommentDialogOpen(false)}
        onCommentChange={(text) => 
          dispatchVideoData({ type: "SET_FIELD", field: "comment", value: text })
        }
        onSubmit={handleSubmitComment}
      />
    </Container>
  );
}

export default VideoScreen;
