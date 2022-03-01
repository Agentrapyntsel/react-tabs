import React from 'react';
import "./normalize.css";
import './App.css';
import { PortalContainer } from './components/PortalContainer';

export const App = () => {
	return (
		<div className='App'>
			<PortalContainer counterTitle='Counter 1--'
				startValueCounter={0} />
			<PortalContainer counterTitle='Counter 2--'
				startValueCounter={100}
			/>
			<PortalContainer counterTitle='Counter 3--'
				startValueCounter={1000}
			/>
			<PortalContainer counterTitle='Counter 4--'
				startValueCounter={-100}
			/>
		</div>
	)
}
export default App;
