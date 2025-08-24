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
    console.log(execution);

    // Check if response body exists and is not empty
    if (execution.responseBody && execution.responseBody.trim()) {
      try {
        const response = JSON.parse(execution.responseBody);
        return {
          role: "model",
          text: response.reply || "Sorry, no response received.",
          timestamp: new Date(),
        };
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        // If JSON parsing fails, return the raw response body
        return {
          role: "model",
          text: execution.responseBody || "Response received but couldn't parse it.",
          timestamp: new Date(),
        };
      }
    } else {
      // No response body received
      return {
        role: "model",
        text: "No response received from the server. Please try again later.",
        timestamp: new Date(),
      };
    }
  } catch (err) {
    console.error("askBot error:", err);
    return {
      role: "model",
      text: "I am still learning, please try again later. This is a fallback response.",
      timestamp: new Date(),
    };
  }
}
