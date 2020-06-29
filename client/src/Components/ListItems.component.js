import React, { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useHistory } from 'react-router-dom'

const MainListItems = () => {
	const history = useHistory()

	return (
		<>
			<ListItem button onClick={() => history.push('/')}>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
			<ListItem button onClick={() => console.log("Click on tab 2")}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Tab 2" />
			</ListItem>
			<ListItem button onClick={() => console.log("Click on tab 3")}>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary="Tab 3" />
			</ListItem>
		</>
	)
}

export default memo(MainListItems)