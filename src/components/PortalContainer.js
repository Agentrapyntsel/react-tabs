import React from 'react';
import { MyWindowPortal } from "./WindowPortal";


export class PortalContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			counter: this.props.startValueCounter,
			showWindowPortal: false,
			showWindow: true,
		};
		this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
		this.closeWindowPortal = this.closeWindowPortal.bind(this);
	}

	componentDidMount() {
		window.addEventListener('beforeunload', () => {
			this.closeWindowPortal();
		});

		window.setInterval(() => {
			this.setState(state => ({
				counter: state.counter + 1,
			}));
		}, 1000);
	}

	toggleWindowPortal() {
		this.setState(state => ({
			...state,
			showWindowPortal: !state.showWindowPortal,
		}));
	}

	closeWindow() {
		this.setState({ showWindow: false })
	}

	closeWindowPortal() {
		this.setState({ showWindowPortal: false })
	}

	render() {
		return (
			this.state.showWindow &&
			<div className='portal-container'>
				<h1>{this.props.counter} {this.state.counter}</h1>

				<button onClick={this.toggleWindowPortal}>
					{this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
				</button>

				{this.state.showWindowPortal && (
					<MyWindowPortal closeWindowPortal={this.closeWindowPortal} >
						<div className='portal-container'>
							<h1>Counter in a portal: {this.state.counter}</h1>
							<p>Even though I render in a different window, I share state!</p>
							<div className='portal-btncontainer'>
								<button className='btn' onClick={() => this.closeWindow()} >
									Close me!
								</button>
								<button onClick={() => this.toggleWindowPortal()} >
									Return me!
								</button>
							</div>
						</div>
					</MyWindowPortal>
				)}
			</div>

		);
	}
}