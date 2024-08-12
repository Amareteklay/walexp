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
      onProceed()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onProceed])

  return (
    <FeedbackContainer>
      <Typography variant="h4" gutterBottom>
        Excellent!
      </Typography>
      <Typography variant="body1" paragraph>
        You're all setup now. Next task will start in 4 seconds ...
      </Typography>
    </FeedbackContainer>
  )
}

export default Feedback
