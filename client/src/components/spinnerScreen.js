import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Loader = (props) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
