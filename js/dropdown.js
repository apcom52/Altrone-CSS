export default class Dropdown {
	constructor(items, props) {
		this.items = items;
		this.props = props;

		this.el = document.createElement("div");
		this.el.className = 'dropdown';
	}
}