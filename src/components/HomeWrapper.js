import styled from 'styled-components';
import weatherCool from '../images/weather-cool.jpg';
import weatherHot from '../images/weather-hot.jpg';
import { FaSearch, FaThermometer } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { WiHumidity } from 'react-icons/wi';
import { WiTsunami } from 'react-icons/wi';
import { useState, useEffect } from 'react';

const Section = styled.section`
  width: 100%;
  height: 100vh;
  background: ${(props) =>
    props.source === true ? `url(${weatherCool})` : `url(${weatherHot})`};
  background-color: rgba(45, 5, 45, 0.5);
  background-size: cover;
  background-repeat: no-repeat;

  &:before {
    content: '';
    width: inherit;
    height: inherit;
    background-color: #111010ba;
    display: block;
    position: absolute;
  }
`;
const Input = styled.input.attrs((props) => ({
  placeholder: 'Enter a city name...',
}))`
  width: 230px;
  height: 35px;
  margin-top: 20px;
  margin-right: 20px;
  float: right;
  border-radius: 5px;
  background: #ec4848;
  color: wheat;
  padding: 5px;
  border: none;
  position: relative;
  transition: margin-left 0.2s ease-out;

  &[placeholder] {
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
const Container = styled.div`
  background-color: transparent;
  display: flex;
  width: 100%;
  height: 40%;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 1rem;
  bottom: 0;
  position: absolute;
  gap: 2px;
`;
const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.center === 'center' ? '200px' : '250px')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  border: 2px white;
  background-color: ${(props) =>
    props.background ? props.background : '#131920d9'};
  padding: 20px;
  color: white;
  position: ${(props) => (props.position ? props.position : 'relative')};
  top: ${(props) => (props.top ? props.top : 0)};
  left: ${(props) => (props.left ? props.left : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const HomeWrapper = () => {
  const [city, setCity] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [source, setSource] = useState(false);
  const API_KEY = 'f508acbb2d869a39828c56db4286c921';
  const reqUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    search();
    console.log(result);
    console.log(typeof result);
  }, [input]);

  const search = () => {
    fetch(reqUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
      });
  };
  const updateCity = (e) => {
    setCity(e.target.value);
  };
  const getInput = (e) => {
    e.preventDefault();
    setInput(city);
    setCity('');
  };
  const toggleSource = () => {
    if (!source) {
      setSource(true);
    } else {
      setSource(false);
    }

    console.log(source);
  };

  return (
    <IconContext.Provider value={{ color: '#ef8171', size: 40 }}>
      <Section source={source}>
        <form onSubmit={getInput}>
          <Input onChange={updateCity} value={city} />
        </form>
        <span style={{ position: 'absolute', right: 30, top: 27 }}>
          <FaSearch />
        </span>
        <button
          onClick={toggleSource}
          style={{
            height: 40,
            width: 150,
            border: 'none',
            marginLeft: 120,
            marginTop: 120,
            borderRadius: 4,
            color: 'white',
            backgroundColor: 'Navy',
            position: 'absolute',
          }}
        >
          {' '}
          I'm a button{' '}
        </button>
        <DivItem
          center="center"
          height="100px"
          background="transparent"
          top="25%"
          left="42%"
          margin="auto"
          position="absolute"
        >
          <h1 style={{ fontSize: 50 }}> Lagos </h1>
          <h6 style={{ fontSize: 50 }}>30°</h6>
        </DivItem>
        <Container>
          <DivItem style={{ flex: 2 }} />
          <DivItem>
            <FaThermometer />
            <h3></h3>
            <h1> Temperature </h1>
            <p>Today's a bit hot</p>
          </DivItem>
          <DivItem>
            <WiHumidity />
            <h3></h3>
            <h1>Humidity </h1>
            <p>Today's Humidity data</p>
          </DivItem>
          <DivItem>
            <WiTsunami />
            <h3></h3>
            <h1>Wind Speed</h1>
            <p>Today's Wind Speed</p>
          </DivItem>
        </Container>
      </Section>
    </IconContext.Provider>
  );
};

export default HomeWrapper;
