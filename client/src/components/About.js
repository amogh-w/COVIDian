import React,{useEffect,useState} from "react";
import { Grid, Paper, Typography, Box, Button } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useTheme } from '@material-ui/core/styles';

const About = () => {
  const theme = useTheme()
  const [themeState,setTheme] = useState(theme.palette.type)
  useEffect(()=>{
    setTheme(theme.palette.type)
  },[theme.palette.type])
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Paper style={{ padding: "20px" }}>
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
          <Paper>
            <Grid container>
              <Grid item sm={12} style={{ padding: "20px" }}>
                <Typography variant="h6">Creators:</Typography>
              </Grid>
              <Grid item sm={3} align="center">
                <Button
                  onClick={() =>
                    window.open("https://github.com/amogh-w", "_blank")
                  }
                >
                  <a style={{ textDecoration: "none", color: themeState==="dark"?"#fff": "#000000" }}>
                    <GitHubIcon />
                    <Typography variant="subtitle2">
                      Amogh Warkhandkar
                    </Typography>
                  </a>
                </Button>
              </Grid>
              <Grid item sm={3} align="center">
                <Button
                  onClick={() =>
                    window.open("https://github.com/rlamge", "_blank")
                  }
                >
                  <a style={{ textDecoration: "none", color: themeState==="dark"?"#fff": "#000000" }}>
                    <GitHubIcon />
                    <Typography variant="subtitle2">Rahul Lamge</Typography>
                  </a>
                </Button>
              </Grid>
              <Grid item sm={3} align="center">
                <Button
                  onClick={() =>
                    window.open("https://github.com/blablabluomie", "_blank")
                  }
                >
                  <a style={{ textDecoration: "none", color: themeState==="dark"?"#fff": "#000000" }}>
                    <GitHubIcon />
                    <Typography variant="subtitle2">Omkar Bhambure</Typography>
                  </a>
                </Button>
              </Grid>
              <Grid item sm={3} align="center">
                <Button
                  onClick={() =>
                    window.open("https://github.com/rampa2510", "_blank")
                  }
                >
                  <a style={{ textDecoration: "none", color: themeState==="dark"?"#fff": "#000000" }}>
                    <GitHubIcon />
                    <Typography variant="subtitle2">Ram Pandey</Typography>
                  </a>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
