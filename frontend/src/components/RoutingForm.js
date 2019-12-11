import React, { Component } from 'react';

import submitIcon from '../assets/images/submit-icon.png';
import styles from './RoutingForm.module.scss';

class RoutingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { startDirection: '', goalDirection: '' };
  }

  componentDidUpdate(prevProps) {
    const { startDirection, goalDirection } = this.props;

    if (startDirection !== prevProps.startDirection || goalDirection !== prevProps.goalDirection) {
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
    }
  };

  render() {
    const { startMarkerIcon, goalMarkerIcon, isLoading } = this.props;
    const { startDirection, goalDirection } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <img src={startMarkerIcon} alt="" className={styles.inputImg} />
          <input
            type="text"
            placeholder="Punk początkowy..."
            value={startDirection}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            name="startDirection"
          />
        </div>
        <div className={styles.inputWrapper}>
          <img src={goalMarkerIcon} alt="" className={styles.inputImg} />
          <input
            type="text"
            placeholder="Punk docelowy..."
            value={goalDirection}
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
            disabled={isLoading}
          />
        </div>
      </form>
    );
  }
}

export default RoutingForm;
