import React from "react";
import { FlipClock } from "reactflipclock-js";
import './Clock.css';

class Clock extends React.Component {
    state = { term: "" };
    onInputChange = () => {};
    componentDidMount() {
    };
    render() {
      return (
        <div className="clock">
          <FlipClock time={3600} clockFace="HoursCounter" />
        </div>
      );
    }
  }
  
  export default Clock;