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