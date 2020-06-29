import React from 'react'
import {Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Go Go Power Rangers 
            {" " + new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;