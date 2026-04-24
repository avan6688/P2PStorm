# @p2pstorm/hlsjs

P2PStorm integration for HLS.js player. Reduces CDN bandwidth costs by 50-70% through peer-to-peer video segment sharing.

## Install

```bash
npm install @p2pstorm/hlsjs hls.js
```

Or via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@p2pstorm/hlsjs@latest"></script>
```

## Quick Start

```javascript
import Hls from 'hls.js';
import { HlsJsP2PEngine } from '@p2pstorm/hlsjs';

// Inject P2P capabilities
HlsJsP2PEngine.injectMixin(Hls);

// Create HLS player with P2P
const hls = new Hls({
  p2p: {
    core: {
      appKey: 'YOUR_APP_KEY',
      announceTrackers: ['wss://tracker.p2pstorm.vip']
    }
  }
});

hls.loadSource('https://your-cdn.com/video.m3u8');
hls.attachMedia(document.getElementById('video'));
```

## How it works

1. SDK downloads initial segments from your CDN (normal HLS)
2. Viewers connect via WebRTC and share cached segments peer-to-peer
3. More viewers = more P2P sharing = less CDN traffic
4. If P2P fails, automatic CDN fallback (zero impact on playback)

## Supported Players

Works with any player built on HLS.js: Video.js, DPlayer, Plyr, Vidstack, MediaElement, OpenPlayer, Clappr, etc.

## Dashboard

Get your AppKey and view real-time P2P stats at [P2PStorm Dashboard](https://dashboard.p2pstorm.vip)

## Platforms

- **Web**: `npm install @p2pstorm/hlsjs`
- **Android**: [P2PStorm-Mobile](https://github.com/avan6688/P2PStorm-Mobile)
- **iOS**: [P2PStorm-iOS](https://github.com/avan6688/P2PStorm-iOS)

## License

Apache-2.0
