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
          //   channel: 'C01MZ027KUM',
          blocks: [
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  '*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here',
              },
              accessory: {
                type: 'image',
                image_url: image,
                alt_text: 'alt text for image',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  '*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft.',
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg',
                alt_text: 'alt text for image',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  '*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder.',
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg',
                alt_text: 'alt text for image',
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Farmhouse',
                    emoji: true,
                  },
                  value: 'click_me_123',
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Kin Khao',
                    emoji: true,
                  },
                  value: 'click_me_123',
                  url: 'https://google.com',
                },
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Ler Ros',
                    emoji: true,
                  },
                  value: 'click_me_123',
                  url: 'https://google.com',
                },
              ],
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
