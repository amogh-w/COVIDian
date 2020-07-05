import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

const LiveTweet = () => {
  const [values, setValues] = useState({ tweet: "" });
  const [prediction, setPrediction] = useState("");

  const fetchPrediction = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet: `${values.tweet}` }),
    };
    fetch("http://localhost:8080/predict", requestOptions)
      .then((response) => response.json())
      .then((data) => setPrediction(data.prediction))
      .catch((err) => {
        setPrediction("invalid");
      });
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
    </div>
  );
};

export default LiveTweet;
