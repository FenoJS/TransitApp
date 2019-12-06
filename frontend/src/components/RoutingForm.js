import React, { Component } from 'react';

import submitIcon from '../assets/images/submit-icon.png';
import styles from './RoutingForm.module.scss';

console.log(styles);

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

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleRouteSubmit();
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.getMarkerFromAddress(e.target.value, e.target.name);
      console.log(e.target);
    }
  };

  render() {
    console.log('render Form', this.props);
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <img
            src={this.props.startMarkerIcon}
            alt=""
            className={styles.inputImg}
          />
          <input
            type="text"
            placeholder="Punk początkowy..."
            value={this.state.startDirection}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            name="startDirection"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img
            src={this.props.goalMarkerIcon}
            alt=""
            className={styles.inputImg}
          />
          <input
            type="text"
            placeholder="Punk docelowy..."
            value={this.state.goalDirection}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            name="goalDirection"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src={submitIcon} alt="" className={styles.inputImg} />
          <input
            type="submit"
            className={styles.submit}
            value="Szukaj Połączenia"
            disabled={this.props.isLoading}
          />
        </div>
      </form>
    );
  }
}

export default RoutingForm;
