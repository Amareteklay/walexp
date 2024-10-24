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
      "1. Living in secure surroundings": "",
      "2. Being successful and influencing others": "",
      "3. Freedom of choice and opportunities": "",
      "4. Being loyal to friends and family": "",
      "5. Protecting the environment": "",
    },
    statementRatings: {},
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
  const { dispatch } = useData();

  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(pageIndex);
    }

    // Determine if the current question has been answered
    switch (pageIndex) {
      case 0: // SocialMediaQuestion index
        setIsAnswered(selectedValues.socialMedia.length > 0);
        break;
      case 1: // FrequencyQuestion index
        setIsAnswered(selectedValues.frequency !== "");
        break;
      case 2: // MediaUseQuestion index
        setIsAnswered(selectedValues.mediaUse.length > 0);
        break;
      case 3: // MediaTypeQuestion index
        setIsAnswered(selectedValues.mediaType.length > 0);
        break;
      case 4: // PoliticalScaleQuestion index
        setIsAnswered(selectedValues.politicalScale !== "");
        break;
      case 5: // ValueRatingsQuestion index
        setIsAnswered(
          Object.values(selectedValues.valueRatings).every((val) => val !== "")
        );
        break;
        case 6: // StatementRatingsQuestion index
        setIsAnswered(
          Object.keys(selectedValues.statementRatings).length > 0 &&
            Object.values(selectedValues.statementRatings).every(
              (val) => val !== ''
            )
        );
        break;
      case 7: // GenderQuestion index
        setIsAnswered(selectedValues.gender !== "");
        break;
      case 8: // IncomeQuestion index
        setIsAnswered(selectedValues.income !== "");
        break;
      case 9: // AreaQuestion index
        setIsAnswered(selectedValues.area !== "");
        break;
      case 10: // AgeQuestion index
        setIsAnswered(selectedValues.age !== "");
        break;
      case 11: // EducationQuestion index
        setIsAnswered(selectedValues.education !== "");
        break;
      case 12: // HouseholdCompositionQuestion index
        setIsAnswered(
          selectedValues.adults !== "" || selectedValues.children !== ""
        );
        break;
      default:
        setIsAnswered(false);
        break;
    }
  }, [pageIndex, onQuestionChange, selectedValues]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedValues);
    }
  };
  
  const handleNext = () => {
    if (isAnswered && pageIndex < questions.length - 1) {
      const currentTimestamp = new Date().toISOString();

      // Save the current question data and timestamp when Next is clicked
      dispatch({
        type: "SET_DATA",
        key: `surveyQuestion_${pageIndex}`,
        value: {
          questionData: selectedValues,
          timestamp: currentTimestamp,
        },
      });

      setIsAnswered(false);
      setPageIndex(pageIndex + 1);
    }
  };

  const handleRadioChange = (field, key, value) => {
    setSelectedValues((prev) => {
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
      if (field === 'statementRatings') {
        return {
          ...prev,
          statementRatings: {
            ...prev.statementRatings,
            [key]: value,
          },
        };
      }
      if (field === "valueRatings") {
        return {
          ...prev,
          valueRatings: {
            ...prev.valueRatings,
            [key]: value,
          },
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
    setIsAnswered(true); // Mark question as answered
  };

  const handleInputChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsAnswered(true); // Mark question as answered
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

    setIsAnswered(true); // Mark question as answered
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
      handleRadioChange={(key, value) =>
        handleRadioChange("valueRatings", key, value)
      }
    />,
    <StatementRatingsQuestion
      key="Q7"
      selectedValues={selectedValues.statementRatings}
      handleRadioChange={(key, value) => handleRadioChange('statementRatings', key, value)}
    />,
    <GenderQuestion
      key="Q8"
      selectedValue={selectedValues.gender}
      handleRadioChange={(value) => handleRadioChange("gender", null, value)}
    />,
    <IncomeQuestion
    key="Q9"
    selectedValue={selectedValues.income}
    handleRadioChange={(value) => handleRadioChange('income', null, value)}
  />,
    <AreaQuestion
      key="Q10"
      selectedValue={selectedValues.area}
      handleRadioChange={(value) => handleRadioChange("area", null, value )}
    />,
    <AgeQuestion
      key="Q11"
      selectedValue={selectedValues.age}
      handleInputChange={(value) => handleInputChange("age", value)}
    />,
    <EducationQuestion
      key="Q12"
      selectedValue={selectedValues.education}
      handleRadioChange={(value) => handleRadioChange("education", null, value)}
    />,
    <HouseholdCompositionQuestion
      key="Q13"
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
