import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core'
import DashboardContainer from './Containers/Dashboard.container'

const App = () => {


    return (
        // <Suspense>
            <BrowserRouter>
                <CssBaseline />
                    <Switch>
                        <Route path="/" exact component={DashboardContainer} />
                    </Switch>
            </BrowserRouter>
        // </Suspense>
    )
}

export default App;