import { Typography, Box } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"

function DonationPrompt({ onProceed }) {
  const handleContinue = () => {
    onProceed("donationForm")
  }
  return (
    <>
      <Typography variant="h5" gutterBottom>
        You will receive an additional 10 Euro/Dollar.
      </Typography>
      <Typography variant="body1" paragraph>
        You have the opportunity to donate some of this money to an
        environmental charity working to spread awareness and promote action to
        combat climate change.
      </Typography>
      <Box mt={4}>
        <CustomButton
          text={"Next"}
          onClick={handleContinue}
          endIcon={<ArrowForwardIcon />}
        />
      </Box>
    </>
  )
}

export default DonationPrompt
