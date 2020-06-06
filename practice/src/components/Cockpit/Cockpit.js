import React, { useEffect } from "react";
import "./Cockpit.css";

const Cockpit = (props) => {
  //useEffect combine all functionality in one react Hook, execute every cycle of component
  useEffect(() => {
    console.log("cockpit.js useEffect");
    //send http request... componentdidmount and componentdidupdated combined in one effect
    const timer = setTimeout(() => {
      alert("effect");
    }, 1000);
    // return run BEFORE the main useEffect function runs, but AFTER the first render cycle
    return () => {
      clearTimeout(timer); //clean when cockpit is unmount
      // will NEVER SEE the clg if the cockpit won't be removed
      console.log("cockpit.js CLEAN up");
    };
  }, []);
  useEffect(() => {
    console.log("cockpit.js 2nd useEffect");
    // run for every update cycle
    return () => {
      console.log("cockpit.js 2nd CLEAN up");
    };
  });

  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push("red"); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push("bold"); // classes = ['red', 'bold']
  }
  return (
    <div className="Cockpit">
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button className="red" onClick={props.togglePerson}>
        Toggle Persons
      </button>
    </div>
  );
};

export default React.memo(Cockpit);
