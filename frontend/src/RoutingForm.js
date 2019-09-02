import React, { Component } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

class RoutingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
    console.log(e.target);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({
      query: `${this.state.value} ${'Warszawa, Mazowieckie'}`,
    });
    console.log(results);
  };

  render() {
    console.log('render Form');
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Punk początkowy..."
            value={this.props.startDirection}
            onChange={e =>
              this.props.handleDirections(e.target.name, e.target.value)
            }
            name="startDirection"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Punk docelowy..."
            value={this.state.value}
            onChange={this.handleChange}
            name="goalDirection"
          />
        </label>
        <input type="submit" value="Szukaj Połączenia" />
      </form>
    );
  }
}

export default RoutingForm;
