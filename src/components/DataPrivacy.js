import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const DataPrivacyContainer = styled(Container)({
  textAlign: 'center',
  marginTop: "30px",
});

function DataPrivacy({ onProceed }) {
  return (
    <DataPrivacyContainer>
      <Typography variant="h4" gutterBottom>
        Data Privacy and Confidentiality
      </Typography>
      <Typography variant="body1" paragraph>
        We value your privacy and are committed to protecting your personal information. The data collected in this
        experiment will be used solely for research purposes and will be kept confidential. Your participation is
        voluntary, and you may withdraw at any time without any consequences. If you have any questions or concerns
        about the study, please contact the research team.
      </Typography>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Proceed to Instructions
      </Button>
    </DataPrivacyContainer>
  );
}

export default DataPrivacy;
