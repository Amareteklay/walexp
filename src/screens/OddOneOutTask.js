import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomButton from '../components/CustomButton';

const OddOneOutTask = ({ onProceed, nextScreen }) => {
  // State variables
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [items, setItems] = useState([]);
  const [oddIndex, setOddIndex] = useState(null);

  // Refs for timing
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  // Generate items when the component mounts
  useEffect(() => {
    const { items: generatedItems, oddIndex: generatedOddIndex } = generateItems();
    setItems(generatedItems);
    setOddIndex(generatedOddIndex);

    // Record the start time
    startTimeRef.current = new Date().toISOString();
  }, []);

  // Generate items for the grid
  const generateItems = () => {
    const itemsArray = Array(9).fill('😊'); // Fill the array with identical emojis
    const randomOddIndex = Math.floor(Math.random() * 9); // Random index for the odd item
    itemsArray[randomOddIndex] = '😎'; // Set the odd item
    return { items: itemsArray, oddIndex: randomOddIndex };
  };

  // Handle item click
  const handleItemClick = (index) => {
    if (!hasSubmitted) {
      setSelectedIndex(index);
    }
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedIndex !== null) {
      setHasSubmitted(true);
      endTimeRef.current = new Date().toISOString(); // Record end time

      const isCorrect = selectedIndex === oddIndex;

      // Send data to PsychoJS
      window.parent.postMessage(
        {
          type: 'odd_one_out_result',
          selectedIndex,
          oddIndex,
          isCorrect,
          startTime: startTimeRef.current,
          endTime: endTimeRef.current,
        },
        '*'
      );

      if (isCorrect) {
        setFeedback('Correct! You found the odd one out.');
      } else {
        setFeedback('Incorrect. Please pay closer attention next time.');
      }
    } else {
      setFeedback('Please select an item before submitting.');
    }
  };

  // Proceed to the next part of your platform
  const handleNext = () => {
    const timestamp = new Date().toISOString();

    // Send next button click event to PsychoJS
    window.parent.postMessage({ type: 'next_click', task: 'odd_one_out', timestamp }, '*');

    if (onProceed && nextScreen) {
      onProceed(nextScreen);
    } else {
      console.error('onProceed or nextScreen is not defined.');
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4">Find the Odd One Out</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please find and click on the item that is different from the others.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 80px)',
          gridGap: '10px',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleItemClick(index)}
            sx={{
              fontSize: '2em',
              padding: '10px',
              border: selectedIndex === index ? '2px solid blue' : '1px solid gray',
              borderRadius: '5px',
              cursor: hasSubmitted ? 'default' : 'pointer',
              backgroundColor: hasSubmitted
                ? index === oddIndex
                  ? '#d4edda' // Green background for the correct answer
                  : selectedIndex === index
                  ? '#f8d7da' // Red background for the selected wrong answer
                  : 'transparent'
                : 'transparent',
              textAlign: 'center',
            }}
          >
            {item}
          </Box>
        ))}
      </Box>

      {!hasSubmitted && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center', // Vertically center the items
            justifyContent: 'center',
            gap: 2, // Add some space between the items
            marginTop: 12,
          }}
        >
          <CustomButton
            id="submitButton"
            text={'Submit'}
            onClick={handleSubmit}
            endIcon={<ArrowForwardIcon />}
            disabled={selectedIndex === null} // Disable button until an item is selected
          />
        </Box>
      )}

      {feedback && (
        <Box
          sx={{
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          <Typography variant="h6">{feedback}</Typography>
          {hasSubmitted && (
            <Box sx={{ alignItems: 'center', // Vertically center the items
              justifyContent: 'center',
              gap: 2, // Add some space between the items
              marginTop: 8,
              marginLeft: "48%" }}>
              <CustomButton
                id="nextButton"
                text={'Next'}
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
              />
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default OddOneOutTask;
