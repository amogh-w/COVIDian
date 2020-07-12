import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Loader from "./spinnerScreen";

const LiveTweet = () => {
  const [values, setValues] = React.useState({ tweet: "", username: "WHO" });
  const [prediction, setPrediction] = React.useState("");
  const [userToSearch, setUserToSearch] = React.useState("");
  const [isLoad, setLoad] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const randNum = React.useRef(0);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const fetchPrediction = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet: `${values.tweet}` }),
    };
    fetch(`/predict`, requestOptions)
      .then((response) => response.json())
      .then((data) => setPrediction(data.prediction))
      .catch((err) => {
        setPrediction("invalid");
      });
  };

  const fetchUser = () => {
    setLoad(true);
    setUserToSearch(values.username);
    randNum.current = randNum.current + 1;
    window.setTimeout(() => setLoad(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <Typography variant="h5">Classify Tweet</Typography>
      <TextField
        name="tweet"
        value={values.name}
        onChange={handleInputChange}
        label="Tweet Text"
        margin="normal"
        multiline
        rowsMax={4}
        style={{ width: "50vw" }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={fetchPrediction}>
        Predict
      </Button>
      <Card style={{ maxWidth: "50vw", marginTop: "16px" }}>
        <CardContent>
          <Typography variant="h6">Prediction</Typography>

          {prediction ? (
            <Typography>Result: {prediction}.</Typography>
          ) : (
            <Typography>Click the Predict button.</Typography>
          )}
        </CardContent>
      </Card>
      <Divider style={{ margin: "20px 0px", width: "50vw" }} />
      <Typography variant="h5">Search User</Typography>
      <TextField
        name="username"
        value={values.name}
        onChange={handleInputChange}
        label="Twitter Username"
        margin="normal"
        style={{ width: "50vw" }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={fetchUser}>
        Search
      </Button>
      <Loader loading={isLoad} />
      {userToSearch ? (
        <div
          style={{ width: width >= 1280 ? "50vw" : "80vw", marginTop: "20px" }}
        >
          <TwitterTimelineEmbed
            key={randNum.current}
            sourceType="profile"
            screenName={userToSearch}
            options={{ height: 400 }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(LiveTweet);
