import React, { Component } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

class RoutingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { startDirection: '', goalDirection: '' };
  }
  // e =>
  // this.props.handleDirections(e.target.name, e.target.value)

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({
      query: `${this.state.startDirection} ${'Warszawa, Mazowieckie'}`,
    });
    console.log(results);
  };

  componentDidUpdate(prevProps) {
    const { startDirection, goalDirection } = this.props;
    // if (this.props.startDirection !== prevProps.startDirection) {
    //   this.setState({ startDirection: this.props.startDirection });
    // }
    // if (this.props.goalDirection !== prevProps.goalDirection) {
    //   this.setState({ goalDirection: this.props.goalDirection });
    // }
    if (
      startDirection !== prevProps.startDirection ||
      goalDirection !== prevProps.goalDirection
    ) {
      this.setState({
        startDirection,
        goalDirection,
      });
    }
  }

  render() {
    console.log('render Form');
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Punk początkowy..."
            value={this.state.startDirection}
            onChange={this.handleChange}
            name="startDirection"
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Punk docelowy..."
            value={this.state.goalDirection}
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
