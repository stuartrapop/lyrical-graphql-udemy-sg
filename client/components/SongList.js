import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import { compose, graphql } from 'react-apollo';

import query from '../queries/fetchSongs';

class SongList extends Component {

  onSongDelete(id) {
    console.log(id);
    console.log("props", this.props);
    this.props.mutate({ variables: { id } })
    .then(() => this.props.data.refetch());
      
    ;
  }

  renderSongs  () {
    if(this.props.data.loading) { return <div>Loading</div>} 
    else 
    {
      console.log(this.props.data.songs);
    return this.props.data.songs.map(({id, title}) => {
      return (
      <li key={id} className="collection-item">
         <Link to={`/songs/${id}`}>{title}</Link> 
          <i 
          className="material-icons"
          onClick={()=> this.onSongDelete(id)}
          
          >delete
          
          </i>
      </li>
      );   
    })
  }
  }


  render() {
    
   return (
     <div>
        <ul className="collection">
        {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
    </div>
   );
  }
}


const mutation = gql`
mutation DeleteSong($id: ID){
  deleteSong (id: $id){
    id,
    title
  }
}
`;



export default graphql(mutation)(
  graphql (query)(SongList)
);
  