import React from "react";
import "./Counter.styles.css";
class Counter extends React.Component {
	render() {
		const { playerNumber, isTemp } = this.props;
		const counterClass = isTemp ? `temp-counter-${playerNumber}` : `counter-${playerNumber}`;
		const counterText = isTemp ? `Accumulated Blocks:` : `Total Blocks:`;
		return (
			<div className={counterClass}>
				<p>
					{counterText} {this.props.score}
				</p>
			</div>
		);
	}
}
export default Counter;
