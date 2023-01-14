import React, { useState } from "react";
import Axios from "axios";
import './App.css';
import styled from "styled-components"
import MovieCompass from "./Components/MovieCard";
import MovieInfoCompass from "./Components/MovieInfoCard";




 export const API_KEY = "3fb29f2e";


const Container = styled.div`
display: flex;
flex-direction: column;
`;
const Header = styled.div`
display:  flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: blue;
color: white;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;
const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color: white;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color: whiite;
align-items: center;
`;

const SearchIcon = styled.img`
width: 30px;
height: 30px;
`;

const SearchInput = styled.input`
color: black;
font-size: 16px;
border: none;
outline: none;
margin left: 15px;

`;
const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;
gap: 24px;
`;
const Placeholder = styled.img`
  width: 320px;
  height: 320px;
  margin: 150px;
  opacity: 50%;
`;


function App() {

  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
     
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
   };
  return (
    
<Container>
    <Header>
                  <AppName>
                        <MovieImage src="/movie-log.png.jpg"/>
                               React Movie App
                   </AppName>
                   <SearchBox>
                          <SearchIcon src="/search-icons.png"/>
                          <SearchInput placeholder="Search Movie" 
                          value={searchQuery}
                          onChange={onTextChange} />
                   </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoCompass selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
      {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieCompass
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
           <Placeholder src="/React-movie-app/villa.png"/>
        )}

      </MovieListContainer>


  
</Container>
  );
}

export default App;
