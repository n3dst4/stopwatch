stopwatch.js
============

Lightweight stopwatch for ad-hoc timings in JS.

Usage:
------
stopwatch.start(label);  // start timing label
stopwatch.stop(label);   // stop timing label
stopwatch.report();      // return a string showing timed labels
stopwatch.reset();       // clear all labels

Example:
--------
stopwatch.start("Long difficult task");
stopwatch.start("Particular subtask");
stopwatch.sop("Particular subtask");
stopwatch.stop("Long difficult task");
alert(stopwatch.report());

Notes
-----
You can start() and stop() any number of labels. They are all tracked
independently.

Tests
-----
Run `node test-server.js` to fire up a simple webserver and load the tests in 
your browser.