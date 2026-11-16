# 🕷️ Web Warden

A pixel-art browser extension that closes Instagram after your daily time limit.

Web Warden is a Chrome, Edge and Brave extension with an original pixel-art web-slinger hero who guards your screen time. It tracks how long you actively spend on Instagram each day, shows a small countdown in the corner, warns you when 5 minutes remain, and closes the tab when your limit is reached.



## Features

- **Active-time tracking:** counts only while Instagram is open in front of you and your browser window is focused
- **Live countdown:** a small pixel hero in the corner shows your minutes left today
- **Warning mode:** the widget border turns yellow when 5 minutes remain
- **Time's up overlay:** a full-screen message with a 5-second countdown, then the tab closes
- **No loopholes:** all open Instagram tabs close, and reopening Instagram after the limit closes it again
- **Adjustable limit:** the default is 30 minutes and you can change it from the popup (5 to 600 minutes)
- **Daily reset:** your count resets at midnight

## Installation

1. Download or clone this repository.
2. Open `chrome://extensions` (or `edge://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the `web-warden` folder.
5. Open Instagram. The hero appears in the bottom-right corner.

## Usage

Click the extension icon to:

- see how many minutes you've used today
- change your daily limit
- reset today's count

## How it works

| File | Role |
| --- | --- |
| `manifest.json` | Manifest V3 configuration and permissions |
| `background.js` | Service worker that adds up active Instagram time every 30 seconds, stores it, and closes tabs when the limit is reached |
| `content.js` | Injected into Instagram to show the countdown widget and the time's-up overlay |
| `sprite.js` | The hero sprite, drawn on a canvas from a text grid |
| `popup.html` / `popup.js` | Settings and usage popup |

**Permissions:** `tabs` (to find Instagram tabs), `storage` (to save your limit and usage), `alarms` (to count time) and host access to `instagram.com` only. Everything stays on your device. Nothing is sent anywhere.

## Customizing the hero

The hero is an original character, not a Marvel property. To change it, edit the `HERO` grid and `HCOL` palette at the top of `sprite.js`. Each letter is one pixel.

## Limitations

- Time is counted in 30-second steps, so it's approximate.
- You control your own browser, so you can still disable the extension. It's a nudge, not a lock.
- Only `instagram.com` is covered. Changing the match patterns in `manifest.json` and `background.js` would let you add other sites.

## Tech stack

JavaScript · Chrome Extension Manifest V3 · HTML Canvas

## Roadmap

- [ ] Support for multiple sites (YouTube, X, Reddit)
- [ ] Weekly usage chart in the popup
- [ ] Optional cooldown before the limit can be changed
- [ ] Sound effects

## License

MIT. Add a `LICENSE` file when you create the repo (GitHub can generate one for you).
