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

  handleSubmit = async e => {
    console.log('submit');
    e.preventDefault();
    const data = await fetch(
      'http://localhost:8080/otp/routers/default/plan?fromPlace=52.27315,21.06302&toPlace=52.25513,21.03436&date=2019-08-26&time=12:00'
    ).then(res => res.json());
    console.log(data.plan.itineraries);
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
          <input type="submit" value="Szukaj Połączenia" />
        </div>
      </form>
    );
  }
}

export default RoutingForm;
