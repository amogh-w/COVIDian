import React, { memo } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography, Hidden } from '@material-ui/core';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";

const ToolbarComponent = props => {
	const drawerWidth = 240;

	const useStyles = makeStyles(theme => ({
		toolbar: {
			paddingRight: 24, // keep right padding when drawer closed
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		menuButtonHidden: {
			display: 'none',
		},
		title: {
			flexGrow: 1,
		},
	}));

	
	const handleDrawerOpen = () => {
		props.setOpen(true);
	};

	const classes = useStyles();

	return (
		<AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
			<Toolbar className={classes.toolbar}>
				<Hidden mdUp>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
				</Hidden>
				<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					Tweety
        		</Typography>
				Dark Mode <Switch checked={props.darkState} onChange={props.handleThemeChange} />
			</Toolbar>
		</AppBar>
	);
}

export default memo(ToolbarComponent);