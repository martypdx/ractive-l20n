var browserify = require('browserify'),
	fs = require('fs')

var l20n = browserify(),
	l20n_out = fs.createWriteStream('./ractive-l20n.js')
l20n.require('./lib/l20n', { expose: 'l20n' })
l20n.require('ractive')
l20n.bundle().pipe(l20n_out)
