import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../services/Copyright'
import ToolbarComponent from '../Components/ToolBar.component'
import DrawerComponent from '../Components/Drawer.component'

const Dashboard = props => {

	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
		},
		appBarSpacer: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			height: '100vh',
			overflow: 'auto',
		},
		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
		}
	}));

	const classes = useStyles();


	return (
		<div className={classes.root}>
			<ToolbarComponent open={props.open} setOpen={props.setOpen} />
			<DrawerComponent open={props.open} setOpen={props.setOpen} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					{props.children}
					<Copyright />
				</Container>
			</main>
		</div>
	)
}

export default React.memo(Dashboard);
