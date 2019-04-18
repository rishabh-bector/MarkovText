import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  TextArea,
  Meter,
  Grommet
} from "grommet";

export class LoadingCard extends Component {
  render = () => {
    return (
      <Box
        flex
        alignSelf="center"
        justify="center"
        width="xlarge"
        margin={{ vertical: "xlarge" }}
      >
        <Grid
          rows={["xsmall", "xsmall"]}
          columns={["small", "small", "small"]}
          areas={[
            { name: "l1", start: [0, 0], end: [0, 0] },
            { name: "l2", start: [1, 0], end: [1, 0] },
            { name: "l3", start: [2, 0], end: [2, 0] },
            { name: "t1", start: [0, 1], end: [0, 1] },
            { name: "t2", start: [1, 1], end: [1, 1] },
            { name: "t3", start: [2, 1], end: [2, 1] }
          ]}
          fill={false}
          gap="large"
          alignContent="center"
          align="center"
          justifyContent="center"
        >
          <Box gridArea="l1" justify="center" alignSelf="center">
            <Meter
              values={[
                {
                  value: this.props.l1,
                  color: "brand"
                }
              ]}
              type="circle"
              alignSelf="center"
              round={true}
            />
          </Box>

          <Box gridArea="l2" justify="center" alignSelf="center">
            <Meter
              values={[
                {
                  value: this.props.l2,
                  color: "brand"
                }
              ]}
              type="circle"
              alignSelf="center"
              round={true}
            />
          </Box>

          <Box gridArea="l3" justify="center" alignSelf="center">
            <Meter
              values={[
                {
                  value: this.props.l3,
                  color: "brand"
                }
              ]}
              type="circle"
              alignSelf="center"
              round={true}
            />
          </Box>

          <Box gridArea="t1" justify="center" alignSelf="center">
            <Text alignSelf="center">States</Text>
          </Box>

          <Box gridArea="t2" justify="center" alignSelf="center">
            <Text alignSelf="center">State Changes</Text>
          </Box>

          <Box gridArea="t3" justify="center" alignSelf="center">
            <Text alignSelf="center">Probabilities</Text>
          </Box>
        </Grid>
      </Box>
    );
  };
}
