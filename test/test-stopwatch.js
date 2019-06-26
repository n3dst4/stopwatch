/*jshint quotmark: false */
/*globals describe, it, chai, stopwatch */
"use strict";
var isModule = typeof require !== "undefined";

var stopwatch = isModule ? require("../stopwatch") : window.stopwatch;
var chai = isModule ? require("chai") : window.chai;

describe('stopwatch', function() {
    var testDuration = 200;
    var margin = testDuration / 10;
    this.timeout(testDuration * 20);
    this.slow(testDuration * 20);

    it('should time something and have a report', function (done) {
        stopwatch.start("foo");
        setTimeout(function () {
            stopwatch.stop("foo");
            var report = stopwatch.report();
            chai.expect(report.foo.total).to.be.closeTo(testDuration, margin);
            stopwatch.reset();
            report = stopwatch.report();
            chai.expect(report.foo).to.not.exist;
            done();
        }, testDuration);
    });

    it('should do nested timings', function (done) {
        stopwatch.start("foo");
        setTimeout(function () {
            stopwatch.start("bar");
            setTimeout(function () {
                stopwatch.stop("bar");
                setTimeout(function () {
                    stopwatch.start("baz");
                    setTimeout(function () {
                        stopwatch.stop("baz");
                        setTimeout(function () {
                            stopwatch.stop("foo");
                            var report = stopwatch.report();
                            chai.expect(report.foo.total).to.be.closeTo(testDuration * 5, margin);
                            chai.expect(report.bar.total).to.be.at.least(testDuration, margin);
                            chai.expect(report.baz.total).to.be.at.least(testDuration, margin);
                            done();                            
                        }, testDuration);
                    }, testDuration);
                }, testDuration);

            }, testDuration);


        }, testDuration);
    });
});