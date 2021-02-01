import React from 'react';
import {minutesToDuration} from '../utils/duration';
import classNames from "../utils/class-names";




function LandingDisplay({data, fnObj}){

return(
<>
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
                onClick={fnObj.focusMinusHandler}
                disabled={data.displayTimer ? true : false}
              >
                <span className="oi oi-minus" id="focus-decrease"/>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={fnObj.focusPlusHandler}
                disabled={data.displayTimer ? true : false}
              >
                <span className="oi oi-plus" id="focus-increase"/>
              </button>
            </div>
          </div>
        </div>

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
                  onClick={fnObj.breakMinusHandler}
                  disabled={data.displayTimer ? true : false}
                >
                  <span className="oi oi-minus" id="break-decrease"/>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={fnObj.breakPlusHandler}
                  disabled={data.displayTimer ? true : false}
                >
                  <span className="oi oi-plus" id="break-increase"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              onClick={fnObj.playPause}
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
              onClick={fnObj.stopHandler}
              disabled={!data.isTimerRunning ? true: false}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
    </>
)}

export default LandingDisplay;