import React, { useState, useEffect } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";
import { createApolloFetch } from "apollo-fetch";

const Tweets = ({ selectedState }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = createApolloFetch({
      uri: "http://localhost:5000/graphql",
    });

    if (selectedState) {
      fetch({
        query: `{ sentiments(state: "${selectedState}") { tweet link state city sadness joy fear disgust anger }}`,
      }).then((res) => {
        console.log(res.data);
        setData(res.data.sentiments);
      });
    } else {
      fetch({
        query:
          "{ sentiments { tweet link state city sadness joy fear disgust anger }}",
      }).then((res) => {
        console.log(res.data);
        setData(res.data.sentiments);
      });
    }
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tweet</TableCell>
              <TableCell>State</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Sadness</TableCell>
              <TableCell>Joy</TableCell>
              <TableCell>Fear</TableCell>
              <TableCell>Disgust</TableCell>
              <TableCell>Anger</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 10).map((sentiment) => {
              return (
                <TableRow>
                  <TableCell>
                    {sentiment.tweet} | <a href={sentiment.link}>Link</a>
                  </TableCell>
                  <TableCell>{sentiment.state}</TableCell>
                  <TableCell>{sentiment.city}</TableCell>
                  <TableCell>{sentiment.sadness.toFixed(2)}</TableCell>
                  <TableCell>{sentiment.joy.toFixed(2)}</TableCell>
                  <TableCell>{sentiment.fear.toFixed(2)}</TableCell>
                  <TableCell>{sentiment.disgust.toFixed(2)}</TableCell>
                  <TableCell>{sentiment.anger.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tweets;
