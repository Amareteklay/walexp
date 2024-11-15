import React, { useState, useEffect, useCallback } from "react";
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
import RankingQuestion from "../components/questions/RankingQuestion";
import GenderQuestion from "../components/questions/GenderQuestion";
import IncomeQuestion from "../components/questions/IncomeQuestion";
import AreaQuestion from "../components/questions/AreaQuestion";
import AgeQuestion from "../components/questions/AgeQuestion";
import EducationQuestion from "../components/questions/EducationQuestion";
import HouseholdCompositionQuestion from "../components/questions/HouseholdCompositionQuestion";

import CustomButton from "../components/CustomButton";

function Survey({ onSubmit, onQuestionChange }) {
  const [selectedValues, setSelectedValues] = useState({
    socialMedia: [],
    frequency: "",
    mediaUse: [],
    mediaType: [],
    politicalScale: "",
    valueRatings: {},
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
  const [currentPageVRQ, setCurrentPageVRQ] = useState(0);  // For ValueRatingsQuestion pagination
  const [currentPageSRQ, setCurrentPageSRQ] = useState(0); // State for StatementRatingsQuestion
  const [isAnswered, setIsAnswered] = useState(false);
  const [allValuesAnswered, setAllValuesAnswered] = useState(false);
  const [allStatementsAnswered, setAllStatementsAnswered] = useState(false);
  const [rankingComplete, setRankingComplete] = useState(false);
  const [totalPagesVRQ] = useState(Math.ceil(16 / 2));  // Assuming 2 items per page for ValueRatingsQuestion
  const totalStatements = 8; // Total statements

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
        setIsAnswered(rankingComplete);
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
    const isValueRatings = pageIndex === 5;
    const isStatementRatings = pageIndex === 6;

    if (isValueRatings && currentPageVRQ < totalPagesVRQ - 1) {
      setCurrentPageVRQ(currentPageVRQ + 1);
    } else if (isStatementRatings && currentPageSRQ < totalStatements - 1) {
      setCurrentPageSRQ(currentPageSRQ + 1);
    } else {
      setPageIndex(pageIndex + 1);
      setCurrentPageVRQ(0);
      setCurrentPageSRQ(0);
    }
    setIsAnswered(true); // Ensure button is enabled after page transition
  };



  const handleSubmit = () => {
    const finalTimestamp = new Date().toISOString();
    const surveyData = {
      ...selectedValues,
      submitTimestamp: finalTimestamp,
    };
console.log('Survey data', surveyData)
    // Send data to PsychoJS
    window.parent.postMessage(
      {
        type: "survey_complete",
        data: surveyData,
      },
      "*"
    );

    if (onSubmit) {
      onSubmit(surveyData);
    }
  };

  const handleRadioChange = useCallback((field, key, value) => {
    setSelectedValues((prev) => {
      let updatedRatings;
      switch (field) {
        case "frequency":
          return { ...prev, frequency: value };
        case "politicalScale":
          return { ...prev, politicalScale: value };
        case "statementRatings":
          updatedRatings = { ...prev.statementRatings, [key]: value };
          setAllStatementsAnswered(areAllValuesAnswered(updatedRatings));
          return { ...prev, statementRatings: updatedRatings };
        case "valueRatings":
          updatedRatings = { ...prev.valueRatings, [key]: value };
          setAllValuesAnswered(areAllValuesAnswered(updatedRatings));
          return { ...prev, valueRatings: updatedRatings };
        case "gender":
          return { ...prev, gender: value };
        case "income":
          return { ...prev, income: value };
        case "area":
          return { ...prev, area: value };
        case "age":
          return { ...prev, age: value };
        case "education":
          return { ...prev, education: value };
        case "adults":
          return { ...prev, adults: value };
        case "children":
          return { ...prev, children: value };
        default:
          return prev; // If no case matches, return previous state unchanged
      }
    });
    setIsAnswered(true);
  }, [setSelectedValues, setAllStatementsAnswered, setAllValuesAnswered]);
  

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
    currentPage={currentPageVRQ} 
    selectedValues={selectedValues.valueRatings} 
    handleRadioChange={handleRadioChange} 
    setAllAnswered={setAllValuesAnswered} />,
    <StatementRatingsQuestion
      key="Q7"
      currentPage={currentPageSRQ} 
      selectedValues={selectedValues.statementRatings}
      handleRadioChange={handleRadioChange}
      setAllAnswered={setAllStatementsAnswered}
    />,
    <RankingQuestion
      key="Q8"
      selectedRanks={selectedValues.ranking}
      handleRankChange={(factor, rank) => {
        setSelectedValues((prev) => ({
          ...prev,
          ranking: {
            ...prev.ranking,
            [factor]: rank,
          },
        }));
      }}
      notifyCompletion={(isComplete) => setRankingComplete(isComplete)}
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
      handleRadioChange={(value) => handleRadioChange("education", null, value)}
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
            marginTop: 8,
          }}
        >
          <CustomButton
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
            text={"Next"}
            disabled={!(pageIndex === 5 || pageIndex === 6 || isAnswered)}
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
            marginTop: 8,
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
