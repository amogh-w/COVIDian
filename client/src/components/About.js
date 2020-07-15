import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import GitHubIcon from "@material-ui/icons/GitHub";
import useTheme from "@material-ui/core/styles/useTheme";
import banner from "../media/banner.png";

const About = () => {
  const theme = useTheme();
  const [themeState, setTheme] = React.useState(theme.palette.type);
  React.useEffect(() => {
    setTheme(theme.palette.type);
  }, [theme.palette.type]);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: "20px" }}>
            <img src={banner} style={{ width: "100%" }} alt="banner" />
            <Typography variant="h3" gutterBottom>
              General Description
            </Typography>
            <Typography variant="body1">
              Social Media platforms contain a huge repository of public and
              private opinion regarding a wide variety of subjects, expressed
              and spread continually by their users. Among those platforms,
              Twitter is gaining immense popularity.
            </Typography>
            <Typography variant="body1" gutterBottom>
              This system will help us understand the impact of corona and its
              lockdown phase on the general population of India. We will collect
              a vast number of tweets and perform sentiment analysis on them
              which will be sorted through and displayed as per geographic
              regions.
            </Typography>
            <Typography variant="h5">About the Project:</Typography>
            <Typography variant="body2">
              COVIDian offers different ways of visualizing as well as analyzing
              tweets.
              <ul>
                <li>COVIDian is now available in dark mode!</li>
                <li>
                  National-level statistics are available on the main dashboard
                  <ul>
                    <li>
                      Cumulative data on emotions are displayed in the doughnut
                      chart, and city hotspots are displayed in the radar chart.
                    </li>
                    <li>
                      To remove a city/emotion from the chart, simply click on
                      it!
                    </li>
                    <li>
                      Over 6000 tweets (and counting) and their emotion values
                      are displayed on the main dashboard.
                    </li>
                  </ul>
                </li>
                <li>
                  Map of India visualizes the emotion distribution, emotion
                  wise! Just change the emotion to view the distribution.
                </li>
                <li>
                  Users can view state-wise information as well! Click on the
                  state and see the results. Map of state, radar chart for
                  emotions and, state-specific tweets will be shown.
                  District/City-wise distribution is in beta phase and will be
                  out soon.
                </li>
                <li>
                  Tweet Analyzer is where the real magic is at, all you have to
                  do is put a tweet and our model will predict its emotions! To
                  make our lives easy we have embedded twitter as well, just
                  type the twitter handle and we fetch the tweet for you.
                </li>
                <li>
                  To keep in touch with reality and severity of COVID-19,
                  Resources tab offers you COVID-19 tracker. Daily updates on
                  infected, recovered and deaths related to coronavirus can be
                  seen here.
                </li>
                <li>
                  COVIDianBot will use AI technology to understand what you are
                  typing and will reply with the correct answer to your
                  query.You can ask the bot the number of cases or the results
                  of sentiment analysis.
                </li>
              </ul>
            </Typography>
            <Typography variant="h5">Novelty/Uniqueness:</Typography>
            <Typography variant="body2">
              <ul>
                <li>
                  Our system will be able to update the data providing real-time
                  updates.
                </li>
                <li>
                  We will create a platform to monitor the opinion of the public
                  on the lockdown.
                </li>
                <li>
                  Sentiment per region, with Geolocation data from Twitter API.
                </li>
                <li>
                  We are making the system more extensible by using GraphQL API
                  so that we can easily add new features without changing our
                  existing source code.
                </li>
                <li>
                  Open Sourced, so everyone is free to have a look at the
                  system.
                </li>
              </ul>
            </Typography>
            <Typography variant="h5">Tech Stack:</Typography>
            <Typography variant="body2">
              <Typography>
                <Box fontWeight="fontWeightBold">Frontend</Box>
              </Typography>
              <ul>
                <li>React.js</li>
                <li>Chart.js</li>
                <li>d3.js for Data Visualization</li>
                <li>Material UI</li>
              </ul>
              <Typography>
                <Box fontWeight="fontWeightBold">Backend</Box>
              </Typography>
              <ul>
                <li>MongoDB with GraphQL server</li>
                <li>IBM Watson Studio for faster ML model serving</li>
                <li>Docker</li>
                <li>FastAPI</li>
                <li>Uvicorn</li>
              </ul>
              <Typography>
                <Box fontWeight="fontWeightBold">Machine Learning</Box>
              </Typography>
              <ul>
                <li>Python with Tensorflow 2.0</li>
                <li>Keras</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Hidden mdUp>
            <Paper>
              <Grid container>
                <Grid item xs={12} style={{ padding: "20px" }}>
                  <Typography variant="h6">Creators:</Typography>
                </Grid>
                <Grid item xs={6} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/amogh-w", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">
                        Amogh Warkhandkar
                      </Typography>
                    </a>
                  </Button>
                </Grid>
                {/* <Hidden>
                  <Grid item xs={3} />
                </Hidden> */}
                <Grid item xs={6} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/rlamge", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">Rahul Lamge</Typography>
                    </a>
                  </Button>
                </Grid>
                <Grid item xs={6} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/blablabluomie", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">
                        Omkar Bhambure
                      </Typography>
                    </a>
                  </Button>
                </Grid>
                {/* <Hidden>
                  <Grid item xs={3} />
                </Hidden> */}
                <Grid item xs={6} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/rampa2510", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">Ram Pandey</Typography>
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Hidden>

          <Hidden mdDown>
            <Paper>
              <Grid container>
                <Grid item xs={12} style={{ padding: "20px" }}>
                  <Typography variant="h6">Creators:</Typography>
                </Grid>
                <Grid item xs={3} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/amogh-w", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">
                        Amogh Warkhandkar
                      </Typography>
                    </a>
                  </Button>
                </Grid>
                <Grid item xs={3} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/rlamge", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">Rahul Lamge</Typography>
                    </a>
                  </Button>
                </Grid>
                <Grid item xs={3} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/blablabluomie", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">
                        Omkar Bhambure
                      </Typography>
                    </a>
                  </Button>
                </Grid>
                <Grid item xs={3} align="center">
                  <Button
                    onClick={() =>
                      window.open("https://github.com/rampa2510", "_blank")
                    }
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: themeState === "dark" ? "#fff" : "#000000",
                      }}
                      href="#"
                    >
                      <GitHubIcon />
                      <Typography variant="subtitle2">Ram Pandey</Typography>
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(About);
