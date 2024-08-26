import React, { useEffect } from "react"
import { Container, Typography } from "@mui/material"
import { styled } from "@mui/system"

const FeedbackContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

function Feedback({ onProceed }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onProceed("emotionsOne") // Navigate to the "emotionsOne" screen after the feedback
    }, 4000)
    return () => clearTimeout(timer)
  }, [onProceed])

  return (
    <FeedbackContainer>
      <Typography variant="h4" sx={{fontWeight: "bold", marginBottom: 4}} gutterBottom>
        Excellent!
      </Typography>
      <Typography variant="body1" sx={{fontWeight: "bold", marginBottom: 8}}>
        You're all set up now. The next task will start in 4 seconds ...
      </Typography>
    </FeedbackContainer>
  )
}

export default Feedback
