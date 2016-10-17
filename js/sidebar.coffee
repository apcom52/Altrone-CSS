class Sidebar
	constructor:
		(@element, @options = undefined) ->
			@collection = undefined
			@collection ?= []