import React, { Component } from "react";
import { render } from "react-dom";
import { Knob } from "react-rotary-knob";
import * as skins from "react-rotary-knob-skin-pack";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "6rem"
};

const LimitedKnob = ({ propValue, propHandleOnChange }) => {
  const propV = propValue;
  const handleOnChange = propHandleOnChange;

  //let { value, ...rest } = this.props;

  return <Knob value={propV} onChange={handleOnChange} />;
};

const App = () => (
  <div style={styles}>
    <LimitedKnob
      style={{ display: "inline-block" }}
      min={0}
      max={1000}
      unlockDistance={0}
      preciseMode={false}
      width={200}
      height={200}
      skin={skins.s12}
    />
  </div>
);

render(<App />, document.getElementById("root"));

export default LimitedKnob;
