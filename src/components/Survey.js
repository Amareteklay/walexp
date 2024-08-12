import React, { useState } from "react"
import {
  Container,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Button,
  Slider,
} from "@mui/material"
import { styled } from "@mui/system"

const SurveyContainer = styled(Container)({
  textAlign: "left",
  marginTop: "30px",
  overflowY: "auto",
  height: "80vh",
})

const QuestionBox = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
})

const options = {
  socialMedia: [
    "I am not on social media",
    "Instagram",
    "X (previously Twitter)",
    "Facebook",
    "TikTok",
    "Snapchat",
    "Youtube",
    "Other(s) specify",
  ],
  frequency: [
    "Never, I am not on social media",
    "A few times per year",
    "A few times per month",
    "A few times per week",
    "A few times per day",
    "Several hours every day",
  ],
  mediaUse: [
    "I am not on social media",
    "I only use it to catch up on content posted by others",
    "I use it to interact with my friends and family",
    "I use it to share information I find important and/or interesting",
    "Other reason, specify",
  ],
  mediaType: [
    "I don’t stay updated on current events",
    "Television",
    "Newspapers",
    "Radio",
    "Social media",
    "Others, specify",
  ],
  values: [
    "Social power",
    "Equality",
    "Respecting the Earth",
    "Enjoying life",
    "Wealth",
    "A world at peace",
    "Unity with nature",
    "Authority",
    "Pleasure",
    "Social justice",
    "Protecting the environment",
    "Influence",
    "Be helpful",
    "Prevent pollution",
    "Ambitious",
    "Gratification for oneself",
  ],
  statements: [
    "Acting environmentally friendly is an important part of who I am",
    "I am the type of person who acts environmentally friendly",
    "I see myself as an environmentally friendly person",
    "I am worried about the consequences of climate change. I think they can have drastic negative effects on our ways of life in the future.",
    "I am worried about geopolitical conflicts. I think they can have drastic negative effects on our ways of life in the future.",
    "I am worried about increased migration. I think migration can have drastic negative effects on our ways of life in the future.",
    "I am worried about global pandemics like the Covid-19 pandemic. I think they can have drastic negative effects on our ways of life in the future.",
    "I am worried about global economic turmoil. I think it can have drastic negative effects on our ways of life in the future.",
  ],
}

function Survey({onSubmit}) {
  const [selectedValues, setSelectedValues] = useState({
    socialMedia: [],
    frequency: "",
    mediaUse: [],
    mediaType: [],
    politicalScale: "",
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

  const handleCheckboxChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }))
  }

  const handleRadioChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSliderChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInputChange = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    console.log("Survey submitted:", selectedValues)
    // Handle the submission of the survey form
    onSubmit()
  }

  return (
    <SurveyContainer>
      <Typography variant="h5" gutterBottom>
        Media use, familiarity with social media
      </Typography>
      <QuestionBox>
        <Typography variant="body1">
          What social media platforms do you use frequently? You can mark
          several alternatives.
        </Typography>
        {options.socialMedia.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.socialMedia.includes(option)}
                onChange={() => handleCheckboxChange("socialMedia", option)}
              />
            }
            label={option}
          />
        ))}
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          How often do you use social media platforms? Mark the alternative most
          relevant for you.
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedValues.frequency}
            onChange={(e) => handleRadioChange("frequency", e.target.value)}
          >
            {options.frequency.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          What do you typically use these platforms for? You can mark several
          alternatives.
        </Typography>
        {options.mediaUse.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.mediaUse.includes(option)}
                onChange={() => handleCheckboxChange("mediaUse", option)}
              />
            }
            label={option}
          />
        ))}
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          What type of media do you typically use to get updated on current
          events? You can mark several alternatives.
        </Typography>
        {options.mediaType.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.mediaType.includes(option)}
                onChange={() => handleCheckboxChange("mediaType", option)}
              />
            }
            label={option}
          />
        ))}
      </QuestionBox>

      <QuestionBox>
        <Typography variant="h5" gutterBottom>
          Values and attitudes
        </Typography>
        <Typography variant="body1" paragraph>
          Where would you place yourself politically on a left-to-right scale?
        </Typography>
        <Slider
          value={selectedValues.politicalScale || 4}
          onChange={(e, value) => handleSliderChange("politicalScale", value)}
          min={1}
          max={7}
          marks={[
            { value: 1, label: "1" },
            { value: 7, label: "7" },
          ]}
          step={1}
        />
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          See these 16 values as potential guiding principles in your life. For
          each of these, we ask you to state how important it is to you by
          rating each of them on a 7-point scale from 1 (not at all important)
          to 7 (extremely important).
        </Typography>
        {options.values.map((value) => (
          <Box key={value}>
            <Typography variant="body2">{value}</Typography>
            <Slider
              value={selectedValues.valueRatings[value] || 4}
              onChange={(e, newValue) =>
                handleSliderChange("valueRatings", {
                  ...selectedValues.valueRatings,
                  [value]: newValue,
                })
              }
              min={1}
              max={7}
              step={1}
              marks={[
                { value: 1, label: "1" },
                { value: 7, label: "7" },
              ]}
            />
          </Box>
        ))}
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          To what degree do you agree with the following statements? Indicate on
          a scale from 1 (completely disagree) to 7 (completely agree).
        </Typography>
        {options.statements.map((statement) => (
          <Box key={statement}>
            <Typography variant="body2">{statement}</Typography>
            <Slider
              value={selectedValues.statementRatings[statement] || 4}
              onChange={(e, newValue) =>
                handleSliderChange("statementRatings", {
                  ...selectedValues.statementRatings,
                  [statement]: newValue,
                })
              }
              min={1}
              max={7}
              step={1}
              marks={[
                { value: 1, label: "1" },
                { value: 7, label: "7" },
              ]}
            />
          </Box>
        ))}
      </QuestionBox>

      <QuestionBox>
        <Typography variant="h5" gutterBottom>
          Background information
        </Typography>
        <Typography variant="body1">
          What best describes your gender?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedValues.gender}
            onChange={(e) => handleRadioChange("gender", e.target.value)}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Non-binary"
              control={<Radio />}
              label="Non-binary"
            />
            <FormControlLabel
              value="None of the above"
              control={<Radio />}
              label="None of the above"
            />
            <FormControlLabel
              value="Prefer not to say"
              control={<Radio />}
              label="Prefer not to say"
            />
          </RadioGroup>
        </FormControl>
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          What is your average monthly income before taxes?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedValues.income}
            onChange={(e) => handleRadioChange("income", e.target.value)}
          >
            <FormControlLabel
              value="1 000 Euro or less"
              control={<Radio />}
              label="1 000 Euro or less"
            />
            <FormControlLabel
              value="Between 1 000 and 2 000 Euro"
              control={<Radio />}
              label="Between 1 000 and 2 000 Euro"
            />
            <FormControlLabel
              value="Between 2 000 and 3 000 Euro"
              control={<Radio />}
              label="Between 2 000 and 3 000 Euro"
            />
            <FormControlLabel
              value="Between 3 000 and 4 000 Euro"
              control={<Radio />}
              label="Between 3 000 and 4 000 Euro"
            />
            <FormControlLabel
              value="Between 4 000 and 5 000 Euro"
              control={<Radio />}
              label="Between 4 000 and 5 000 Euro"
            />
            <FormControlLabel
              value="Between 5 000 and 6 000 Euro"
              control={<Radio />}
              label="Between 5 000 and 6 000 Euro"
            />
            <FormControlLabel
              value="Above 6 000 Euro"
              control={<Radio />}
              label="Above 6 000 Euro"
            />
            <FormControlLabel
              value="Prefer not to say"
              control={<Radio />}
              label="Prefer not to say"
            />
          </RadioGroup>
        </FormControl>
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          What type of area do you live in?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedValues.area}
            onChange={(e) => handleRadioChange("area", e.target.value)}
          >
            <FormControlLabel
              value="Centrally in a bigger city"
              control={<Radio />}
              label="Centrally in a bigger city (bigger than 1 M inhabitants)"
            />
            <FormControlLabel
              value="In the suburb to a bigger city"
              control={<Radio />}
              label="In the suburb to a bigger city"
            />
            <FormControlLabel
              value="Centrally in medium size city"
              control={<Radio />}
              label="Centrally in medium size city (bigger than 500 000 inhabitants)"
            />
            <FormControlLabel
              value="In a smaller city"
              control={<Radio />}
              label="In a smaller city (less than 500 000 inhabitants)"
            />
            <FormControlLabel
              value="In a rural area"
              control={<Radio />}
              label="In a rural area"
            />
          </RadioGroup>
        </FormControl>
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">How old are you?</Typography>
        <TextField
          type="number"
          value={selectedValues.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          fullWidth
        />
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          What is your highest completed education level?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedValues.education}
            onChange={(e) => handleRadioChange("education", e.target.value)}
          >
            <FormControlLabel
              value="No completed education"
              control={<Radio />}
              label="No completed education"
            />
            <FormControlLabel
              value="Elementary school"
              control={<Radio />}
              label="Elementary school"
            />
            <FormControlLabel
              value="Secondary school"
              control={<Radio />}
              label="Secondary school"
            />
            <FormControlLabel
              value="Upper secondary school"
              control={<Radio />}
              label="Upper secondary school"
            />
            <FormControlLabel
              value="University"
              control={<Radio />}
              label="University"
            />
          </RadioGroup>
        </FormControl>
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          How many adults are in your household?
        </Typography>
        <TextField
          type="number"
          value={selectedValues.adults}
          onChange={(e) => handleInputChange("adults", e.target.value)}
          fullWidth
        />
      </QuestionBox>

      <QuestionBox>
        <Typography variant="body1">
          Number of children (under 18) in your household?
        </Typography>
        <TextField
          type="number"
          value={selectedValues.children}
          onChange={(e) => handleInputChange("children", e.target.value)}
          fullWidth
        />
      </QuestionBox>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </SurveyContainer>
  )
}

export default Survey
