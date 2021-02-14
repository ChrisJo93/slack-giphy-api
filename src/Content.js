import React, { Component } from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_GIPHYKEY;
const request = `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=blazeit&rating=pg-13&limit=1`;
const token = process.env.REACT_APP_TOKEN;

class Content extends Component {
  state = {
    gif: [],
    header: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
  componentDidMount() {
    setInterval(this.timeCheck, 60000);
  }

  timeCheck = () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
    if (currentTime.includes('4:20') && currentTime.includes('PM')) {
      console.log('time');

      //this needs to be a function triggered by 420pm.
      axios
        .get(request)
        .then((res) => {
          // this.setState({
          //   gif: res.data.data.image_url, //grabbing gif url, setting it to gif state
          // });
          this.findConversations(res.data.data.image_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  findConversations = (image) => {
    axios
      .get(`https://slack.com/api/conversations.list`, {
        //hitting conversation list url, passing it auth header and token.
        //this is superfluous step if channel id is already available. But nice to have.
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //running api call to post to slack immediately after this list returns.
        //Again, postToSlack could potentially run immediately after getting gif, but, hey.
        this.postToSlack(image);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  postToSlack = (image) => {
    this.setState({
      gif: image,
    });

    axios
      .post(
        `https://slack.com/api/chat.postMessage`,

        {
          channel: 'C01N23MV28J',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: image,
              },
              accessory: {
                type: 'image',
                image_url: image,
                alt_text: 'alt text for image',
              },
            },
          ],
        },
        this.state.header
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <img src={this.state.gif} />
      </div>
    );
  }
}

export default Content;
