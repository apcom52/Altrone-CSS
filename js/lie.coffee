# ЛжеQuery
window.$ = (@selector) ->
	@el = document.querySelectorAll(@selector)
	@classes = @getClassNames

	@clear = () ->
		@el.innerHTML = null;
		@

	@getClassNames = () ->
		classString = @el[0].className
		@classes = classString.split(' ')
		@classes

	@addClass = (newClass) ->
		@classes.append(newClass)
		classString = ''
		for cl in @classes
			classString += cl + ' '
		console.log classString
		@
	
	@


class altQuery
	constructor: (@selector = "") ->
		@el = @all(@selector)
		@classNames = @el.className
		return @

	all: (selector = "") ->
		current = document.querySelectorAll(selector)
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