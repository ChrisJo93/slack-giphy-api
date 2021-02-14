import React, { Component } from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_GIPHYKEY;
const request = `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=blazeit&rating=pg-13&limit=1`;
const token = process.env.REACT_APP_TOKEN;

class Content extends Component {
  state = {
    gif: [],
  };
  componentDidMount() {
    //this needs to be a function triggered by 420pm.
    axios.get(request).then((res) => {
      this.setState({
        gif: res.data.data.image_url, //grabbing gif url, setting it to gif state
      });
    });
    axios
      .post(`https://slack.com/api/conversations.list`, token)
      .then((res) => {
        console.log('in slack call', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <img src={this.state.gif} />
      </div>
    );
  }
}

export default Content;
