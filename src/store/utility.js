export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const form_urlencode = form => {
	const params = new URLSearchParams();
	for (let key in form) {
		if (form.hasOwnProperty(key)) {
			params.append(key, form[key]);
		}
	}
	return params;
};

export default updateObject;
