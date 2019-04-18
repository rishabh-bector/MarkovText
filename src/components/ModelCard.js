import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  RangeInput,
  TextArea,
  Meter,
  Grommet
} from "grommet";

export class ModelCard extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Box
        flex
        alignSelf="center"
        justify="center"
        //width="xlarge"
        margin={{ vertical: "xlarge" }}
        align="center"
      >
        <Heading level="3" alignSelf="center">
          Model Complete!
        </Heading>

        <Box>
          <Grid
            rows={["medium"]}
            columns={["medium", "medium"]}
            areas={[
              { name: "l1", start: [0, 0], end: [0, 0] },
              { name: "l2", start: [1, 0], end: [1, 0] }
            ]}
            alignContent="center"
            align="center"
            gap="large"
          >
            <Box gridArea="l1" alignSelf="center" align="center">
              <Grid
                rows={["50px", "25px", "50px"]}
                columns={["small", "small"]}
                areas={[
                  { name: "label", start: [0, 0], end: [0, 0] },
                  { name: "range", start: [1, 0], end: [1, 0] },
                  { name: "value", start: [0, 1], end: [1, 1] },
                  { name: "button", start: [0, 2], end: [1, 2] }
                ]}
                alignContent="center"
                align="center"
                gap="none"
              >
                <Box gridArea="label" align="center">
                  <Text>Length: </Text>
                </Box>

                <Box gridArea="range" align="center">
                  <RangeInput
                    value={this.props.length}
                    onChange={this.props.updateLength}
                    min="10"
                    max="500"
                  />
                </Box>

                <Box gridArea="value" align="center">
                  <Text>{this.props.length} Words</Text>
                </Box>

                <Box gridArea="button" align="center">
                  <Button label="Generate" onClick={this.props.generate} />
                </Box>
              </Grid>
            </Box>

            <Box gridArea="l2" alignSelf="center" align="center">
              <Heading level="4" alignSelf="center">
                Output:
              </Heading>
              <TextArea value={this.props.output} fill={true} />
            </Box>
          </Grid>
        </Box>
      </Box>
    );
  };
}
