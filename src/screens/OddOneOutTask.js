import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomButton from '../components/CustomButton';
import { useData } from '../contexts/DataContext';

/**
 * OddOneOutTask – enhanced to support two separate attention checks.
 *
 * New props:
 *  - checkId (number)            // e.g., 1 or 2; defaults to 1
 *  - onAttentionResult (func)    // callback with { checkId, passed, rt, startedAt, endedAt, choice }
 *
 * Data persistence:
 *  - Keeps your original flat dispatch pattern but namespaces keys with the checkId: odd_${checkId}_*
 *  - Also reports a concise summary via onAttentionResult so ScreenManager can postMessage & store
 */
const OddOneOutTask = ({ onProceed, nextScreen, checkId = 1, onAttentionResult }) => {
  const { dispatch } = useData();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [items, setItems] = useState([]);
  const [oddIndex, setOddIndex] = useState(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  // Generate items and record start time on mount
  useEffect(() => {
    const { items: generatedItems, oddIndex: generatedOddIndex } = generateItems();
    setItems(generatedItems);
    setOddIndex(generatedOddIndex);
    startTimeRef.current = new Date().toISOString();
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
    }
  };

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      setHasSubmitted(true);
      endTimeRef.current = new Date().toISOString();

      const isCorrect = selectedIndex === oddIndex;
      setFeedback(
        isCorrect
          ? 'Correct! You found the odd one out.'
          : 'Incorrect. Please pay closer attention next time.'
      );
    } else {
      setFeedback('Please select an item before submitting.');
      console.log('No item selected on submit.');
    }
  };

  const handleNext = () => {
    const nowIso = new Date().toISOString();

    // Compute RT (ms) if both timestamps exist
    const rtMs =
      startTimeRef.current && endTimeRef.current
        ? Math.max(
            0,
            new Date(endTimeRef.current).getTime() -
              new Date(startTimeRef.current).getTime()
          )
        : null;

    const isCorrect = selectedIndex === oddIndex;

    // 1) Build namespaced flat payload so it won't collide across two checks
    const taskData = {
      selectedIndex,
      oddIndex,
      startTime: startTimeRef.current,
      endTime: endTimeRef.current,
      rtMs,
      isCorrect,
      nextAt: nowIso,
      checkId,
    };

    const flatData = {};
    Object.entries(taskData).forEach(([field, value]) => {
      flatData[`odd_${checkId}_${field}`] = value;
    });

    // 2) Dispatch each key-value pair as a separate action
    Object.entries(flatData).forEach(([key, value]) => {
      dispatch({
        type: 'SET_DATA',
        key,
        value,
      });
    });

    // 3) Notify parent (ScreenManager) with a compact summary for unified logging/postMessage
    onAttentionResult?.({
      checkId,
      passed: isCorrect,
      rt: rtMs,
      startedAt: startTimeRef.current,
      endedAt: endTimeRef.current,
      choice: selectedIndex,
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
              userSelect: 'none',
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
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            marginTop: 12,
          }}
        >
          <CustomButton
            id="submitButton"
            text={'Submit'}
            onClick={handleSubmit}
            endIcon={<ArrowForwardIcon />}
            disabled={selectedIndex === null}
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
