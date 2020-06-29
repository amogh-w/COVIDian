import React, { memo } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { Divider, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MainListItems from './ListItems.component.component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const DrawerComponent = props => {
	const drawerWidth = 240;

	const useStyles = makeStyles(theme => ({
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar,
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			}
		}
	}));

	const classes = useStyles();

	const handleDrawerClose = () => {
		props.setOpen(false);
	};

	return (
		<>
			<Hidden mdUp>
				<Drawer
					// variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
					}}
					open={props.open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List><MainListItems /></List>
					<Divider />
				</Drawer>
			</Hidden>
			<Hidden smDown>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !true && classes.drawerPaperClose),
					}}
					open={true}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List><MainListItems /></List>
					<Divider />
				</Drawer>
			</Hidden>
		</>
	)
}

export default memo(DrawerComponent);