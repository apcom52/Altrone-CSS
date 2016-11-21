class ShoppingList extends React.Component {
	render() {
		return (
			<div className="list list--color-blue">
				<h1>Shopping List</h1>
				<ul>
					<li>Milk</li>
					<li>Spagetti</li>
					<li>Soap</li>
				</ul>
			</div>
		);
	}
}

ReactDOM.render(
	<div>
		<ShoppingList name="Mark" />
	</div>,
	document.getElementById('app')
);