import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";
import { createApolloFetch } from "apollo-fetch";

const Tweets = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = createApolloFetch({
      uri: "http://localhost:5000/graphql",
    });

    fetch({
      query: "{ sentiments { tweet link sadness joy fear disgust anger }}",
    }).then((res) => {
      console.log(res.data);
      setData(res.data.sentiments);
    });
  }, []);

  return (
    <div>
      <p>Tweets</p>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tweet</TableCell>
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
                    {sentiment.tweet}
                    {sentiment.link}
                  </TableCell>
                  <TableCell>{sentiment.sadness}</TableCell>
                  <TableCell>{sentiment.joy}</TableCell>
                  <TableCell>{sentiment.fear}</TableCell>
                  <TableCell>{sentiment.disgust}</TableCell>
                  <TableCell>{sentiment.anger}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default Tweets;
