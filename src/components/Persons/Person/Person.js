import React, { Component } from 'react';

import './Person.css';
import Auxilliary from "../../../hoc/Auxilliary"
import withClass from "../../../hoc/withClass"
import PropTypes from 'prop-types'
class Person extends Component {
  render() {
    console.log("PersonJS rendering...");
    return (
      <Auxilliary>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
      </p>
        <p>{this.props.children}</p>
        <input type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </Auxilliary>
    )
  }
};
Person.propTypes = {
  //set up key value name, key is props name
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person, "Person");
