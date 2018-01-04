export default function({ dispatch }) {
	return next => action => {
	
		// if the actionn does not have a payload or
		// the payload is not a promise, just return
		if(!action.payload || !action.payload.then) {
			return next(action)	
		}

		// Wait for promise to resolve
		action.payload
			.then(function(response) {
				// ... and recreate the action and dispatch it
				const new_action = { ...action, payload: response };
				dispatch(new_action);	
			});

	}
}