const axios = require('axios');
const { EventSource } = require('eventsource');

const session_hash = Math.random().toString(36).slice(2);
const negativePrompt = "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck"
const models = [ "Anime", "Photo", "Cinematic", "3D Model" ];

const midjourney = {
	request: async (prompt, model) => {
		const data = JSON.stringify({
			"data": [
				prompt,
				negativePrompt,
				true,
				model,
				0,
				1024,
				1024,
				6,
				true
			],
			"event_data": null,
			"fn_index": 3,
			"trigger_id": 6,
			"session_hash": session_hash
		});

		const config = {
			method: 'POST',
			url: 'https://mukaist-midjourney.hf.space/queue/join?__theme=system',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1803; Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.4280.141 Mobile Safari/537.36 KiToBrowser/124.0',
				'Content-Type': 'application/json',
				'accept-language': 'id-ID',
				'referer': 'https://mukaist-midjourney.hf.space/?__theme=system',
				'origin': 'https://mukaist-midjourney.hf.space',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'priority': 'u=4',
				'te': 'trailers'
			},
			data: data
		};

		const api = await axios.request(config);
		return api.data;
	},
	cekStatus: () => {
		return new Promise((resolve, reject) => {
			const eventSource = new EventSource('https://mukaist-midjourney.hf.space/queue/data?session_hash=' + session_hash);

			eventSource.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.msg === "process_completed") {
					resolve(data);
					eventSource.close();
				} else if (data.msg === "error") {
					reject(data);
					eventSource.close();
				} else {
					console.log("Event:", data);
				}
			};

			eventSource.onerror = (err) => {
				reject(err);
				eventSource.close();
			};
		});
	},
	create: async (prompt) => {
		try {
			const postResponse = await midjourney.request(prompt);
			const statusResponse = await midjourney.cekStatus();
			return statusResponse;
		} catch (error) {
			console.error("Error:", error);
		}
	}
};

module.exports = midjourney;