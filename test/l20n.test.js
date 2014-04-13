var assert = require('chai').assert,
	Ractive = require('ractive'),
	l20n = require('../lib/l20n.js')

describe('l20n', function(){

	describe('ractive assumptions', function(){
		it('sets root array by keypath', function(){
			var r = new Ractive({
				data: [ 'hello ', { t: 2, r: 'world' } ]
			})
			r.set({ 0: 'bonjour '})
			assert.deepEqual(r.data, [ 'bonjour ', { t: 2, r: 'world' } ])
		})
		it('sets 2 levels down by keypath', function(){
			var r = new Ractive({
				data: [{"t":7,"e":"p","f":["hello ",{"t":2,"r":"world"}]}]
			})
			r.set('0.f.0', 'bonjour ')
			assert.deepEqual(r.data, [{"t":7,"e":"p","f":["bonjour ",{"t":2,"r":"world"}]}] )
		})
	})

	var parse = Ractive.parse
	function translate(test){
		describe(test.in, function(){

		    var parsed = parse(test.in),
		    	dictionary
		    it('creates list of text usage', function(){
		    	//console.log(JSON.stringify(parsed))
		    	assert.deepEqual(parsed, test.parsed, 'ractive parse')
		    	dictionary = l20n.index(parsed)
		    	assert.deepEqual(dictionary, test.dictionary, 'dictionary')
		    	
		    })	
		   	it('replaces translated instances', function(){
		    	var translated = l20n.translate(parsed, test.translation)
		    	assert.deepEqual(translated, test.expected, 'post-translation')
		    	
		    })	

		})
	}

	var tests = [
		{
			in: 'hello {{world}}',
			parsed: [ 'hello ', { t: 2, r: 'world' } ],
			dictionary: { 0: 'hello '},
			translation: { 0: 'bonjour ' },
			expected: [ 'bonjour ', { t: 2, r: 'world' } ]
		},
		{
			in: '<p>hello {{world}}</p>',
			parsed: [{"t":7,"e":"p","f":["hello ",{"t":2,"r":"world"}]}],
			dictionary: { '0.f.0': 'hello '},
			translation: { '0.f.0': 'bonjour ' },
			expected: [{"t":7,"e":"p","f":["bonjour ",{"t":2,"r":"world"}]}]
		},
		{
			in: '<p><span>hello</span> {{world}}</p>',
			parsed: [{"t":7,"e":"p","f":[{"t":7,"e":"span","f":"hello"}," ",{"t":2,"r":"world"}]}],
			dictionary: { "0.f.0.f": "hello", "0.f.1": " " },
			translation: { "0.f.0.f": "bonjour" },
			expected: [{"t":7,"e":"p","f":[{"t":7,"e":"span","f":"bonjour"}," ",{"t":2,"r":"world"}]}]
		},
		{
			in: '{{#items}} hello there {{/}}',
			parsed: [{"t": 4, "r": "items", "f": " hello there "}],
			dictionary: { "0.f": " hello there " },
			translation: { "0.f": " bonjour la " },
			expected: [{"t": 4, "r": "items", "f": " bonjour la "}]
		}



		
	]

	tests.forEach(translate)

})