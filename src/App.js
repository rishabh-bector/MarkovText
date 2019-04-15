import React, { Component } from 'react';
import { Box, Button, Grid, Heading, Text, TextArea, Grommet } from 'grommet';

import { LoadingCard } from './LoadingCard'

const theme = {
  global: {
    font: {
      family: 'roboto',
      size: '14px',
      height: '20px',
    },

    colors: {
      brand: '#ff5722',
    }
  },
}

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
)

var l1 = 0
var l2 = 0
var l3 = 0

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: '',

      loading: false,
    }
  }

  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          <Box flex alignSelf='center' justify='center' width='large'>

            {!this.state.loading && <Box>

              <Heading level='3' alignSelf='center'>Markov Text Generator</Heading>

              <Box alignSelf='center' padding>
                <Grid
                  rows={['small']}
                  columns={['small', 'medium']}
                  areas={[
                    { name: 'text', start: [0, 0], end: [0, 0] },
                    { name: 'input', start: [1, 0], end: [1, 0] },
                  ]}
                  fill={false}
                  gap='small'
                >

                  <Box gridArea='text' justify='center' alignSelf='center'>
                    <Text>Input:</Text>
                  </Box>

                  <Box gridArea='input' justify='center' alignSelf='center'>
                    <TextArea onChange={this.inputOnChange}></TextArea>
                  </Box>

                </Grid>
              </Box>

              <Box alignSelf='center' justify='center'>
                <Button label='Train' onClick={this.train}></Button>
              </Box>

            </Box>}

            {this.state.loading && <Box>

              <Heading level='3' alignSelf='center'>Training...</Heading>

              <LoadingCard
                l1={l1}
                l2={l2}
                l3={l3}
              ></LoadingCard>

            </Box>}

          </Box>
        </Box>
      </Grommet>
    );
  }

  inputOnChange = (event) => {
    this.setState({input: event.target.value})
  }

  train = (input) => {
    this.setState({ loading: true })
  }
}

export default App;
