import React,{lazy,Suspense} from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import {CssBaseline} from '@material-ui/core'
import SpinnerScreen from './Components/spinnerScreen.component'
import Loader from './Components/spinnerScreen.component';
const DashboardContainer = lazy(()=>import('./Containers/Dashboard.container'))
const App = ()=>{
    return (
        <Suspense fallback={<Loader loading={true}/>}>
            <BrowserRouter>
                <CssBaseline />
                <Switch>
                    <Route path="/" exact component={DashboardContainer}/>
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default App;