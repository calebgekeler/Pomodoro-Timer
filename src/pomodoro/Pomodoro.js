import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration} from '../utils/duration';
//import {secondsToDuration} from '../utils/duration';
import AfterPlay from './AfterPlay'



function Pomodoro() {

  let initialState={
    focusTimer: 25,
    breakTimer: 5,
    label: "Focusing",
    counter: 0,
    displayTimer: false,
    isTimerRunning:false,
    countDownVar: 0,
    displayClickCounter: 0,
  }

  
  let [data, setData] = useState({...initialState});

  //console.log('DATA OBJ', data);

  useInterval(
    () => {
      timer()
    },
    data.isTimerRunning ? 1000 : null
  );
  
  
  function timer(){
    if(data.countDownVar>0){
      setData({
      [data.countDownVar]: data.countDownVar-=1,
      [data.counter]: data.counter+=1
      });
      //console.log(data.ariaCounter)
      return setData({...data});
    }
    if(data.countDownVar===0 && data.label==="Focusing"){
      new Audio(`${process.env.PUBLIC_URL}/alarm/piece-of-cake-611.mp3`).play();
      setData({
        [data.countDownVar]: data.countDownVar = data.breakTimer*60,
        [data.label]: data.label = "On Break",
        [data.counter]: data.counter=0,
      });
      return setData({...data});
    }
    if(data.countDownVar===0 && data.label==="On Break"){
      new Audio(`${process.env.PUBLIC_URL}/alarm/piece-of-cake-611.mp3`).play();
      setData({
        [data.countDownVar]: data.countDownVar = data.focusTimer*60,
        [data.label]: data.label = "Focusing",
        [data.counter]: data.counter=0,
      });
        return setData({...data});
    }
  }

  function playPause() {
    setData({
      [data.displayTimer]: data.displayTimer = true, 
      [data.istimerRunning]: data.isTimerRunning = !data.isTimerRunning,
      [data.displayClickCounter]: data.displayClickCounter+=1
    })
    //setData({...data});
    if(data.displayClickCounter===1){
      setData({
        [data.countDownVar]: data.countDownVar = data.focusTimer*60,
      });
      return setData({...data})
    }
    return setData({...data})
  }

  function stopHandler(){
    playPause();
    setData({...initialState});
  }

  return (
    <div className="pomodoro">


{/* ********CONTROLS BUTTONS AT THE TOP FOR PLUS/MINUS*********** */}

{/*** Button that controls FOCUS DURATION ****/}
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(data.focusTimer)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={
                  () =>{data.focusTimer >6 ? setData({[data.focusTimer]: data.focusTimer-=5}) 
                  : alert('The minimum focus timer allowed is 5 minutes'); 
                  setData({...data})}}
                disabled={data.displayTimer ? true : false}
              >
                <span className="oi oi-minus" id="focus-decrease"/>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={
                  () => {data.focusTimer <=59 ? setData({[data.focusTimer]: data.focusTimer+=5}) 
                  : alert('The maximum focus timer allowed is 60 minutes'); 
                  setData({...data})}}
                disabled={data.displayTimer ? true : false}
              >
                <span className="oi oi-plus" id="focus-increase"/>
              </button>
            </div>
          </div>
        </div>





{/********* Button that controls BREAK DURATION *******/}
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {minutesToDuration(data.breakTimer)}
              </span>
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={
                    () =>{ data.breakTimer >= 2 ?  setData({[data.breakTimer]: data.breakTimer-=1}) 
                    : alert('The minimum break timer allowed is 1 minute'); 
                    setData({...data})}}
                  disabled={data.displayTimer ? true : false}
                >
                  <span className="oi oi-minus" id="break-decrease"/>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() =>{ 
                    data.breakTimer <= 14 ? setData({[data.breakTimer]: data.breakTimer+=1}) 
                    : alert('The maximum break timer allowed is 15 minutes'); 
                    setData({...data})}}
                  disabled={data.displayTimer ? true : false}
                >
                  <span className="oi oi-plus" id="break-increase"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>




{/****** PLAY PAUSE BUTTONS ***********/}
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !data.isTimerRunning,
                  "oi-media-pause": data.isTimerRunning,
                })}
              />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopHandler}
              disabled={!data.isTimerRunning ? true: false}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>

{/************* DISPLAY OF TIME REMAINING ***************/}
      {data.displayTimer ? 
      <AfterPlay data={data} />
      : ''}
    </div>
  );
}

export default Pomodoro;
