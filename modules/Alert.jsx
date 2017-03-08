import React, {Component} from 'react';

class AlertHeader extends Component {
	render() {
		return (
			<div class="alert__header">{this.props.children}</div>
		)
	}
}

class AlertContent extends Component {
	render() {
		return (
			<div className="alert__content">{this.props.children}</div>
		)
	}
}

class Alert extends Component {
	render() {
		var color = this.props.color;
		if (this.props.header) {
			header = <AlertHeader>this.props.header</AlertHeader>
		} else {
			header = null;
		}

		var colorClass = "";
		if (color) {
			colorClass = "alert--color-" + color;
		}

		return (
			<div class="alert {colorClass}">
				{header}
				<AlertContent>{this.props.children}
			</div>
		)
	}
}