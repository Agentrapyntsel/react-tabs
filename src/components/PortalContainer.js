import React, { useEffect, useState } from 'react';
import { MyWindowPortal } from "./WindowPortal";

export const PortalContainer = (props) => {
	const [counter, setCounter] = useState(props.startValueCounter)
	const [showWindowPortal, setShowWindportal] = useState(false)
	const [showWindow, setShowWindow] = useState(true)


	useEffect(() => {
		window.addEventListener('beforeunload', () => {
			closeWindowPortal();
		});
		const clearIdentificator = setInterval(() => {
			setCounter(c => c + 1);
		}, 2000);
		return () => {
			clearInterval(clearIdentificator);
		}
	}, [counter]);

	const toggleWindowPortal = () => {
		setShowWindportal(!showWindowPortal);
	}
	const closeWindow = () => {
		setShowWindow(false)
	}
	const closeWindowPortal = () => {
		setShowWindportal(false)
	}

	return (
		showWindow &&
		<div className='portal-container'>
			<h1>{props.counterTitle} {counter}</h1>

			<button onClick={toggleWindowPortal}>
				{showWindowPortal ? 'Close the' : 'Open a'} Portal
			</button>

			{showWindowPortal && (
				<MyWindowPortal closeWindowPortal={closeWindowPortal} >
					<div className='portal-container'>
						<h1>Counter in a portal: {counter}</h1>
						<p>Even though I render in a different window, I share state!</p>
						<div className='portal-btncontainer'>
							<button className='btn' onClick={() => closeWindow()} >
								Close me!
							</button>
							<button onClick={() => toggleWindowPortal()} >
								Return me!
							</button>
						</div>
					</div>
				</MyWindowPortal>
			)}
		</div>

	);

}