import React, { useState, useEffect, useRef, memo } from "react";
import {
  makeStyles,
  InputAdornment,
  TextField,
  Card,
  Avatar,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import CloseIcon from "@material-ui/icons/Close";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Loader from "./spinnerScreen";
const useStyles = makeStyles({
  behindText: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "81px",
    // backgroundColor: "#f2f2f2",
  },
  textField: {
    position: "fixed",
    bottom: 15,
    width: "90%",
    marginLeft: "5%",
    left: 0,
    backgroundColor: "#fff",
  },
  botChatCont: {
    left: 0,
    width: "100%",
    marginTop: "20px",
    display: "flex",
  },
  botReply: {
    backgroundColor: "#262626",
    color: "#fff",
    maxWidth: "60%",
    // wordBreak:'break-all',
    padding: "10px",
    marginLeft: "10px",
    // overflowWrap: 'break-word',
    // wordWrap: 'break-word',
    hyphens: "auto",
  },
  botAvatar: {
    color: "#fff",
    backgroundColor: "#262626",
    marginLeft: "10px",
  },
  userChatCont: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
  },
  userReply: {
    backgroundColor: "#fff",
    color: "#262626",
    maxWidth: "60%",
    // wordBreak:'break-all',
    padding: "10px",
    marginRight: "10px",
    marginLeft: "auto",
  },
  userAvatar: {
    color: "#262626",
    backgroundColor: "#fff",
    marginRight: "10px",
  },
  chatCont: {
    top: 110,
    bottom: 90,
    width: "80vw",
    overflowY: "scroll",
    position: "fixed",
  },
});

const ChatBot = () => {
  const WelcomMessage = `Welcome to COVIDian. Feel free to 
    ask the number of cases or the sentiment in a specific state. 
    You can ask me 'Tell me the cases in Maharashtra' or 'Tell me the sentiments in Gujarat' or 'Anger in Rajasthan'`;
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", message: WelcomMessage },
  ]);
  const [listening, setListening] = useState(false);

  let speechNotAvailable = null;
  if (!("webkitSpeechRecognition" in window)) {
    speechNotAvailable =
      "Speech to text not available please use google chrome";
  } else {
    var SpeechRecognition = window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.interimResults = false;

    recognition.onresult = async function (event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      setListening(false);
      setUserChat(command);
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onerror = function (event) {
      console.log("Error occurred in recognition: " + event.error);
    };
  }
  const classes = useStyles();
  const [userChat, setUserChat] = useState("");
  const chatEndRef = React.createRef();
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    if (loading === false) {
      var elem = document.getElementById("scrolldiv");
      elem.scrollTop = elem.scrollHeight;
      var messagestest = document.getElementsByClassName("message");
      messagestest[messagestest.length - 1].innerHTML = messagestest[
        messagestest.length - 1
      ].innerHTML.replace(/\\n/g, "<br />");
    }
  };

  useEffect(scrollToBottom, [chatHistory]);

  const inputRef = useRef(null);

  const getBotMsg = async (e) => {
    inputRef.current.focus();
    const currentmsg = userChat;
    setUserChat("");
    // setDisabled(true);

    await setChatHistory([
      ...chatHistory,
      { type: "user", message: currentmsg },
    ]);
    const data = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ msg: currentmsg }),
    }).then((res) => res.json());

    setChatHistory([
      ...chatHistory,
      { type: "user", message: currentmsg },
      { type: "bot", message: data.query },
    ]);
    // await setDisabled(false)
    scrollToBottom();
    inputRef.current.focus();
  };

  const checkListening = () => {
    if (!speechNotAvailable) {
      if (listening === false)
        return (
          <MicNoneIcon
            style={{ paddingRight: "10px" }}
            onClick={() => {
              setListening(true);
              recognition.start();
            }}
          />
        );
      else
        return (
          <MicIcon
            style={{ paddingRight: "10px" }}
            onClick={() => {
              setListening(false);
              recognition.stop();
            }}
          />
        );
    } else {
      alert(speechNotAvailable);
    }
  };

  const renderChat = ({ type, message }, index) => {
    if (type === "bot") {
      return (
        <div key={index} className={classes.botChatCont}>
          <div className="Mssg">
            <Avatar className={classes.botAvatar}>
              <StarsIcon />
            </Avatar>
          </div>
          <Card className={[classes.botReply, "message"].join(" ")}>
            {message}
          </Card>
        </div>
      );
    }

    return (
      <div key={index} className={classes.userChatCont}>
        <Card className={classes.userReply}>{message}</Card>
        <Avatar className={classes.userAvatar}>
          <PersonOutlineIcon />
        </Avatar>
      </div>
    );
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      getBotMsg();
      e.preventDefault();
    }
  };

  const testRender = () => {
    if (loading === true) return <Loader open={true} />;
    else
      return <> {chatHistory.map((item, index) => renderChat(item, index))} </>;
  };

  return (
    <>
      <div className={classes.chatCont} id="scrolldiv">
        {/* The main chat screen */}
        {testRender()}
        <div ref={chatEndRef} />
      </div>
      {/* Message box */}
      <div className={classes.behindText}>
        <TextField
          multiline
          rowsMax="2"
          placeholder="Message"
          variant="outlined"
          className={classes.textField}
          value={userChat}
          onKeyPress={onKeyPress}
          onChange={(e) => setUserChat(e.target.value)}
          inputRef={inputRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {!speechNotAvailable ? checkListening() : null}
                <SendIcon onClick={getBotMsg} />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
};

export default memo(ChatBot);
