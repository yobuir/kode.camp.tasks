const EventEmitter = require('events');

class EventLogger extends EventEmitter {
  constructor() {
    super();
    this.totalEvents = [];
  }

  logEvent(title, description) {
    const timestamp = new Date();
    const event = { title, description, timestamp };
    this.totalEvents.push(event);
    this.emit('eventLogged', event);
  }

  displayEvents() {
    console.log('| event index. | event title       | event timestamp       |');
    console.log('|--------------|-------------------|------------------------|');
    this.totalEvents.forEach((event, index) => {
      console.log(`| ${index + 1}            | ${event.title.padEnd(17)} | ${event.timestamp.toString().padEnd(23)} |`);
    });
  }
}

const eventLogger = new EventLogger();

eventLogger.on('eventLogged', (event) => {
  console.log(`New Event Logged: ${event.title}`);
});
 
eventLogger.logEvent('Event 1', 'Description for Event 1');
eventLogger.logEvent('Event 2', 'Description for Event 2');
eventLogger.logEvent('Event 3', 'Description for Event 3');

eventLogger.displayEvents();
