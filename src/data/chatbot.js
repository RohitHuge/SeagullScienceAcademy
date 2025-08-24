// utils/askBot.js
import { Client, Functions } from "appwrite";
import { appwriteEndpoint, appwriteProjectId } from "./config";


const client = new Client()
  .setEndpoint(appwriteEndpoint) // your Appwrite endpoint
  .setProject(appwriteProjectId); // replace with your project ID

const functions = new Functions(client);

export async function askBot(userMessage, messages) {
  try {
    const execution = await functions.createExecution(
      "68aafcd400374a707256", // replace with Appwrite Function ID
      JSON.stringify({
        message: userMessage,
        history: messages,
      })
    );

    const response = JSON.parse(execution.responseBody);

    return {
      role: "model",
      text: response.reply || "Sorry, no response received.",
      timestamp: new Date(),
    };
  } catch (err) {
    console.error("askBot error:", err);
    return {
      role: "model",
      text: "I am still learning, please try again later. This is a fallback response.",
      timestamp: new Date(),
    };
  }
}
