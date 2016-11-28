import React, {Component} from 'react';

class ValidationInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			classes: '',
		}
	}

	validate(e) {
		var value = e.target.value;
		var pattern = /^([0-5]*)$/;
		console.log(value);

		if (value.length > 0) {
			if (pattern.test(value.toString())) {
				var classes = "success";
			} else {
				var classes = "invalid";
			}
		} else {
			classes = '';
		}		

		e.target.className = classes;

		this.setState({
			inputValue: e.target.value,
			classes: classes,
		});
	}

	render() {
		return (
			<div>
				<label htmlFor={this.props.id}>{this.props.title}</label>
				<input 
					type={this.props.type ? this.props.type : "text"} 
					id={this.props.id} 
					placeholder={this.props.placeholder} 
					onChange={this.validate.bind(this)} />
			</div>			
		);
	}
}