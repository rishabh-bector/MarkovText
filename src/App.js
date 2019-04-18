import React, { Component } from "react";
import { Box, Button, Grid, Heading, Text, TextArea, Grommet } from "grommet";
import { LoadingCard } from "./components/LoadingCard";
import { ModelCard } from "./components/ModelCard";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

const theme = {
  global: {
    font: {
      family: "roboto",
      size: "14px",
      height: "20px"
    },

    colors: {
      brand: "#ff5722"
    },

    focus: {
      border: {
        color: "#ff5722"
      }
    }
  }
};

global.l1 = 0;
global.l2 = 0;
global.l3 = 0;

var w;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      page: "start",
      length: 25
    };
  }

  updateApp = () => {
    this.setState({ state: this.state });
  };

  changePage = page => {
    this.setState({ page: page });
  };

  train = () => {
    this.changePage("loading");
    this.startWASM(this.state.input);
  };

  generate = () => {
    w.postMessage({ func: "generate", length: this.state.length });
  };

  inputOnChange = event => {
    this.setState({ input: event.target.value });
  };

  lengthOnChange = event => {
    this.setState({ length: event.target.value });
  };

  startWASM = input => {
    console.log("Creating worker...");
    w = new Worker("worker.js");
    w.addEventListener("message", this.processMessage);

    w.postMessage({ func: "start" });
  };

  processMessage = e => {
    if (e.data.status == "ready") {
      w.postMessage({ func: "train", input: this.state.input });
    }

    if (e.data.status == "training") {
      global.l1 = e.data.l1;
      global.l2 = e.data.l2;
      global.l3 = e.data.l3;
      this.updateApp();
    }

    if (e.data.status == "done") {
      this.changePage("model");
    }

    if (e.data.status == "doneGen") {
      this.setState({ output: e.data.output });
    }
  };

  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          <Box flex alignSelf="center" justify="center" width="xlarge">
            {this.state.page == "start" && (
              <Box>
                <Heading level="3" alignSelf="center">
                  Markov Text Generator
                </Heading>

                <Box alignSelf="center" padding>
                  <Grid
                    rows={["small"]}
                    columns={["small", "medium"]}
                    areas={[
                      { name: "text", start: [0, 0], end: [0, 0] },
                      { name: "input", start: [1, 0], end: [1, 0] }
                    ]}
                    fill={false}
                    gap="small"
                  >
                    <Box gridArea="text" justify="center" alignSelf="center">
                      <Text>Input:</Text>
                    </Box>

                    <Box gridArea="input" justify="center" alignSelf="center">
                      <TextArea onChange={this.inputOnChange} />
                    </Box>
                  </Grid>
                </Box>

                <Box alignSelf="center" justify="center">
                  <Button label="Train" onClick={this.train} />
                </Box>
              </Box>
            )}

            {this.state.page == "loading" && (
              <Box>
                <Heading level="3" alignSelf="center">
                  Training...
                </Heading>

                <LoadingCard l1={global.l1} l2={global.l2} l3={global.l3} />
              </Box>
            )}

            {this.state.page == "model" && (
              <Box>
                <ModelCard
                  output={this.state.output}
                  generate={this.generate}
                  updateLength={this.lengthOnChange}
                  length={this.state.length}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;
