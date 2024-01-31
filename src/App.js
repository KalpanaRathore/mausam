import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch, FaSun } from "react-icons/fa";

const api = {
  key: "cee6a18753fb69cb416eb310545fac71",
  base: "https://api.openweathermap.org/data/2.5/",
};

const AppContainer = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
  background-image: url('weatherimg.png');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background-color: rgba(52, 152, 219, 0.8);
  color: #fff;
  padding: 20px;
  width: 100%;
`;

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px 0 0 5px;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Location = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Temperature = styled.p`
  font-size: 36px;
`;

const Condition = styled.p`
  font-size: 20px;
`;

const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <AppContainer>
      <Header>
        <h1>Weather App</h1>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Enter city/town..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton onClick={searchPressed}>
          <FaSearch />
        </SearchButton>
      </SearchContainer>

      {typeof weather.main !== "undefined" ? (
        <WeatherInfo>
          <Location>{weather.name}</Location>
          <Temperature>{weather.main.temp}°C</Temperature>
          <Condition>
            <FaSun />
            {weather.weather[0].main} ({weather.weather[0].description})
          </Condition>
        </WeatherInfo>
      ) : (
        "searching for city.."
      )}
    </AppContainer>
  );
};

export default App;
