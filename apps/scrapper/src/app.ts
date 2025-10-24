import puppeteer from 'puppeteer';
import { addTemplate } from 'database';
import { argv } from 'node:process';
import 'dotenv/config';

async function scrapeMemes(url: string) {
	console.log(`Scraping memes from ${url}`);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });

	const memes = await page.evaluate(() => {
		const boxes = Array.from(document.querySelectorAll('.mt-box'));
		return boxes.map(box => {
			const titleElement = box.querySelector('.mt-title');
			const imageElement = box.querySelector('.mt-img-wrap a img') as HTMLImageElement;
			
			const name = titleElement ? titleElement.textContent?.trim() : 'Unnamed Meme';
			let imageUrl = imageElement ? imageElement.src : null;

			if (imageUrl?.startsWith('//')) {
				imageUrl = `https:${imageUrl}`;
			}

			return {
				name: name || 'Unnamed Meme',
				image_url: imageUrl,
				category: 'scraped'
			};
		});
	});

	for (const meme of memes) {
		if (meme.image_url) {
			await saveTemplate(meme.name, meme.image_url, meme.category);
		}
	}


	await browser.close();
}

async function saveTemplate(name: string, imageUrl: string, category: string) {
	const template = await addTemplate({
		name,
		image_url: imageUrl,
		category,
	});
	console.log('Saved template:', template);
}


function main() {
	scrapeMemes(`https://imgflip.com/memetemplates?page=${argv[2] || 1}`).catch(err => {
		console.error('Error during scraping:', err);
	});
}

export default main;
