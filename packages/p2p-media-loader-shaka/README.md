# @p2pstorm/shaka

P2PStorm integration for Shaka Player. Reduces CDN bandwidth costs by 50-70% through peer-to-peer video segment sharing. Supports both HLS and DASH.

## Install

```bash
npm install @p2pstorm/shaka shaka-player
```

## Quick Start

```javascript
import shaka from 'shaka-player';
import { ShakaP2PEngine } from '@p2pstorm/shaka';

const engine = new ShakaP2PEngine({
  core: {
    appKey: 'YOUR_APP_KEY',
    announceTrackers: ['wss://tracker.p2pstorm.cn']
  }
});

const player = new shaka.Player();
await player.attach(document.getElementById('video'));
engine.bindShakaPlayer(player);
await player.load('https://your-cdn.com/video.m3u8');
```

## Dashboard

Get your AppKey at [P2PStorm Dashboard](https://dashboard.p2pstorm.vip)

## License

Apache-2.0
