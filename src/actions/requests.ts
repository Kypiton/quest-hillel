'use server';

export const getData = async (id?: number) => {
	const request = id ? `quests/${id}` : 'quests';
	try {
		const repsonse = await fetch(`http://localhost:3001/${request}`);
		const data = await repsonse.json();
		return data;
	} catch (error) {
		console.error('Error: ', error);
	}
}

export const postData = async (values: any) => {
	try {
		const response = await fetch('http://localhost:3001/orders', {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});
		return response.json()
	} catch (error) {
		console.error(error);
		alert('Не удалось отправить запрос')
	}
};
