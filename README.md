<div  align="center">
    <img src="/client/src/media/logo.png?raw=true" width="50px">
</div>
<h3 align="center"> COVIDian - An COVID Tweet Sentiment Visualizer and Analyser Application </h3>
  <p align="center">
    A React Application
    <br />
    <a href="#"><strong> Explore the docs » </strong></a>
    <br />
    <br />
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
    ·
  </p>

![](/client/src/media/banner.png?raw=true "Merged")

## Table of Contents

- [About The Project](#about-the-project)
- [Dashboard](#dashboard)
  - [Resources](#resources)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Team Members](#team-members)

## About The Project:

COVIDian offers different ways of visualizing as well as analyzing tweets.

- COVIDian is now available in dark mode!
- National-level statistics are available on the main dashboard.
  - Cumulative data on emotions are displayed in the doughnut chart, and city hotspots are displayed in the radar chart.
  - To remove a city/emotion from the chart, _simply click on it_!
  - Over 3000 tweets (and counting) and their emotion values are displayed on the main dashboard.
- **Map of India** visualizes the emotion distribution, emotion wise! Just change the emotion to view the distribution.
- Users can view state-wise information as well! Click on the state and see the results. Map of state, radar chart for emotions and, state-specific tweets will be shown. _District/City-wise distribution is in beta phase and will be out soon_
- **Tweet Analyzer** is where the real magic is at, all you have to do is put a tweet and our model will predict its emotions! To make our lives easy we have embedded twitter as well, just type the twitter handle and we fetch the tweet for you.
- To keep in touch with reality and severity of COVID-19, **Resources** tab offers you _COVID-19 tracker_. Daily updates on infected, recovered and deaths related to coronavirus can be seen here.

## Dashboard

![0](/media/1.PNG?raw=true "Dash1")

Presenting an all-in-one dashboard to visualize emotions to **coronavirus pandemic** and **government decisions** related to it,based on Twitter data.

![1](/media/2.PNG?raw=true "Dash2")

Clicking on any state gives state-specific information.

![2](/media/3.PNG?raw=true "Dash3")

Tweets specific to the state are also seen,with their _scores on emotions_.

![3](/media/4.PNG?raw=true "Dash4")

### Resources:

- [Twint](https://github.com/twintproject/twint) - Twitter scraping tool **without** the need of Twitter API

- [Node.js](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on **Chrome's V8 JS engine**

- [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html) - Get started with React here

- [Material UI](https://material-ui.com/) - React components for faster and easier web development

- [Express.js](https://expressjs.com/) - A web application framework for Node.js

- [GraphQL](https://graphql.org/) - An open-source data query and manipulation language for APIs

- [Mongoose](https://mongoosejs.com/docs/) - An Object Data Modeling (ODM) library for MongoDB and Node

- [Tensorflow](https://www.tensorflow.org/) - Open source software library for Machine Learning frameworks

- [Keras](https://keras.io/) - Runs on top of tensorflow,designed to enable fast experimentation with deep neural networks

- [IBM API](https://www.ibm.com/in-en/cloud/api-connect) - Model will be hosted on IBM API

## Getting Started:

> Amogh do this.

1. Clone the repo
2. Install all the packages in the package.json file
3. Make a twilio,s3,location iQ account and add the api key wherever it is required
4. Run the command To start the app in development server

```
npm start
```

5. For building the production

```
npm run build
```

## Contributing:

Contributions are what makes the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

All you simply need to do is:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team Members:

| [Amogh Warkhandkar](https://github.com/amogh-w) | [Rahul Lamge](https://github.com/rlamge) | [Omkar Bhambure](https://github.com/blablabluomie) | [Ram Pandey](https://github.com/rampa2510) |
