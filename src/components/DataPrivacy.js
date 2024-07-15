import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"

function DataPrivacy({ onProceed }) {
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Data Privacy and Confidentiality
        </Typography>
        <Typography variant="body1" paragraph>
          We value your privacy and are committed to protecting your personal
          information. The data collected in this experiment will be used solely
          for research purposes and will be kept confidential. Your
          participation is voluntary, and you may withdraw at any time without
          any consequences. If you have any questions or concerns about the
          study, please contact the research team.
        </Typography>
        <Button variant="contained" color="primary" onClick={onProceed}>
          Proceed to Instructions
        </Button>
      </Box>
    </Container>
  )
}

export default DataPrivacy
