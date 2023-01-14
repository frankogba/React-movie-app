import React from 'react';
import styled from 'styled-components';


const MovieContainer= styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 280px;
box-shadow: 0 3px 10px 0 #aaa;
`;

const CoverImage = styled.img`
height: 365px;
object-fit: cover;
`;

const MovieName = styled.span`
color: red;
font-size: 20px;
margin: 15px 0;
// white-space: nowrap;
// text-overflow: ellipsis;
// overflow: hidden;
`;

const InfoColumn = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;
const MovieInfo = styled.span`
font-size: 16px;
font-weight: 500;
color: red;
 text-transform: capitalized;
`;

const MovieCard = (props) => {
    const{Title, Year, imdbID, Type, Poster} = props.movie;
  return (
      <MovieContainer
        onClick={() => {
          props.onMovieSelect(imdbID);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
       <CoverImage src={Poster} alt={Title} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieCard;
