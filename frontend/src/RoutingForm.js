import React, { Component } from 'react';

class RoutingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Punk początkowy..."
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Punk docelowy..."
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Szukaj Połączenia" />
      </form>
    );
  }
}

export default RoutingForm;
