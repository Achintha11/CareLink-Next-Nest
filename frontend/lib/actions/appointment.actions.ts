import { ID } from "node-appwrite"; // Ensure you're importing Appwrite SDK correctly
import { messaging } from "../appwrite.config";

export const sendSMSNotification = async (content: string, userId: string) => {
  console.log("SEND SMS NOTIFICATION", userId);
  try {
    // Ensure you're using the correct messaging service from Appwrite SDK
    const message = await messaging.createSms(
      ID.unique(), // Unique ID for the message
      content,
      [],
      [userId]
    );
    console.log("SMS sent successfully:", message);
  } catch (error) {
    console.error("An error occurred while sending SMS:", error);
    return null;
  }
};
