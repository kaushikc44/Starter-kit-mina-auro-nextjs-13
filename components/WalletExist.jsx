import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

export default function WalletExist() {
  const [open, setOpen] = useState(true);
  const [injectProvider, setInjectProvider] = useState(false);

  useEffect(() => {
    // Check for window.mina when the component mounts
    if (typeof window.mina !== 'undefined') {
      setInjectProvider(true);
    }

    // Collapse the alert after 3 seconds
    const timerId = setTimeout(() => {
      setOpen(false);
    }, 3000);

    // Clear the timer when the component unmounts or when injectProvider changes
    return () => {
      clearTimeout(timerId);
    };
  }, [injectProvider]);

  return (
    <>
      {injectProvider ? (
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Auro does exist
            </Alert>
          </Collapse>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              Auro does not exist!
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  );
}
