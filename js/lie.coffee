# ЛжеQuery

class altQuery
	constructor: (@selector = "") ->
		@el = @all(@selector)
		@classNames = @el.className
		console.log @el
		return @

	all: (selector = "") ->
		current = document.querySelectorAll(selector)
		console.log current
		current

	get: (selector = "") ->
		document.querySelector(selector)

	append: (content = "") ->
		@el.innerHTML += content;
		return @

	clear: ->
		@el.innerHTML = null
		return @

	remove: ->
		@el.parentNode.removeChild(@el)
		return @

example = new altQuery "#example"
console.log example