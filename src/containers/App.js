import React, { Component } from 'react';

import './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
class App extends Component {
  constructor(props) {
    super(props);
    console.log('[app.js]constructor');
    // this.state
  }
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state) {
    console.log("app.js getd", props);
    return state;
  }
  // componentWillMount() {
  //   console.log("COmponent will mount, prepare some state");
  // }
  /**componentDidMount() is invoked immediately after a component is mounted 
   * (inserted into the tree). Initialization that requires
   *  DOM nodes should go here. If you need to load data from a remote endpoint,
   *  this is a good place to instantiate the network request. */
  componentDidMount() {
    console.log("app.js COmponent did mount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("app.js SHould component update");
    return true;
  }
  /**
   * componentDidUpdate() is invoked immediately after updating occurs. 
   * This method is not called for the initial render.
   * goodplace for http requrest
   */
  componentDidUpdate() {
    console.log("app.js Component did update");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    console.log("app.js render");
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }

    return (
      <div className="App">
        <button onClick={() => {
          this.setState({
            showCockpit: false,
          })
        }}>Show Cockpit</button>
        {this.state.showCockpit ?
          <Cockpit
            title={this.props.appTitle}
            personsLength={this.state.persons.length}
            togglePerson={this.togglePersonsHandler}
          /> : null}
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}


export default App;
