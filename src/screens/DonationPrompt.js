import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function DonationPrompt({ onProceed }) {
  const { dispatch } = useData();

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Next button is clicked
    dispatch({
      type: "SET_DATA",
      key: "donationPromptNextTimestamp",
      value: {
        timestamp: currentTimestamp,
      },
    });

    onProceed("donationForm");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        You will receive an additional 10 Euro/Dollar.
      </Typography>
      <Typography variant="body1" sx={{ mx: 8 }} paragraph>
        You have the opportunity to donate some of this money to an
        environmental charity working to spread awareness and promote action to
        combat climate change.
      </Typography>
      <Typography variant="body1" sx={{ mx: 8 }} paragraph>
        Click 'Next' to select an amount that you would like to donate.
      </Typography>
      <Box mt={4}>
        <CustomButton
          text={"Next"}
          onClick={handleContinue}
          endIcon={<ArrowForwardIcon />}
        />
      </Box>
    </>
  );
}

export default DonationPrompt;
