import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import React from 'react'
import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MainSidebar(){

    const [isCollapsed, setIsCollasped] = useState(false);
    const [selected, setSelected] = useState("Dashboard")

    return (
        <Box>
            <Menu>
                <MenuItem>Test 1</MenuItem>
                <MenuItem>Test 2</MenuItem>
            </Menu>
        </Box>
    )

}