import React from "react";
import Container from "@material-ui/core/Container";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from './components/spinnerScreen'
import {ThemeProvider,createMuiTheme} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import lightBlue from "@material-ui/core/colors/lightBlue";
import deepPurple from "@material-ui/core/colors/deepPurple";
import deepOrange from "@material-ui/core/colors/deepOrange";

const Navbar = React.lazy(() => import(/* webpackChunkName: "Navbar" */ './components/Navbar'))
const CountryInfo = React.lazy(() => import(/* webpackChunkName: "CountryInfo" */ './components/CountryInfo'))
const StateInfo = React.lazy(() => import(/* webpackChunkName: "StateInfo" */ './components/StateInfo'))
const LiveTweet = React.lazy(() => import(/* webpackChunkName: "LiveTweet" */ './components/LiveTweet'))
const Resources = React.lazy(() => import(/* webpackChunkName: "Resources" */ './components/Resources'))
const About = React.lazy(() => import(/* webpackChunkName: "About" */ './components/About'))
const ChatBot = React.lazy(()=>import('./components/Chatbot'))

const App = () => {
  const [darkState, setDarkState] = React.useState(window.localStorage.getItem('darkMode') === 'true' ? true : false);

  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  // useEffect(()=>{
  //   const isDarkModeEnabled = window.localStorage.getItem('darkMode');
  //   console.log(isDarkModeEnabled)
  //   // console.log(isDarkModeEnabled)
  //   // setDarkState(isDarkModeEnabled?true:false)
  // },[])


  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });


  const handleThemeChange = () => {
    const preference = darkState;
    // console.log(darkState,preference)
    setDarkState(!darkState);
    // console.log(preference,darkState)
    window.localStorage.setItem('darkMode', !preference)
  };

  return (
    <React.Suspense fallback={<Loader loading={true} />} >
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar darkState={darkState} handleThemeChange={handleThemeChange} />
          <Container>
            <div style={{ padding: "10px", marginTop: "80px" }}>
              <Route path="/" exact component={CountryInfo} />
              <Route path="/state/:name" component={StateInfo} />
              <Route path="/analyzer" component={LiveTweet} />
              <Route path="/resources" component={Resources} />
              <Route path="/about" component={About} />
              <Route path="/chatbot" component={ChatBot} />
            </div>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </React.Suspense>

  );
};

export default App;
