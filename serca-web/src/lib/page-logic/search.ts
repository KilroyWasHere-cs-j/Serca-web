function runSearch() {}

async function sendPrompt(query: string) {
	let prompt = '';
	prompt += ' ' + query;
	const res = await fetch('/api/groq-chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ prompt })
	});

	const data = await res.json();
	return data.response;
}
