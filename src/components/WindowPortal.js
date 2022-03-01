import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function copyStyles(sourceDoc, targetDoc) {
	Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
		if (styleSheet.cssRules) { // true for inline styles
			const newStyleEl = sourceDoc.createElement('style');
			Array.from(styleSheet.cssRules).forEach(cssRule => {
				newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
			});
			targetDoc.head.appendChild(newStyleEl);
		} else if (styleSheet.href) { // true for stylesheets loaded from a URL
			const newLinkEl = sourceDoc.createElement('link');
			newLinkEl.rel = 'stylesheet';
			newLinkEl.href = styleSheet.href;
			targetDoc.head.appendChild(newLinkEl);
		}
	});
}

export let MyWindowPortal = (props) => {
	const [containerEl] = useState(document.createElement('div'));
	let externalWindow = null;

	useEffect(() => {
		externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
		externalWindow.document.body.appendChild(containerEl);
		externalWindow.document.title = 'A React portal window';
		copyStyles(document, externalWindow.document);
		externalWindow.addEventListener('beforeunload', () => {
			props.closeWindowPortal();
		}, []);

		return () => {
			externalWindow.close();
		}
	}, []);

	return (
		ReactDOM.createPortal(props.children, containerEl)
	)
}
MyWindowPortal = React.memo(MyWindowPortal);

//https://stackoverflow.com/questions/53595935/how-can-i-make-react-portal-work-with-react-hook

// export const MyWindowPortal = ({
// 	children,
// 	className = 'portal-container',
// 	element = 'div',
// }) => {
// 	const [container] = React.useState(() => {
// 		const el = document.createElement(element)
// 		el.classList.add(className)
// 		return el
// 	})

// 	React.useEffect(() => {
// 		document.body.appendChild(container)
// 		return () => {
// 			document.body.removeChild(container)
// 		}
// 	}, [])

// 	return ReactDOM.createPortal(children, container)
// }
