import React,{useState} from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import Toolbar from './Toolbar.component'
import Drawer from './Drawer.component'
import Copyright from '../Services/Copyright'
import {
	grey,
	deepPurple,
	lightBlue,
	purple
} from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto"
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column"
	},
	fixedHeight: {
		height: 240
	}
}));


function DashboardLayout(props) {
	const [open, setOpen] = useState(false);
	const [darkState, setDarkState] = useState(false);
	const palletType = darkState ? "dark" : "light";
	const mainPrimaryColor = darkState ? grey[700] : deepPurple[700];
	const mainSecondaryColor = darkState ? purple[200] : deepPurple[500];
	const darkTheme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {
				main: mainPrimaryColor
			},
			secondary: {
				main: mainSecondaryColor
			}
		}
	});
	const classes = useStyles();
	const handleThemeChange = () => {
		setDarkState(!darkState);
	};

	// const handleDrawerOpen = () => {
	//   setOpen(true);
	// };

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<ThemeProvider theme={darkTheme}>
			<div className={classes.root}>
				<CssBaseline />
				<Toolbar open={open} setOpen={setOpen} darkState={darkState} handleThemeChange={handleThemeChange} />
				<Drawer setOpen={setOpen} open={open} />
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Container maxWidth="lg" className={classes.container}>
						{props.children}
						<Box pt={4}>
							<Copyright />
						</Box>
					</Container>
				</main>
			</div>
		</ThemeProvider>
	);
}

export default DashboardLayout
