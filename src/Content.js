import React, { Component } from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_GIPHYKEY;

class Content extends Component {
  componentDidMount() {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=420&rating=pg-13`
      )
      .then((res) => {
        console.log('in response', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return <div></div>;
  }
}

export default Content;
