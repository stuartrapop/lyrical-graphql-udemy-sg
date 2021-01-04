import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props){
    super(props);
    this.state = { content :'' }
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("lyric", this.state.content);
    console.log("props", this.props);
    this.props.mutate({
      variables : {
        content: this.state.content,
        songId: this.props.songId5
      }
      
    })
    .then(() => this.setState({content: ''}));
    console.log("lyric", this.state.content);
    
  } 

  render() {

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input 
        value={this.state.content}
        onChange={event => this.setState({content: event.target.value})} />
      </form>

    );
  }
}

const mutation = gql`
mutation AddLyric($content: String , $songId: ID!, ){
  addLyricToSong (songId: $songId, content: $content){
    id,
    title,
    lyrics{
      id,
      content,
      likes
    }
  }
}
`;

export default graphql(mutation) (LyricCreate);