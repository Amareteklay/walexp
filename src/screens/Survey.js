// Survey
import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SocialMediaQuestion from "../components/questions/SocialMediaQuestion";
import FrequencyQuestion from "../components/questions/FrequencyQuestion";
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

function Survey({ onSubmit, onQuestionChange }) {
  const [selectedValues, setSelectedValues] = useState({
    socialMedia: [],
    frequency: "",
    mediaUse: [],
    mediaType: [],
    politicalScale: '',
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

  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(pageIndex);
    }

    // Determine if the current question has been answered
    if (pageIndex === 0) { // SocialMediaQuestion index
      setIsAnswered(selectedValues.socialMedia.length > 0);
    } else if (pageIndex === 2) { // MediaUseQuestion index
      setIsAnswered(selectedValues.mediaUse.length > 0);
    } else if (pageIndex === 3) { // MediaTypeQuestion index
      setIsAnswered(selectedValues.mediaType.length > 0);
    } else if (pageIndex === 4) { // PoliticalScaleQuestion index
      setIsAnswered(selectedValues.politicalScale !== '');
    } else if (pageIndex === 5) { // ValueRatingsQuestion index
      const allValuesAnswered = Object.values(selectedValues.valueRatings).every((val) => val !== "");
      setIsAnswered(allValuesAnswered);
    } else if (pageIndex === 1) { // FrequencyQuestion index
      setIsAnswered(selectedValues.frequency !== "");
    } else if (pageIndex === 7) { // GenderQuestion index
      setIsAnswered(selectedValues.gender !== "");
    } else if (pageIndex === 8) { // IncomeQuestion index
      setIsAnswered(selectedValues.income !== "");
    } else if (pageIndex === 9) { // AreaQuestion index
      setIsAnswered(selectedValues.area !== "");
    } else if (pageIndex === 10) { // AgeQuestion index
      setIsAnswered(selectedValues.age !== "");
    } else if (pageIndex === 11) { // EducationQuestion index
      setIsAnswered(selectedValues.education !== "");
    } else {
      // For other questions, you can implement similar logic or adapt as needed
      setIsAnswered(checkIfQuestionIsAnswered(pageIndex));
    }
  }, [pageIndex, onQuestionChange, selectedValues]);

  const checkIfQuestionIsAnswered = (pageIndex) => {
    // Implement specific validation for each question here
    switch (pageIndex) {
      case 0: // SocialMediaQuestion
        return selectedValues.socialMedia.length > 0;
      case 1: // FrequencyQuestion
        return selectedValues.frequency !== "";
      case 2: // MediaUseQuestion
        return selectedValues.mediaUse.length > 0;
      case 3: // MediaTypeQuestion
        return selectedValues.mediaType.length > 0;
      case 4: // PoliticalScaleQuestion
        return selectedValues.politicalScale !== '';
      case 7: // GenderQuestion
        return selectedValues.gender !== "";
      case 8: // IncomeQuestion
        return selectedValues.income !== "";
      case 9: // AreaQuestion
        return selectedValues.area !== "";
      case 10: // AgeQuestion
        return selectedValues.age !== "";
      case 11: // EducationQuestion
        return selectedValues.education !== "";
      default:
        return true; // Default to true for questions that do not need strict validation
    }
  };

  const handleRadioChange = (field, key, value) => {
    setSelectedValues((prev) => {
      if (field === "politicalScale") {
        return {
          ...prev,
          politicalScale: value,
        };
      }
      if (field === "statementRatings") {
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
      if (field === "frequency") {
        return {
          ...prev,
          frequency: value,
        };
      }
      if (field === "gender") {
        return {
          ...prev,
          gender: value,
        };
      }
      return prev;
    });
    // Set isAnswered to true when one item is selected
    if (field === "politicalScale" && value !== '') {
      setIsAnswered(true);
    }
    if (field === "gender" && value !== '') {
      setIsAnswered(true);
    }
  };

  const handleCheckboxChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
    if (field === "socialMedia") {
      setIsAnswered(selectedValues.socialMedia.length + 1 > 0);
    }
    if (field === "mediaUse") {
      setIsAnswered(selectedValues.mediaUse.length + 1 > 0);
    }
    if (field === "mediaType") {
      setIsAnswered(selectedValues.mediaType.length + 1 > 0);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsAnswered(true); // Mark question as answered
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedValues);
    }
  };

  const handleNext = () => {
    if (isAnswered && pageIndex < questions.length - 1) {
      setIsAnswered(false);
      setPageIndex(pageIndex + 1);
    }
  };

  const questions = [
    <SocialMediaQuestion
      key="Q1"
      selectedValues={selectedValues}
      handleCheckboxChange={handleCheckboxChange}
    />, 
    <FrequencyQuestion
      key="Q2"
      selectedValues={selectedValues}
      handleRadioChange={(value) => handleRadioChange("frequency", null, value)}
    />, 
    <MediaUseQuestion
      key="Q3"
      selectedValues={selectedValues}
      handleCheckboxChange={handleCheckboxChange}
    />, 
    <MediaTypeQuestion
      key="Q4"
      selectedValues={selectedValues}
      handleCheckboxChange={handleCheckboxChange}
    />, 
    <PoliticalScaleQuestion
      key="Q5"
      selectedValue={selectedValues.politicalScale}
      handleRadioChange={handleRadioChange}
    />, 
    <ValueRatingsQuestion
      key="Q6"
      selectedValues={selectedValues.valueRatings}
      handleRadioChange={handleRadioChange}
    />,
    <StatementRatingsQuestion
      key="Q7"
      selectedValues={selectedValues.statementRatings}
      handleRadioChange={handleRadioChange}
    />,
    <GenderQuestion
      key="Q8"
      selectedValue={selectedValues.gender}
      handleRadioChange={(value) => handleRadioChange("gender", null, value)}
    />,
    <IncomeQuestion
      key="Q9"
      selectedValues={selectedValues}
      handleInputChange={handleInputChange}
    />,
    <AreaQuestion
      key="Q10"
      selectedValues={selectedValues}
      handleInputChange={handleInputChange}
    />,
    <AgeQuestion
      key="Q11"
      selectedValue={selectedValues.age}
      handleInputChange={(value) => handleInputChange("age", value)}
    />,
    <EducationQuestion
      key="Q12"
      selectedValue={selectedValues.education}
      handleInputChange={handleInputChange}
    />,
    <HouseholdCompositionQuestion
      key="Q13"
      selectedValues={selectedValues}
      handleInputChange={handleInputChange}
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