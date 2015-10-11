/**
 * S7 counter library
 *
 * Used to make count down functionality on websites, like counter to some event
 * or make to grow number of something by time ( for exmple add one satisfied clients over
 * hour :))
 *
 * @author  Nenad Paic@S7design <npaic@s7designcreative.com>
 * @version 0.1
 * @since   0.1
 *
 * Website for more informations: www.s7designcreative.com
 */

'use strict';

/**
 * Library for count down functionality
 *
 * @type {Object}
 */
var s7_counter = s7_counter || {};

/**
 * Set initial values
 *
 * @param  {Object}
 * @return {Object}
 */
s7_counter.init = function(configuration){

	s7_counter.setStartTime(configuration.start_time);
	s7_counter.setTargetTime(configuration.end_time);
	s7_counter.setStartingNumberEvents(configuration.start_point_event);

	return this;
};

/**
 * Start time for count down ( UNIX time format )
 * @type {Int}
 */
s7_counter.startTime = "";

/**
 * Targeted time for count down ( UNIX time format )
 * @type {Int}
 */
s7_counter.endTime = "";

/**
 * Define default value, how many times event has occurred start number 
 * ( for example how many users are registered in given time )
 *
 * @type {Number}
 */
s7_counter.eventOccurendTimesStart = 0;

/**
 * Add this number to eventOccurendTimesStart value
 *
 * @type {Number}
 */
s7_counter.eventOccurendTimesAdd = 0;

/**
 * Set initial counting number
 *
 * @param {Number}
 */
s7_counter.setStartingNumberEvents = function(initValue){

	this.eventOccurendTimesStart = initValue;
};

/**
 * Set add amount to init value of event counting
 *
 * @param {Number}
 */
s7_counter.setAddNumberEvents = function(addValue){

	this.eventOccurendTimesAdd = this.eventOccurendTimesStart + addValue;
}

/**
 * Set start time for counting
 *
 * @param {Int}
 */
s7_counter.setStartTime = function(startTime){

	this.startTime = startTime;
}

/**
 * Set target time for counter
 *
 * @param {Int}
 */
s7_counter.setTargetTime = function(endTime){

	this.endTime = endTime;
};

/**
 * Calculate difference between start and ending time
 *
 * @return {Int}
 */
s7_counter.calculateTimeDiff = function(){

	return this.endTime - this.startTime;
}

/**
 * Convert UNIX time to human readable time h:m:s
 *
 * @param  {Int}
 *
 * @return {String}
 */
s7_counter.transformToHMS = function(duration){

        var seconds   = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours   = parseInt((duration/(1000*60*60)));

        hours   = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
};

/**
 * Get time difference in format h:m:s
 *
 * @return {String}
 */
s7_counter.getDurration = function(){

	return this.transformToHMS(this.calculateTimeDiff());
}

/**
 * Get number of events for time difference per hour
 *
 * @return {Number}
 */
s7_counter.getNumberOfEvents = function(){

	var timeValue = this.transformToHMS(this.calculateTimeDiff()).split(':');

	return this.eventOccurendTimesStart + parseInt(timeValue[0]); 
}

module.exports = s7_counter;
