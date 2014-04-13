====
Ractive l20n
====

Experiment in localizing compiled Ractive templates.

```
var ractive = require('ractive'),
	template = '<p><span>hello</span> {{world}}</p>',
	parsed = ractive.parse(template)

var l20n = require('./lib/l20n.js'),
	dictionary = l20n.index(parsed)

// dictionary is map of keypaths and string 
// values extracted from the template:
//
// { "0.f.0.f": "hello", "0.f.1": " " }

//edit dictionary
dictionary['0.f.0.f'] = "bonjour"

var translated = l20n.translate(parsed, dictionary)

console.log(JSON.stringify(translated))
//<p><span>bonjour</span> {{world}}</p>
```

## install and use ##

Currently not yet packaged for npm, require the 
`./lib/l20n.js` file for node use. 

`ractive-l20n.js` is browserified version that includes Ractive.

## Editing the dictionary ##

Because the dictionary is _just_ JSON, idea is that editor could 
be built for making translations. `index.html` is sample web page
for editing the dictionary and seeing live changes. 

There is an issue iterating on keypath-like
properties, so the current editor is just a text area, as opposed
to individual fields. 

## whitespace ##

Currently pure whitespace nodes are returned as well. These could be
filtered out. One thing to bear in mind is that whitespace around text
is significant:

```<p>hello {{name}}</p>```

If we change the dictionary entry `"hello "` to "bonjour", template 
will render as "bonjourjean".

One possiblity would be to parse leading and trailing whitespace and
store seperate from the editing value.
