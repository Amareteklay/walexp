import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";

function Welcome({ onStart }) {
  // State to hold the group assignment
  const [groupAssignment, setGroupAssignment] = useState({
    framingType: null,
    emojiType: null,
  });

  // Use effect to listen for messages from the parent window (PsychoJS)
  useEffect(() => {
    // Event listener function to handle incoming messages
    function handleMessage(event) {
      // Ensure the message is from the expected origin
      //if (event.origin !== 'https://run.pavlovia.org') return;

      // Check for group assignment data in the message
      if (event.data.type === 'group_assignment') {
        setGroupAssignment({
          framingType: event.data.framingType,
          emojiType: event.data.emojiType,
        });
        console.log('Group Assignment received:', event.data);
      }
    }

    // Add the event listener
    window.addEventListener('message', handleMessage);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Welcome!
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
        You will be asked to complete a series of tasks. For each task, you will
        see instructions to guide you.
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
        Please read the instructions carefully.
      </Typography>

      {/* Display the assigned group values for testing */}
      {groupAssignment.framingType && groupAssignment.emojiType && (
        <div>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", padding: 2, color: "green" }}
            gutterBottom
          >
            Assigned Group:
          </Typography>
          <Typography variant="body1" sx={{ padding: 2 }}>
            <strong>Framing Type:</strong> {groupAssignment.framingType}
          </Typography>
          <Typography variant="body1" sx={{ padding: 2 }}>
            <strong>Emoji Type:</strong> {groupAssignment.emojiType}
          </Typography>
        </div>
      )}

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2, marginBottom: 12 }}
        gutterBottom
      >
        When you're ready, click 'Continue'.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={() => onStart("audioCheck")}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default Welcome;
