export class SnapshotMiniDisplayable {
  hashID: string;
  timestamp: string;
  marketsLink: string;
  jsonLink: string;

  constructor(hashID: string, timestamp: string, marketsLink: string, jsonLink: string) {
    this.hashID = hashID;
    this.timestamp = timestamp;
    this.marketsLink = marketsLink;
    this.jsonLink = jsonLink;
  }
}
