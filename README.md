# Rain Catcher
A cozy Next.js App Router + TypeScript + Phaser 3 game. Tailwind CSS 4 is available alongside the custom responsive design.

## Run
Use Node.js 22+.

```sh
npm install
npm run dev
```
Open http://127.0.0.1:3000. Allow geolocation or choose a city. Press Play; use arrows, A/D, mouse or touch. Collect 100 drops, then empty the bucket into storage. A dry or unknown location cannot produce collectible drops. Settings provides sound and volume controls.

## Test and build
```sh
npm test
npm run typecheck
npm run build
npm start
```
In development, Settings → Developer weather offers sunny, cloudy, light, moderate and heavy rain. Simulation uses a separate temporary bucket and never changes saved progress, statistics or achievements. Production omits this control.

## Vercel
Import this folder as a Git repository in Vercel, select Next.js, and deploy with the default build command (`npm run build`). No environment variables or API keys are required; see `.env.example`. HTTPS is required for geolocation outside localhost. Browser requests go directly to Open-Meteo; no server secrets or backend are required. No account or leaderboard service is configured.

## Weather and privacy
Uses https://open-meteo.com/en/docs current temperature, precipitation, rain, showers, weather code and day/night, with Unix observation timestamps. Rain + showers controls spawning; precipitation is not used to award water because it includes snow. Missing rainfall is unknown. Rainfall thresholds (2.5 and 7.5 mm/hr) are gameplay choices. Data is model-estimated and may differ from local conditions. Review Open-Meteo licensing and service terms for commercial use.

Weather refreshes every five minutes and on return to a tab (minimum 30 seconds between requests), with deduplication, aborts, 15-second request timeout and exponential retry backoff. Failures disable collection immediately. Observations older than 30 minutes and successful fetches older than 10 minutes cannot award water. Geolocation coordinates are rounded to approximately 1 km, never displayed or stored; the UI labels this 'Your local area'. City search uses Open-Meteo geocoding. Location is shared with Open-Meteo to retrieve weather.

## Structure
- `src/app`: accessible responsive UI, weather lifecycle, journal, achievements, settings
- `src/components/GameCanvas.tsx`: browser-only Phaser host with cleanup
- `src/game/RainScene.ts`: procedural pixel art, input, drop collision and splashes
- `src/lib/weather.ts`: API parsing, freshness validation and city search
- `src/lib/storage.ts`: validated local progress, daily counts, achievements
- `src/lib/sound.ts`: synthesized sounds and filtered rain ambience, started on interaction
- `tests/core.test.ts`: weather edge cases and water conservation

Progress is local to this browser (`rain-catcher-v1`) and is not tamper-proof. Storage failures show a notice. Daily statistics use the device date; weekly statistics show the rolling past seven days. Clearing browser data clears progress. Tank storage is unlimited; the tank illustration saturates at 900 drops while its total remains exact.

## Your neighborhood
Customize skin tone, shirt color and hairstyle in the panel below the game. Choices save automatically and appear on the playable character. The sidewalk garden contains gumamela, calamansi and sampaguita. Each watering costs 25 stored drops; four waterings bring a plant to full growth. Plants never wither. Simulated rain cannot fund or water the garden. Existing saves are migrated without removing collected water. Water Saver now uses cumulative stored water so gardening does not remove the achievement. Rain adds decorative streaks, roof drips, puddle ripples and quiet synthesized roof patter; decorative drops never award points.

## Local daylight
Lighting uses Open-Meteo's selected-location IANA timezone and two days of sunrise/sunset timestamps, refreshed with the existing weather request. Morning begins 30 minutes before sunrise and lasts until local noon. Afternoon lasts until one hour before sunset; sunset lasts through 30 minutes after sunset; evening covers the remaining hours. The scene blends colors over a few seconds and updates the clock every ten seconds. Cloudy/rainy weather mutes the sky; windows and streetlamps glow at dusk/night. Missing solar data falls back to the current weather day/night flag; before a location is resolved, the scene clearly says it is waiting for local daylight. Developer Settings → Time of day preview lets you inspect each palette independently of rain and scoring. Auto restores real local lighting. These are artistic phases, not precise astronomical twilight classifications.
