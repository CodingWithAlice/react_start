import React from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
  'c': 'Celsius',
  'f': 'Fahrenheit',
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) {
    return '';
  }
  const res = convert(input);
  return Math.round(res * 1000) / 1000;
}

function BoilingVerdict(props) {
  if(props.celsius >= 100) {
    return <p>水会沸腾</p>
  }
  return <p>水不会沸腾</p>
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>
          以{scaleNames[scale]}格式输入温度
        </legend>
        <input 
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}

class Caculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: '',
      scale: 'c',
    };
  }

  handleCelsiusChange(temperature) {
    this.setState({
      temperature,
      scale: 'c',
    })
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      temperature,
      scale: 'f',
    })
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius): temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit): temperature;

    return (
      <div>
        <TemperatureInput
          scale='c'
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale='f'
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict
          celsius={parseFloat(celsius)}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Caculator />,
  document.getElementById('root')
);
