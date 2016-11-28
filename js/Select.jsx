import React, {Component} from 'react';

class SelectItem extends Component {
	render() {
		// var selected = this.state.selected;

		return (
			<div className="select__options__item {selected ? 'select__options__item--active : ''}">
				{this.props.text}				
			</div>
		);
	}
}

class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,	
			menu_classname: 'select__menu',		
		}
		this.openMenu = this.openMenu.bind(this);
	}

	openMenu(e) {
		this.state.opened = !this.state.opened;
		if (this.state.opened) {
			this.setState({menu_classname: classManager(this.state.menu_classname, '+', 'select__menu--open')});
		} else {
			this.setState({menu_classname: classManager(this.state.menu_classname, '-', 'select__menu--open')});
		}
	}

	render() {
		var menu_class = this.state.menu_classname;

		return (
			<div className="select">
				<div className={menu_class} onClick={this.openMenu}>Выберите вариант</div>
				<div className="select__options">
					{this.props.children}
				</div>
			</div>
		)
	}
}