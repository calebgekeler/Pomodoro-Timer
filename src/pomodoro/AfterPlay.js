import React from "react";
import {minutesToDuration} from '../utils/duration';
import {secondsToDuration} from '../utils/duration';

function AfterPlay({data}){

  function displayHandler(){
    if(data.label === "Focusing"){
      return minutesToDuration(data.focusTimer)
    }
    if(data.label === "On Break"){
      return minutesToDuration(data.breakTimer)
    }
  }
  function ariaHandler(){
    if(data.label==="Focusing"){
      let result = ((data.counter/(data.focusTimer*60))*100)
      //console.log(result)
      return result;
    }
    if(data.label==="On Break"){
      let result = ((data.counter/(data.breakTimer*60))*100)
      //console.log(result)
      return result;
    }
  }


    return(
    <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">{data.label} for {displayHandler()} minutes</h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(data.countDownVar)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
          {!data.isTimerRunning ? <h2>PAUSED</h2> : ''}
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={ariaHandler()} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${ariaHandler()}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
    </div>
    )
}
    export default AfterPlay;