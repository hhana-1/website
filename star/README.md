# Glossy star – rotates on scroll

Copy these files to your website (keep them in the same folder):

| File | What it is |
| --- | --- |
| `star-scroll.js` | three.js + the scroll logic, bundled into one file (606 KB, ~158 KB gzipped) |
| `star.glb` | the 3D model (364 KB, ~207 KB gzipped) |
| `star-scroll.js.LEGAL.txt` | three.js licence notice (MIT) – keep it next to the script |
| `index.html` | demo page – only for reference, you don't need to deploy it |

## Use it

```html
<!-- where the star should appear; give it any size/position with CSS -->
<div data-star-scroll style="position:fixed; right:4vw; top:50%; transform:translateY(-50%);
     width:min(46vw,620px); aspect-ratio:1; pointer-events:none"></div>

<!-- once, near the end of <body> -->
<script type="module" src="/path/to/star-scroll.js"></script>
```

That's all: the star turns as the page scrolls and eases into place when scrolling stops.
The canvas background is transparent, so it sits on top of whatever is behind it.

## Options (HTML attributes)

| Attribute | Default | Meaning |
| --- | --- | --- |
| `data-turns-per-screen` | `0.5` | full turns per screen-height scrolled (`1` = one full spin per screen, negative = other direction) |
| `data-axis` | `y` | `y` spins like a coin, `x` flips forward, `z` turns like a wheel |
| `data-smoothing` | `6` | how quickly it catches up with the scroll; higher = snappier |
| `data-float` | `true` | gentle idle bobbing |
| `data-twinkle` | `true` | the small sparkles pulse |
| `data-pearl` | `true` | pale-to-plum pearl colour shift (set `false` for plain lilac chrome) |
| `data-model` | `star.glb` next to the script | URL of the model if you store it elsewhere |

## From JavaScript (React, Vue, etc.)

```js
import { initStarScroll } from './star-scroll.js';

const star = initStarScroll(document.querySelector('#star'), { turnsPerScreen: 1, axis: 'y' });
// later, e.g. when the component unmounts:
star.dispose();
```

If your page scrolls inside an element instead of the window, pass it: `{ scrollTarget: myScrollingDiv }`.

## Notes

- Pages must be served over http(s) (`file://` will not load modules/models). Local test:
  `python3 -m http.server 8000` in this folder, then open http://localhost:8000
- It only renders while the star is on screen and the tab is visible, and it turns off the idle
  float/twinkle for visitors who have "reduce motion" enabled (scroll rotation still works).
- To change the code: edit `../web-src/star-scroll.src.js`, then `npm install && npm run build` in `web-src/`.
- To re-export the model after editing `star.blend`:
  `env -i HOME=$HOME PATH=/usr/bin:/bin blender -b star.blend --python export/export_glb.py -- $PWD/web/star.glb`
