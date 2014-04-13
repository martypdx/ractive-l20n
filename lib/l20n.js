var Ractive = require('ractive')

module.exports = {
	index: function(template){
		var matches = {}
		find(template, '')
		return matches

		function find(each, path){
			if(!each) { return }
			if(typeof each === 'string'){
				matches[path] = each
			} else if(Array.isArray(each)) {
				each.forEach(function(child, index){
					find(child, (path ? path + '.' : '') + index)
				})
			} else {
				find(each.f, path + '.f')
			}
		}
	},
	translate: function(template, translation){
		var r = new Ractive({
			data: template
		})
		r.set(translation)
		return r.data
	}
}