import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import all question components
import FrequencyQuestion from "../components/questions/FrequencyQuestion";
import SocialMediaQuestion from "../components/questions/SocialMediaQuestion";
import MediaUseQuestion from "../components/questions/MediaUseQuestion";
import MediaTypeQuestion from "../components/questions/MediaTypeQuestion";
import PoliticalScaleQuestion from "../components/questions/PoliticalScaleQuestion";
import ValueRatingsQuestion from "../components/questions/ValueRatingsQuestion";
import StatementRatingsQuestion from "../components/questions/StatementRatingsQuestion";
import RankingQuestion from "../components/questions/RankingQuestion"
import GenderQuestion from "../components/questions/GenderQuestion";
import IncomeQuestion from "../components/questions/IncomeQuestion";
import AreaQuestion from "../components/questions/AreaQuestion";
import AgeQuestion from "../components/questions/AgeQuestion";
import EducationQuestion from "../components/questions/EducationQuestion";
import HouseholdCompositionQuestion from "../components/questions/HouseholdCompositionQuestion";

import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Survey({ onSubmit, onQuestionChange }) {
  const [selectedValues, setSelectedValues] = useState({
    socialMedia: [],
    frequency: "",
    mediaUse: [],
    mediaType: [],
    politicalScale: "",
    valueRatings: {
      "1. Social power": "",
      "2. Equality": "",
      "3. Respecting the Earth": "",
      "4. Enjoying life": "",
      "5. Wealth": "",
      "6. A world at peace": "",
      "7. Unity with nature": "",
      "8. Authority": "",
      "9. Pleasure": "",
      "10. Social justice": "",
      "11. Protecting the environment": "",
      "12. Influence": "",
      "13. Be helpful": "",
      "14. Prevent pollution": "",
      "15. Ambitious": "",
      "16. Gratification for oneself": ""
    },
    statementRatings: {},
    ranking: {},
    gender: "",
    income: "",
    area: "",
    age: "",
    education: "",
    adults: "",
    children: "",
  });

  const [pageIndex, setPageIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [allValuesAnswered, setAllValuesAnswered] = useState(false);
  const [allStatementsAnswered, setAllStatementsAnswered] = useState(false);
  const [rankingComplete, setRankingComplete] = useState(false); 
  const { dispatch } = useData();

  // Helper function to check if all values are answered
  const areAllValuesAnswered = (updatedValues) => {
    return Object.values(updatedValues).every((val) => val !== "");
  };

  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(pageIndex);
    }

    switch (pageIndex) {
      case 0:
        setIsAnswered(selectedValues.socialMedia.length > 0);
        break;
      case 1:
        setIsAnswered(selectedValues.frequency !== "");
        break;
      case 2:
        setIsAnswered(selectedValues.mediaUse.length > 0);
        break;
      case 3:
        setIsAnswered(selectedValues.mediaType.length > 0);
        break;
      case 4:
        setIsAnswered(selectedValues.politicalScale !== "");
        break;
      case 5:
        setIsAnswered(allValuesAnswered);
        break;
      case 6:
        setIsAnswered(allStatementsAnswered);
        break;
      case 7:
        setIsAnswered(rankingComplete); // Use rankingComplete to determine if answered
        break;
      case 8:
        setIsAnswered(selectedValues.gender !== "");
        break;
      case 9:
        setIsAnswered(selectedValues.income !== "");
        break;
      case 10:
        setIsAnswered(selectedValues.area !== "");
        break;
      case 11:
        setIsAnswered(selectedValues.age !== "");
        break;
      case 12:
        setIsAnswered(selectedValues.education !== "");
        break;
      case 13:
        setIsAnswered(selectedValues.adults !== "" || selectedValues.children !== "");
        break;
      default:
        setIsAnswered(false);
        break;
    }
  }, [pageIndex, onQuestionChange, selectedValues, allValuesAnswered, allStatementsAnswered, rankingComplete]);

  const handleNext = () => {
    if (isAnswered && pageIndex < questions.length - 1) {
      const currentTimestamp = new Date().toISOString();

      // Save the current question data and timestamp when Next is clicked
      const questionData = getQuestionDataForPage(pageIndex);

      dispatch({
        type: "SET_DATA",
        key: `surveyQuestion_${pageIndex}`,
        value: {
          questionData,
          timestamp: currentTimestamp,
        },
      });

      setIsAnswered(false);
      setPageIndex(pageIndex + 1);
    }
  };

  const getQuestionDataForPage = (pageIndex) => {
    switch (pageIndex) {
      case 0:
        return { socialMedia: selectedValues.socialMedia };
      case 1:
        return { frequency: selectedValues.frequency };
      case 2:
        return { mediaUse: selectedValues.mediaUse };
      case 3:
        return { mediaType: selectedValues.mediaType };
      case 4:
        return { politicalScale: selectedValues.politicalScale };
      case 5:
        return { valueRatings: selectedValues.valueRatings };
      case 6:
        return { statementRatings: selectedValues.statementRatings };
      case 7:
        return { gender: selectedValues.gender };
      case 8:
        return { income: selectedValues.income };
      case 9:
          return { income: selectedValues.income };
      case 10:
        return { area: selectedValues.area };
      case 11:
        return { age: selectedValues.age };
      case 12:
        return { education: selectedValues.education };
      case 13:
        return { adults: selectedValues.adults, children: selectedValues.children };
      default:
        return {};
    }
  };

  const handleRankChange = (factor, rank) => {
    setSelectedValues((prev) => ({
      ...prev,
      ranking: {
        ...prev.ranking,
        [factor]: rank,
      },
    }));
  }; 
  
  // Define a function to update rankingComplete based on RankingQuestion completion
  const handleRankingCompletion = (isComplete) => {
    setRankingComplete(isComplete);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      const currentTimestamp = new Date().toISOString();

      // Save the final collected data as a single object
      dispatch({
        type: "SET_DATA",
        key: "finalSurveyData",
        value: {
          ...selectedValues, // Capture all the final selectedValues at once
          timestamp: currentTimestamp,
        },
      });

      onSubmit(selectedValues);
    }

  };

  const handleRadioChange = (field, key, value) => {
    setSelectedValues((prev) => {
      let updatedRatings;
      if (field === "frequency") {
        return {
          ...prev,
          frequency: value,
        };
      }
      if (field === "politicalScale") {
        return {
          ...prev,
          politicalScale: value,
        };
      }
      if (field === "statementRatings") {
        updatedRatings = {
          ...prev.statementRatings,
          [key]: value,
        };
        setAllStatementsAnswered(areAllValuesAnswered(updatedRatings));
        return {
          ...prev,
          statementRatings: updatedRatings,
        };
      }
  
      if (field === "valueRatings") {
        updatedRatings = {
          ...prev.valueRatings,
          [key]: value,
        };
        setAllValuesAnswered(areAllValuesAnswered(updatedRatings));
        return {
          ...prev,
          valueRatings: updatedRatings,
        };
      }
      if (field === "gender") {
        return {
          ...prev,
          gender: value,
        };
      }
      if (field === "income") {
        return {
          ...prev,
          income: value,
        };
      }
      if (field === "area") {
        return {
          ...prev,
          area: value,
        };
      }
      if (field === "age") {
        return {
          ...prev,
          age: value,
        };
      }
      if (field === "education") {
        return {
          ...prev,
          education: value,
        };
      }
      if (field === "adults") {
        return {
          ...prev,
          adults: value,
        };
      }
      if (field === "children") {
        return {
          ...prev,
          children: value,
        };
      }
      return prev;
    });
    setIsAnswered(true);
  };

  const handleInputChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsAnswered(true);
  };

  const handleCheckboxChange = (field, updatedValues) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));

    dispatch({
      type: "SET_DATA",
      key: field,
      value: updatedValues,
    });

    setIsAnswered(true);
  };

  const questions = [
    <SocialMediaQuestion
      key="Q1"
      selectedValues={selectedValues.socialMedia}
      handleCheckboxChange={(updatedValues) =>
        handleCheckboxChange("socialMedia", updatedValues)
      }
      setNextEnabled={setIsAnswered}
    />, 
    <FrequencyQuestion
      key="Q2"
      selectedValue={selectedValues.frequency}
      handleRadioChange={(value) => handleRadioChange("frequency", null, value)}
    />, 
    <MediaUseQuestion
      key="Q3"
      selectedValues={selectedValues.mediaUse}
      handleCheckboxChange={(updatedValues) =>
        handleCheckboxChange("mediaUse", updatedValues)
      }
      setNextEnabled={setIsAnswered}
    />, 
    <MediaTypeQuestion
      key="Q4"
      selectedValues={selectedValues.mediaType}
      handleCheckboxChange={(updatedValues) =>
        handleCheckboxChange("mediaType", updatedValues)
      }
      setNextEnabled={setIsAnswered}
    />, 
    <PoliticalScaleQuestion
      key="Q5"
      selectedValue={selectedValues.politicalScale}
      handleRadioChange={(value) =>
        handleRadioChange("politicalScale", null, value)
      }
    />, 
    <ValueRatingsQuestion
      key="Q6"
      selectedValues={selectedValues.valueRatings}
  handleRadioChange={(key, value) => handleRadioChange("valueRatings", key, value)}
  setAllAnswered={setAllValuesAnswered}
    />, 
    <StatementRatingsQuestion
      key="Q7"
      selectedValues={selectedValues.statementRatings}
  handleRadioChange={(key, value) => handleRadioChange("statementRatings", key, value)}
  setAllAnswered={setAllStatementsAnswered}
    />, 
    <RankingQuestion
      key="Q8"
      selectedRanks={selectedValues.ranking}
      handleRankChange={handleRankChange}
      notifyCompletion={handleRankingCompletion} // Pass the completion handler to RankingQuestion
    />, 
    <GenderQuestion
      key="Q9"
      selectedValue={selectedValues.gender}
      handleRadioChange={(value) => handleRadioChange("gender", null, value)}
    />, 
    <IncomeQuestion
      key="Q10"
      selectedValue={selectedValues.income}
      handleRadioChange={(value) => handleRadioChange("income", null, value)}
    />, 
    <AreaQuestion
      key="Q11"
      selectedValue={selectedValues.area}
      handleRadioChange={(value) => handleRadioChange("area", null, value)}
    />, 
    <AgeQuestion
      key="Q12"
      selectedValue={selectedValues.age}
      handleInputChange={(value) => handleInputChange("age", value)}
    />, 
    <EducationQuestion
      key="Q13"
      selectedValue={selectedValues.education}
      handleRadioChange={(value) =>
        handleRadioChange("education", null, value)
      }
    />, 
    <HouseholdCompositionQuestion
      key="Q14"
      selectedValues={{
        adults: selectedValues.adults,
        children: selectedValues.children,
      }}
      handleInputChange={(field, value) => handleInputChange(field, value)}
    />,
  ];

  return (
    <Container>
      {questions[pageIndex]}

      {pageIndex < questions.length - 1 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            marginTop: 12,
          }}
        >
          <CustomButton
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
            text={"Next"}
            disabled={!isAnswered}
          />
        </Box>
      )}

      {pageIndex === questions.length - 1 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            marginTop: 12,
          }}
        >
          <CustomButton
            onClick={handleSubmit}
            text={"Submit"}
            disabled={!isAnswered}
          />
        </Box>
      )}
    </Container>
  );
}

export default Survey;
