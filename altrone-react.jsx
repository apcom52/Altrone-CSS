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
				var classes = "form__input--success";
			} else {
				var classes = "form__input--invalid";
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

class DemoApp extends Component {
	render() {
		return (
			<div>
				<ValidationInput id="input1" title="Поле ввода с валидацией" placeholder="Введите данные" regexp=""></ValidationInput>
				<Select>
					<SelectItem text="Option 1" value="1"></SelectItem>
					<SelectItem text="Option 2" value="2"></SelectItem>
					<SelectItem text="Option 3" value="3"></SelectItem>
				</Select>
			</div>			
		);
	}
}

ReactDOM.render(
	<DemoApp></DemoApp>,
	document.getElementById('form')
)

function classManager(source, type, value) {
	var _source = source.split(' ');

	if (type == '+') {
		_source.push(value);
	} else {
		var index = 0;
		for (var current of _source) {
			if (current == value) break;			
			index++;
		}

		_source.splice(index, 1);
	}

	return _source.join(' ');
}