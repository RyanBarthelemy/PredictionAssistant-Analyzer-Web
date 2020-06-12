export class SnapshotMini {
  hashID: string;
  timestampDisplay: string;
  href: string;

  constructor(JsonString: any){
    this.hashID = JsonString.hashID;
    this.timestampDisplay = JsonString.timestampDisplay;
    this.href = JsonString.href;
  }
}

