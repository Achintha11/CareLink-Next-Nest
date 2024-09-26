/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sdk from "node-appwrite";

const PROJECT_ID = "66f511f000150a99a1bd";
const API_KEY =
  "standard_5a4df484982cebb2b43b02f1a1f2a69d9b3a07c6acfa3480f146063689a53ee883096ba71fc1fbb0e1ea03e14bd09059c7cd89b3ccd1b3119f217d19cc260ac88c44902dfe2cdc5a88433bba0c7c8a62c2dcc1e0e24fb7a0eb5d3974fc47cb3a13f61368114f30a91753d548383dd292185afc7614a2ff68d151ba77d6f1da2a";

const BUCKET_ID = "66f5174e00274aa87680";
const ENDPOINT = "https://cloud.appwrite.io/v1";

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const storage = new sdk.Storage(client);
