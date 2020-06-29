import React from 'react'
import DashboardView from '../Views/Dashboard.view'
import SpinnerScreen from '../Components/spinnerScreen.component'

const Dashboard = () => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false)

    return (
        <>
            <SpinnerScreen loading={isLoading} />
            <DashboardView open={open} setOpen={setOpen}>
                <h1>Hello</h1>
            </DashboardView>
        </>
    )
}

export default React.memo(Dashboard)
