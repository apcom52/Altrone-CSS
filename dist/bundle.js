(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingList = function (_React$Component) {
	_inherits(ShoppingList, _React$Component);

	function ShoppingList() {
		_classCallCheck(this, ShoppingList);

		return _possibleConstructorReturn(this, (ShoppingList.__proto__ || Object.getPrototypeOf(ShoppingList)).apply(this, arguments));
	}

	_createClass(ShoppingList, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "list list--color-blue" },
				React.createElement(
					"h1",
					null,
					"Shopping List"
				),
				React.createElement(
					"ul",
					null,
					React.createElement(
						"li",
						null,
						"Milk"
					),
					React.createElement(
						"li",
						null,
						"Spagetti"
					),
					React.createElement(
						"li",
						null,
						"Soap"
					)
				)
			);
		}
	}]);

	return ShoppingList;
}(React.Component);

ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(ShoppingList, { name: "Mark" })
), document.getElementById('app'));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhbHRyb25lLXJlYWN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTSxZOzs7Ozs7Ozs7OzsyQkFDSTtBQUNSLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSx1QkFBZjtBQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FERDtBQUVDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERDtBQUVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFGRDtBQUdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIRDtBQUZELElBREQ7QUFVQTs7OztFQVp5QixNQUFNLFM7O0FBZWpDLFNBQVMsTUFBVCxDQUNDO0FBQUE7QUFBQTtBQUNDLHFCQUFDLFlBQUQsSUFBYyxNQUFLLE1BQW5CO0FBREQsQ0FERCxFQUlDLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUpEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIFNob3BwaW5nTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJsaXN0IGxpc3QtLWNvbG9yLWJsdWVcIj5cclxuXHRcdFx0XHQ8aDE+U2hvcHBpbmcgTGlzdDwvaDE+XHJcblx0XHRcdFx0PHVsPlxyXG5cdFx0XHRcdFx0PGxpPk1pbGs8L2xpPlxyXG5cdFx0XHRcdFx0PGxpPlNwYWdldHRpPC9saT5cclxuXHRcdFx0XHRcdDxsaT5Tb2FwPC9saT5cclxuXHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcblx0PGRpdj5cclxuXHRcdDxTaG9wcGluZ0xpc3QgbmFtZT1cIk1hcmtcIiAvPlxyXG5cdDwvZGl2PixcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcclxuKTsiXX0=
