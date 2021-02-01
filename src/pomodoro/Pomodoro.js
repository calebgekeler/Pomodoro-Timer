import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration} from '../utils/duration';
//import {secondsToDuration} from '../utils/duration';
import AfterPlay from './AfterPlay'
import LandingDisplay from './LandingDisplay'



function Pomodoro() {

  const fnObj = {
    playPause: () => {
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
    },

    stopHandler: ()=>{
      fnObj.playPause();
      setData({...initialState})
    },

    timer: () =>{
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
    },
    focusPlusHandler: () => {
      data.focusTimer <=59 ? setData({[data.focusTimer]: data.focusTimer+=5}) 
      : alert('The maximum focus timer allowed is 60 minutes'); 
      setData({...data});
    },
    focusMinusHandler: ()=>{
      data.focusTimer >6 ? setData({[data.focusTimer]: data.focusTimer-=5}) 
      : alert('The minimum focus timer allowed is 5 minutes'); 
      setData({...data});
    },
    breakPlusHandler: () =>{
      data.breakTimer <= 14 ? setData({[data.breakTimer]: data.breakTimer+=1}) 
      : alert('The maximum break timer allowed is 15 minutes'); 
      setData({...data});
    },
    breakMinusHandler: () =>{
      data.breakTimer >= 2 ?  setData({[data.breakTimer]: data.breakTimer-=1}) 
      : alert('The minimum break timer allowed is 1 minute'); 
      setData({...data});
    },
  }

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
      fnObj.timer()
    },
    data.isTimerRunning ? 1000 : null
  );
  
  
  

  return (
    <div className="pomodoro">
      <LandingDisplay 
        data={data}
        fnObj={fnObj}
        stopHandler={fnObj.stopHandler} 
        playPause={fnObj.playPause}
        setData={setData}
      />
      <AfterPlay data={data} />
    </div>
  );
}

export default Pomodoro;
