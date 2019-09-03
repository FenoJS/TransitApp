import React, { Component } from 'react';

class RoutingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { startDirection: '', goalDirection: '' };
  }

  componentDidUpdate(prevProps) {
    const { startDirection, goalDirection } = this.props;

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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    console.log('submit');
    e.preventDefault();
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.getMarkerFromAddress(e.target.value, e.target.name);
      console.log(e.target);
    }
  };

  render() {
    console.log('render Form');
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Punk początkowy..."
          value={this.state.startDirection}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          name="startDirection"
        />
        <input
          type="text"
          placeholder="Punk docelowy..."
          value={this.state.goalDirection}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          name="goalDirection"
        />
        <input type="submit" value="Szukaj Połączenia" />
      </form>
    );
  }
}

export default RoutingForm;
