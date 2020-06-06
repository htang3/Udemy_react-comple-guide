import React, { Component, PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //     console.log("Persons.js getDerived...");
  //     return state
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log("persons.js should component update......");
  //     if (nextProps.persons !== this.props.persons ||
  //         nextProps.click !== this.props.click ||
  //         nextProps.changed !== this.props.changed) {
  //         return true; //if it continues updating, else stop
  //     }
  //     else {
  //         return false;
  //     }

  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("persons.js getSnapshot");
    return { message: "Snapshot!" };
  }
  componentDidUpdate(prevProps, prevState, Snapshot) {
    console.log("persons.js Component did update");
    console.log(Snapshot);
  }
  // anycode need to run before it will be removed, clean up work
  componentWillUnmount() {
    console.log("Persons.js component will unmount");
  }
  render() {
    console.log("Personsjs renders");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          key={person.id}
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          // key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
