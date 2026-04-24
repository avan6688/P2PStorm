# @p2pstorm/core

P2P video acceleration engine core. Reduces CDN bandwidth costs by 50-70% through WebRTC peer-to-peer segment sharing.

## Install

```bash
npm install @p2pstorm/core
```

## Features

- WebRTC peer-to-peer video segment sharing
- Automatic CDN fallback (zero playback impact)
- Memory segment cache with smart eviction
- Bandwidth-aware peer selection
- Circuit breaker for P2P failures
- Works with HLS and DASH streams

## Usage

This is the core engine. For player integration, use:

- **HLS.js**: `npm install @p2pstorm/hlsjs`
- **Shaka Player**: `npm install @p2pstorm/shaka`

## Quick Start

```javascript
import Hls from 'hls.js';
import { HlsJsP2PEngine } from '@p2pstorm/hlsjs';

HlsJsP2PEngine.injectMixin(Hls);

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

## Dashboard

Get your AppKey at [dashboard.p2pstorm.vip](https://dashboard.p2pstorm.vip)

## License

Apache-2.0
