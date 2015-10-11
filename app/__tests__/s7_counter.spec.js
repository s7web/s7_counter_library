jest.dontMock('../s7_counter');

describe('function start time', function(){

	it('schould set start time for counter', function(){

		var s7_counter = require('../s7_counter.js');
		var startTime = new Date();
		s7_counter.setStartTime(startTime);

		expect(s7_counter.startTime).toBe(startTime);
	});
});

describe('function target time', function(){

	it('should set target time', function(){
		
		var s7_counter = require('../s7_counter.js');
		var endTime    = new Date();
		s7_counter.setTargetTime(endTime);
		expect(s7_counter.endTime).toBe(endTime);
	})
});

describe('function should calculate time defference', function(){
	
	it('Should calculate time difference between two times', function(){

		var s7_counter = require('../s7_counter.js');
		var startTime  = new Date();
		var endTime    = new Date('October 22, 2015 11:13:00'); 
		var diff       = endTime - startTime;
		s7_counter.setStartTime(startTime);
		s7_counter.setTargetTime(endTime);

		expect(s7_counter.calculateTimeDiff()).toBe(diff);
	})
});

describe('function to get human readable time and events', function(){

	it('should make time conversion from UNIX to human readable in format h:m:s', function(){

		var s7_counter = require('../s7_counter.js');
		var startTime  = new Date('October 20, 2015 10:12:58');
		var endTime    = new Date('October 22, 2015 11:13:00'); 
		var diff       = endTime - startTime;

		expect(s7_counter.transformToHMS(diff)).toBe('49:00:02');
	});

	it('It should set starting events', function(){

		var s7_counter  = require('../s7_counter.js');
		var startEvents = 10;
		s7_counter.setStartingNumberEvents(startEvents);

		expect(s7_counter.eventOccurendTimesStart).toBe(startEvents);
	});

	it('It should set addition events', function(){

		var s7_counter    = require('../s7_counter.js');
		var addtionEvents = 10;
		var startEvents   = 10;

		s7_counter.setStartingNumberEvents(startEvents);
		s7_counter.setAddNumberEvents(addtionEvents);

		expect(s7_counter.eventOccurendTimesAdd).toBe(20);
	});

	it('It should return number of events', function(){

		var s7_counter     = require('../s7_counter.js');
		var numberOfEvents = s7_counter.init({
			start_time: new Date('October 22, 2015 10:12:58'),
			end_time  : new Date('October 22, 2015 11:13:00'),
			start_point_event: 10
		}).getNumberOfEvents();

		expect(numberOfEvents).toBe(11);
	});

	it('It should return human readable time diff', function(){

		var s7_counter   = require('../s7_counter.js');
		var timeReadable = s7_counter.init({
			start_time: new Date('October 22, 2015 10:12:58'),
			end_time  : new Date('October 22, 2015 11:13:00'),
			start_point_event: 0
		}).getDurration();

		expect(timeReadable).toBe('01:00:02');
	});
});