import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link, hashHistory} from 'react-router';

import query from '../queries/fetchSongs';


import gql from 'graphql-tag';


class SongCreate extends Component {
  constructor(props){
    super(props);
    this.state= { title :'' }
  }

  onSubmit (event)  {
    event.preventDefault();
    this.props.mutate({
      variables :{
        title: this.state.title,
      },
      refetchQueries:[{query }]
    })
    .then((result) => {
      console.log(result);
     return hashHistory.push('/');
    });
  }


  render() {
    return(
      <div>
      <Link
        to="/"
      >
        Home
      </Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}> 
            <label >Song Title</label>
            <input 
              onChange={event => this.setState({title: event.target.value})}
              value={this.state.title}
            />
        </form>
      </div>
    )
  }


}

const mutation = gql`
mutation AddSong($title: String)  {
  addSong (title: $title) {
    id
    title
  }
}
`;


export default graphql(mutation)(SongCreate)