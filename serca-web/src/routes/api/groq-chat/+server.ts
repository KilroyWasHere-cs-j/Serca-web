import { json } from '@sveltejs/kit';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST({ request }) {
	const { prompt } = await request.json();

	const chatCompletion = await groq.chat.completions.create({
		messages: [
			{
				role: 'user',
				content: prompt
			}
		],
		model: 'qwen-qwq-32b',
		temperature: 0.6,
		max_completion_tokens: 32768,
		top_p: 0.95,
		stream: false // set to false for simple responses
	});

	return json({ response: chatCompletion.choices[0].message.content });
}
