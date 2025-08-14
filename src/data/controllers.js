import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")    
    .setProject("689dfef5001a30964c88");

const databases = new Databases(client);

export async function sendMessage(name,subject,phone,email, message) {
    try {
        const res = await databases.createDocument(
            "689dffc9002257c4f1cb",
            "689dffdc00390699c4e8",
            ID.unique(),
            { name, subject, phone, email, message }
        );
        console.log("Message sent:", res);
    } catch (err) {
        console.error("Error sending message:", err);
    }
}
