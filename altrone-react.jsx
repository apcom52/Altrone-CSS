import React, {Component} from 'react';

class Header extends Component {
	render() {
		var level = parseInt(this.props.level);
		switch(level) {
			case 1:
			default:
				return (
					<h1>{this.props.children}</h1>
				)
				break;
			case 2:
				return (
					<h2>{this.props.children}</h2>
				)
				break;
			case 3:
				return (
					<h3>{this.props.children}</h3>
				)
				break;
			case 4:
				return (
					<h4>{this.props.children}</h4>
				)
				break;
			case 5:
				return (
					<h5>{this.props.children}</h5>
				)
				break;
			case 6:
				return (
					<h6>{this.props.children}</h6>
				)
				break;
		}
	}
}

class ListItem extends Component {
	render() {
		return (
			<div className="list__item" onClick={this.props.clicked}>{this.props.children}</div>
		)
	}
}

class List extends Component {
	render() {
		return (<div className="list">{(item => <ListItem clickEvent={item.clickEvent}>{item.value})</div>)
	}
}

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
				<Header level="6">Header Example</Header>
				<ValidationInput id="input1" title="Поле ввода с валидацией" placeholder="Введите данные" regexp=""></ValidationInput>				
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