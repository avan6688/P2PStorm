import { Playback, BandwidthCalculators } from "../internal-types.js";
import { CoreEventMap, SegmentWithStream, StreamConfig } from "../types.js";
import { EventTarget } from "../utils/event-target.js";
import { Request } from "./request.js";

export class RequestsContainer {
  private readonly requests = new Map<SegmentWithStream, Request>();
  private _executingHttpCount = 0;
  private _executingP2PCount = 0;

  constructor(
    private readonly requestProcessQueueCallback: () => void,
    private readonly bandwidthCalculators: BandwidthCalculators,
    private readonly playback: Playback,
    private readonly config: StreamConfig,
    private readonly eventTarget: EventTarget<CoreEventMap>,
  ) {}

  get executingHttpCount() {
    return this._executingHttpCount;
  }

  get executingP2PCount() {
    return this._executingP2PCount;
  }

  incrementExecutingCount(source: "http" | "p2p") {
    if (source === "http") this._executingHttpCount++;
    else this._executingP2PCount++;
  }

  decrementExecutingCount(source: "http" | "p2p") {
    if (source === "http") this._executingHttpCount--;
    else this._executingP2PCount--;
  }

  get(segment: SegmentWithStream) {
    return this.requests.get(segment);
  }

  getOrCreateRequest(segment: SegmentWithStream) {
    let request = this.requests.get(segment);
    if (!request) {
      request = new Request(
        segment,
        this.requestProcessQueueCallback,
        this.bandwidthCalculators,
        this.playback,
        this.config,
        this.eventTarget,
        (prevStatus, newStatus, downloadSource) => {
          if (prevStatus !== "loading" && newStatus === "loading" && downloadSource) {
            this.incrementExecutingCount(downloadSource);
          } else if (prevStatus === "loading" && newStatus !== "loading" && downloadSource) {
            this.decrementExecutingCount(downloadSource);
          }
        },
      );
      this.requests.set(segment, request);
    }
    return request;
  }

  remove(request: Request) {
    this.requests.delete(request.segment);
  }

  items() {
    return this.requests.values();
  }

  *httpRequests(): Generator<Request, void> {
    for (const request of this.requests.values()) {
      if (request.downloadSource === "http") yield request;
    }
  }

  *p2pRequests(): Generator<Request, void> {
    for (const request of this.requests.values()) {
      if (request.downloadSource === "p2p") yield request;
    }
  }

  destroy() {
    for (const request of this.requests.values()) {
      if (request.status !== "loading") continue;
      request.abortFromProcessQueue();
    }
    this.requests.clear();
    this._executingHttpCount = 0;
    this._executingP2PCount = 0;
  }
}
