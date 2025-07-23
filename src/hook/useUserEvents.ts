import { useEffect, useState } from 'react';

const USER_ACTIONS = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];

export const useUserEvents = () => {
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	useEffect(() => {
		USER_ACTIONS.forEach((action) => {
			window.addEventListener(action, handleUserInteraction, { passive: true });
		});

		return () => {
			USER_ACTIONS.forEach((action) => {
				window.removeEventListener(action, handleUserInteraction);
			});
		};
	}, []);

	const handleUserInteraction = () => {
		setHasUserInteracted(true);
	};

	return { hasUserInteracted };
};
