/*
 * Copyright and licence
 * ---------------------
 * Copyright (c) 2014, Neil de Carteret
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the <organization> nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY NEIL DE CARTERET ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NEIL DE CARTERET BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// see https://github.com/umdjs/umd/blob/master/returnExports.js
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.stopwatch = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    var stopwatch = {
        _times: {},
        start: function(label) {
            if (typeof this._times[label] === "undefined") {
                this._times[label] = {calls:0, start:0, total:0};
            }
            if (this._times[label].start) {
                this.stop(label);
            }
            this._times[label].calls++;
            this._times[label].start = new Date().getTime();
        },
        stop: function(label) {
            var diff;
            if (!this._times[label].start) {
                throw { name: "Stopwatch error",
                    message: "Can't stop \"" + label
                    + "\" because it hasn't been started yet."}
            }
            diff = new Date().getTime() - this._times[label].start;
            this._times[label].total += diff;
            this._times[label].start = null;
        },
        report: function (label) {
            if (typeof label !== "undefined") {
                return this._times[label];
            }
            return this._times;
        },
        reportString: function() {
            var rep, i;
            rep = "";
            for (i in this._times) {
                rep += i + ": " + this._times[i].total + "ms in " +
                    this._times[i].calls + " calls (avg. " +
                    Math.round(this._times[i].total/this._times[i].calls) + "ms)\n";
            }
            return rep;
        },
        reset: function() {
            this._times = {};
        }
    };

    return stopwatch;

}));




