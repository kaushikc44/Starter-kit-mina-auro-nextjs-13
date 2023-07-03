"use client"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';


export default function WalletExist(){
    const [open,setOpen] = useState(true)
    let injectProvider =  false
    if (typeof window.mina !== 'undefined') {
        injectProvider = true
    }
    return (
        <>
            {injectProvider ? ( <Box sx={{ width: '100%' }}>
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
                        Auro does exists
                    </Alert>
                </Collapse>
            </Box>) : ( <Box sx={{ width: '100%' }}>
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
                    sx={{ mb: 2 }} severity="error"
                    >
                        Auro does not exists!
                    </Alert>
                </Collapse>
            </Box>)}
        </>
    )
}