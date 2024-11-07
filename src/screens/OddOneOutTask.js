import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomButton from '../components/CustomButton';
import { useData } from '../contexts/DataContext'; // Ensuring useData is properly imported

const OddOneOutTask = ({ onProceed, nextScreen }) => {
  const { dispatch } = useData();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [items, setItems] = useState([]);
  const [oddIndex, setOddIndex] = useState(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const { items: generatedItems, oddIndex: generatedOddIndex } = generateItems();
    setItems(generatedItems);
    setOddIndex(generatedOddIndex);
    startTimeRef.current = new Date().toISOString();
    console.log('Component mounted. Items and odd index generated.', { generatedItems, generatedOddIndex });
  }, []);

  const generateItems = () => {
    const itemsArray = Array(9).fill('😊');
    const randomOddIndex = Math.floor(Math.random() * 9);
    itemsArray[randomOddIndex] = '😎';
    return { items: itemsArray, oddIndex: randomOddIndex };
  };

  const handleItemClick = (index) => {
    if (!hasSubmitted) {
      setSelectedIndex(index);
      console.log('Item clicked. Index:', index);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      setHasSubmitted(true);
      endTimeRef.current = new Date().toISOString();
      console.log('Submit clicked. Selected index and task end time recorded.', { selectedIndex, endTime: endTimeRef.current });

      const isCorrect = selectedIndex === oddIndex;
      setFeedback(isCorrect ? 'Correct! You found the odd one out.' : 'Incorrect. Please pay closer attention next time.');
      console.log('Feedback set:', feedback);
    } else {
      setFeedback('Please select an item before submitting.');
      console.log('No item selected on submit.');
    }
  };

  const handleNext = () => {
    const timestamp = new Date().toISOString();
    const taskData = {
      oddOneOutData: {
        selectedIndex,
        oddIndex,
        startTime: startTimeRef.current,
        endTime: endTimeRef.current,
        isCorrect: selectedIndex === oddIndex,
      },
      nextTimestamp: timestamp,
    };

    console.log('Next clicked. Dispatching data:', taskData);
    dispatch({
      type: 'SET_DATA',
      key: 'oddOneOutTaskData', // Unique key for each task completion
      value: taskData,
    });

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
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
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
