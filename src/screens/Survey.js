import React, { useState, useEffect } from "react"
import { Container, Box, Button } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import SocialMediaQuestion from "../components/questions/SocialMediaQuestion"
import FrequencyQuestion from "../components/questions/FrequencyQuestion"
import MediaUseQuestion from "../components/questions/MediaUseQuestion"
import MediaTypeQuestion from "../components/questions/MediaTypeQuestion"
import PoliticalScaleQuestion from "../components/questions/PoliticalScaleQuestion"
import ValueRatingsQuestion from "../components/questions/ValueRatingsQuestion"
import StatementRatingsQuestion from "../components/questions/StatementRatingsQuestion"
import GenderQuestion from "../components/questions/GenderQuestion"
import IncomeQuestion from "../components/questions/IncomeQuestion"
import AreaQuestion from "../components/questions/AreaQuestion"
import AgeQuestion from "../components/questions/AgeQuestion"
import EducationQuestion from "../components/questions/EducationQuestion"
import HouseholdCompositionQuestion from "../components/questions/HouseholdCompositionQuestion"
import CustomButton from "../components/CustomButton"

function Survey({ onSubmit, onQuestionChange }) {
  const [selectedValues, setSelectedValues] = useState({
    socialMedia: [],
    frequency: "",
    mediaUse: [],
    mediaType: [],
    politicalScale: 4,
    valueRatings: {},
    statementRatings: {},
    gender: "",
    income: "",
    area: "",
    age: "",
    education: "",
    adults: "",
    children: "",
  })

  const [pageIndex, setPageIndex] = useState(0) // State to track the current question index
  const [isAnswered, setIsAnswered] = useState(false) // State to track if the current question is answered

  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(pageIndex) // Notify parent component of the current question index
    }
  }, [pageIndex, onQuestionChange])

  const handleCheckboxChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }))
    setIsAnswered(true) // Mark question as answered
  }

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
      return prev;
    });
    setIsAnswered(true) // Mark question as answered
  }
  
  const handleSliderChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }))
    setIsAnswered(true) // Mark question as answered
  }

  const handleInputChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }))
    setIsAnswered(true) // Mark question as answered
  }

  const handleSubmit = () => {
    console.log("Submitting survey data:", selectedValues) // Debugging line
    window.parent.postMessage(
      { type: "survey_data", data: selectedValues },
      "*"
    )
    if (onSubmit) {
      onSubmit()
    } else {
      console.error("onSubmit function is not defined")
    }
  }

  // Define the question components to be rendered based on the page index
  const questions = [
    <SocialMediaQuestion
      key="Q1"
      selectedValues={selectedValues}
      handleCheckboxChange={handleCheckboxChange}
    />,
    <FrequencyQuestion
      key="Q2"
      selectedValues={selectedValues}
      handleRadioChange={handleRadioChange}
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
      selectedValues={selectedValues}
      handleRadioChange={handleRadioChange}
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
      selectedValues={selectedValues}
      handleInputChange={handleInputChange}
    />,
    <EducationQuestion
      key="Q12"
      selectedValues={selectedValues}
      handleInputChange={handleInputChange}
    />,
    <HouseholdCompositionQuestion
      key="Q13"
      selectedValues={selectedValues}
      handleInputChange={handleInputChange}
    />,
  ]

  // Handle Next Button Click
  const handleNext = () => {
    if (isAnswered && pageIndex < questions.length - 1) {
      setIsAnswered(false) // Reset answered state for the next question
      setPageIndex(pageIndex + 1)
    }
  }

  return (
    <Container>
      {questions[pageIndex]}
      
      {/* Show Next button if not on the last question */}
      {pageIndex < questions.length - 1 && (
        <CustomButton
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
          text={"Next"}
          disabled={!isAnswered} // Disable button if not answered
        />
      )}
  
      {/* Show Submit Survey button if on the last question */}
      {pageIndex === questions.length - 1 && (
        <Box mt={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Survey
          </Button>
        </Box>
      )}
    </Container>
  );
}  

export default Survey
