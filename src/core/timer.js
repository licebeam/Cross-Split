// I remembered seeing a neat timer class months ago on so I decided to use and modify it, found here:
//https://stackoverflow.com/questions/24724852/pause-and-resume-setinterval

import moment from "moment";
export default class TimeClass {
  constructor(name, callback, interval, maxFires = null) {
    this.remaining = 0;
    this.state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed
    this.name = name;
    this.interval = interval; //in ms
    this.callback = callback;
    this.maxFires = maxFires;
    this.pausedTime = 0; //how long we've been paused for
    this.startTimeStamp = null;
    this.currentTimeStamp = null;
    this.count = 0;
    this.fires = 0;
    this.currentTime = "";
  }

  proxyCallback() {
    //update out timer information
    this.currentTimeStamp = moment();
    this.count = +this.currentTimeStamp - +this.startTimestamp;
    if (this.maxFires !== null && this.fires >= this.maxFires) {
      this.stop();
      return;
    }
    this.lastTimeFired = new Date();
    this.fires++;
    this.currentTime = moment(this.count).utcOffset(0).format("HH:mm:ss.SS");
    this.callback();
  }

  start(resetTime) {
    if (resetTime) {
      this.startTimestamp = moment();
      console.log("Starting Timer " + this.name);
    }
    this.timerId = setInterval(() => this.proxyCallback(), this.interval);
    this.lastTimeFired = new Date();
    this.state = 1;
    this.fires = 0;
  }

  pause() {
    if (this.state !== 1 && this.state !== 3) return;

    console.log("Pausing Timer " + this.name);

    this.remaining =
      this.interval - (new Date() - this.lastTimeFired) + this.pausedTime;
    this.lastPauseTime = new Date();
    clearInterval(this.timerId);
    clearTimeout(this.resumeId);
    this.state = 2;
    this.callback();
  }

  resume() {
    if (this.state !== 2) return;

    this.pausedTime += new Date() - this.lastPauseTime;
    console.log(`Resuming Timer ${this.name} with ${this.remaining} remaining`);
    this.state = 3;
    this.resumeId = setTimeout(() => this.timeoutCallback(), this.remaining);
    this.callback();
  }

  timeoutCallback() {
    if (this.state !== 3) return;

    this.pausedTime = 0;
    this.proxyCallback();
    this.start(false);
  }

  stop() {
    if (this.state === 0) return;

    console.log(
      "Stopping Timer %s. Fired %s/%s times",
      this.name,
      this.fires,
      this.maxFires
    );
    clearInterval(this.timerId);
    clearTimeout(this.resumeId);
    this.currentTime = "";
    this.state = 0;
    this.callback();
  }

  //set a new interval to use on the next interval loop
  setInterval(newInterval) {
    console.log(
      "Changing interval from %s to %s for %s",
      this.interval,
      newInterval,
      this.name
    );

    //if we're running do a little switch-er-oo
    if (this.state === 1) {
      this.pause();
      this.interval = newInterval;
      this.resume();
    }
    //if we're already stopped, idle, or paused just switch it
    else {
      this.interval = newInterval;
    }
  }

  setMaxFires(newMax) {
    if (newMax !== null && this.fires >= newMax) {
      this.stop();
    }
    this.maxFires = newMax;
  }
}
