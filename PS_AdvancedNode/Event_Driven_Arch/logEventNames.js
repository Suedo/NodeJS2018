const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames()); 

/*
prints: [ 'foo', 'bar', Symbol(symbol) ]
i.e, the list of events listeners have been added for
if no listeners, it would give a blank array as o/p
*/