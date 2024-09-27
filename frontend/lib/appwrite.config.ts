/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sdk from "node-appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
const client = new sdk.Client();

const ENV = process.env.PROJECT_ID;

console.log("PROJECT_ID:", process.env.API_KEY);

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
