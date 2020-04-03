import React, { useState, useEffect, useRef, useReducer } from "react";

import logo from "./logo.svg";
import "./App.css";
import { send } from "q";
import Knob1 from "./Components/Knob1";
import { Knob } from "react-rotary-knob";
import * as skins from "react-rotary-knob-skin-pack";

function App() {
  const [clicked, setClicked] = useState("");
  const [source, setSource] = useState("");
  const [isPlay, setIsPlay] = useState(true);
  const [value, setValue] = useState(0);
  const [samplePlaying, setSamplePlaying] = useState("Volume:0");
  const [volumeValue, setVolumeValue] = useState(0);
  const [power, setPower] = useState(false);
  const [isHeard, setIsHeard] = useState("");
  const [audioFiles, setAudioFiles] = useState([
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/back+roll+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/all_ganjaman_let_loose.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/dubsiren2+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/bass+1+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/up2semi+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/up7semi+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/full+amen+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/chop1+wav.wav",
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/chop2+wav.wav"
  ]);

  let qRef = useRef();
  let wRef = useRef();
  let eRef = useRef();
  let aRef = useRef();
  let sRef = useRef();
  let dRef = useRef();
  let zRef = useRef();
  let xRef = useRef();
  let cRef = useRef();
  let ganjaRef = useRef();
  let amenRef = useRef();
  let emptyRef = useRef();

  //function that handles keyPress events

  const handleUserKeyPress = event => {
    const { key, keyCode } = event;

    if (keyCode === 81) {
      playAudio(qRef.current);
      setSamplePlaying("Backward-Loop");
    }

    if (keyCode === 87) {
      playAudio(wRef.current);
      setSamplePlaying("Ragga-Vocal-1");
    }

    if (keyCode === 69) {
      playAudio(eRef.current);
      setSamplePlaying("Dub-Siren");
    }

    if (keyCode === 65) {
      playAudio(aRef.current);
      setSamplePlaying("Bass-1");
    }

    if (keyCode === 83) {
      playAudio(sRef.current);
      setSamplePlaying("Bass-2");
    }

    if (keyCode === 68) {
      playAudio(dRef.current);
      setSamplePlaying("Bass-3");
    }

    if (keyCode === 90) {
      playAudio(zRef.current);
      setSamplePlaying("Drum-loop-FULL");
    }

    if (keyCode === 88) {
      playAudio(xRef.current);
      setSamplePlaying("Drum-loop-ROLL-1");
    }

    if (keyCode === 67) {
      playAudio(cRef.current);
      setSamplePlaying("Drum-loop-ROLL-2c");
    }
  };

  // useEffect() used to listen for "keydown" event - calls handleUserKeyPress as a callback

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  // sound samples
  for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
  }

  function preloadAudio(url) {
    var audio = new Audio();
    audio.src = url;
  }

  // function that plays sound samples and resets player to zero
  function playAudio(e) {
    if (power == true) {
      setIsHeard(e);

      e.play();
      e.currentTime = 0;
      console.log(e.paused);
      setSamplePlaying(e.title);

      e.volume = value / 100;
    } else if (power == false) {
      e.volume = 0;
    }
  }

  function powerChange() {
    setPower(!power);
    if (power == true && isHeard) {
      isHeard.pause();
      isHeard.currentTime = 0;
    }
  }

  function handleOnChange(val) {
    //ignore change if distance is greater than defined
    //here we use a distance of 200 because our max value is 1000
    //change if needed
    const maxDistance = 200;
    let distance = Math.abs(val - { value });
    if (distance > maxDistance) {
      return;
    } else {
      setValue(val);
      setSamplePlaying("Volume:" + Math.floor(val));
    }
  }

  //functions for setting pads that "choke" each other
  //event listener (click) and handleClick function
  /*
  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  const handleClick = event => {
    const { target } = event;

    setSource(target.name);
  };
  //urls as variables
  let ganja =
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/all_ganjaman_let_loose.wav";
  let amen =
    "https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/full+amen+wav.wav";

  //

  function playAudioChoke(e) {
    //setSource(ganja);
    setTimeout(function() {
      e.load();
      e.play();
    }, 0);
  }
*/
  return (
    <div className="App" id="drum-machine">
      {/* Choke elements  
      <audio src={source} ref={emptyRef}></audio>
      <button
        className="choke"
        name={ganja}
        onClick={() => playAudioChoke(emptyRef.current)}
        ref={ganjaRef}
      >
        ganja
      </button>
      <button
        className="choke"
        name={amen}
        onClick={() => playAudioChoke(emptyRef.current)}
        ref={amenRef}
      >
        amen
      </button>

       End of choke elements  */}
      <nav id="nav">
        <img
          id="logo"
          src="https://freecodecampassets.s3.us-east-2.amazonaws.com/Lucid+Media+Logos+2020/SVG+Lime+LogoAsset+7.svg"
        />
        <img
          id="lucid-title"
          src="https://freecodecampassets.s3.us-east-2.amazonaws.com/Lucid+Media+Logos+2020/SVG+Lime+Lucid+NameAsset+8.svg"
        />
      </nav>

      <div className="volume-box">
        <div id="knob-wrapper">
          <Knob
            id="knob"
            skin={skins.s15}
            preciseMode={false}
            onChange={handleOnChange}
            unlockDistance={0}
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        </div>
        {power == true && (
          <div id="display">
            <div id="sample-text">{samplePlaying}</div>
          </div>
        )}
        {power == false && <div id="display"></div>}
        <div class="onoffswitch" id="switch">
          <input
            type="checkbox"
            name="onoffswitch"
            className="onoffswitch-checkbox"
            id="myonoffswitch"
            onChange={powerChange}
          />
          <label className="onoffswitch-label" for="myonoffswitch">
            <span className="onoffswitch-inner"></span>
            <span className="onoffswitch-switch"></span>
          </label>
        </div>
        <div id="button-well">
          <div className="Button-box" id="button-box">
            <button
              className="drum-pad"
              id="Backward-Loop"
              onClick={() => playAudio(qRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/back+roll+wav.wav"
                type="audio/ogg"
                className="clip"
                id="Q"
                ref={qRef}
                title="Backward-Loop"
              ></audio>
              Q
            </button>
            <button
              className="drum-pad"
              id="Ragga-Vocal-1"
              onClick={() => playAudio(wRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/all_ganjaman_let_loose.wav"
                type="audio/ogg"
                className="clip"
                id="W"
                ref={wRef}
                title="Ragga-Vocal-1"
              ></audio>
              W
            </button>
            <button
              className="drum-pad"
              id="Dub-Siren"
              onClick={() => playAudio(eRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/dubsiren2+wav.wav"
                type="audio/ogg"
                className="clip"
                id="E"
                ref={eRef}
                title="Dub-Siren"
              ></audio>
              E
            </button>
            <button
              className="drum-pad"
              id="Bass-1"
              onClick={() => playAudio(aRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/bass+1+wav.wav"
                type="audio/ogg"
                className="clip"
                id="A"
                ref={aRef}
                title="Bass-1"
              ></audio>
              A
            </button>
            <button
              className="drum-pad"
              id="Bass-2"
              onClick={() => playAudio(sRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/up2semi+wav.wav"
                type="audio/ogg"
                className="clip"
                id="S"
                ref={sRef}
                title="Bass-2"
              ></audio>
              S
            </button>
            <button
              className="drum-pad"
              id="Bass-3"
              onClick={() => playAudio(dRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/up7semi+wav.wav"
                type="audio/ogg"
                className="clip"
                id="D"
                ref={dRef}
                title="Bass-3"
              ></audio>
              D
            </button>
            <button
              className="drum-pad"
              id="Drum-loop-FULL"
              onClick={() => playAudio(zRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/full+amen+wav.wav"
                type="audio/ogg"
                className="clip"
                id="Z"
                ref={zRef}
                title="Drum-loop-FULL"
              ></audio>
              Z
            </button>
            <button
              className="drum-pad"
              id="Drum-loop-ROLL-1"
              onClick={() => playAudio(xRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/chop1+wav.wav"
                type="audio/ogg"
                className="clip"
                id="X"
                ref={xRef}
                title="Drum-loop-ROLL-1"
              ></audio>
              X
            </button>
            <button
              className="drum-pad"
              id="Drum-loop-ROLL-2"
              onClick={() => playAudio(cRef.current)}
            >
              <audio
                src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/chop2+wav.wav"
                type="audio/ogg"
                className="clip"
                id="C"
                ref={cRef}
                title="Drum-loop-ROLL-2"
              ></audio>
              C
            </button>
          </div>
        </div>
      </div>
      <div id="bottom-banner">
        <div id="credits">Design and Coding - G. Hauschildt</div>
      </div>
    </div>
  );
}

export default App;
