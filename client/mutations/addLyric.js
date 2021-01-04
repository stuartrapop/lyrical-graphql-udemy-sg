import gql from 'graphql-tag';

export default  gql`
mutation AddLyric( $songId: ID!, $content: String ){
  addLyricToSong (songId: $songId, content: $content){
    id,
    title,
    lyrics{
      id,
      content
    }
  }
}
`;
