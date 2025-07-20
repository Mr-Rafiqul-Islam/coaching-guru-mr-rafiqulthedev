// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });
// const tools = [
//   {
//     googleSearch: {},
//   },
// ];
// const config = {
//   thinkingConfig: {
//     thinkingBudget: -1,
//   },
//   tools,
//   responseMimeType: "application/json",
// };
// const model = "gemini-2.5-pro";
// const contents = [
//   {
//     role: "user",
//     parts: [
//       {
//         text: `Learn Python:: As you are coaching teacher
// -User want to learn about the topic
// -Generate 5-7 Course title for study (Short)
// -Output will be ARRAY od String in JSON FORMAT only
// -Do not add any plain text in output`,
//       },
//     ],
//   },
//   {
//     role: "model",
//     parts: [
//       {
//         text: `**Devising Python Course Titles**

// I've been focusing on the user's request, acting as a Python coaching teacher. My goal is to craft compelling course titles. I'm aiming for 5-7 short options suitable for those looking to learn Python. Right now, I'm working to formalize the course titles as a JSON array of strings.


// **Formulating JSON Output**

// I've finalized the course titles and have formatted them into a JSON array, as required. The array includes six concise titles designed to appeal to learners at various introductory levels. I believe the selected titles accurately reflect the user's needs and my expertise as a Python coaching teacher.


// **Generating Final JSON Output**

// I've refined the approach. Rather than searching, I'm now directly generating the JSON output based on the selected course titles. The titles align well with the user's needs, and I've ensured they meet all output requirements. I'm confident in the final format now.


// `,
//       },
//       {
//         text: `\`\`\`json
// [
//   "Python for Beginners: From Zero to Hero",
//   "Python Fundamentals: Core Concepts",
//   "Introduction to Python Programming",
//   "Python from Scratch: A Beginner's Guide",
//   "Mastering Python Basics",
//   "The Complete Python Bootcamp",
//   "Python for Absolute Beginners"
// ]
// \`\`\``,
//       },
//     ],
//   },
//   {
//     role: "user",
//     parts: [
//       {
//         text: `INSERT_INPUT_HERE`,
//       },
//     ],
//   },
// ];

// export const GenrateTopicsAiModel = await ai.models.generateContentStream({
//   model,
//   config,
//   contents,
// });
// let fileIndex = 0;
// for await (const chunk of GenrateTopicsAiModel) {
//   console.log(chunk.text);
// }

// This function will handle the API call to the Gemini model
// to generate topic ideas based on the provided prompt.
const generateTopicIdeas = async (prompt) => {
    try {
        // Initialize chat history with the user's prompt
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        // Define the payload for the API request, including the generation configuration
        // to ensure a JSON array of strings is returned.
        const payload = {
            contents: chatHistory,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "STRING"
                    }
                }
            }
        };

        // API key will be automatically provided by the Canvas environment if left empty.
        const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
        // The API endpoint for the gemini-2.0-flash model
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Make the API call
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Parse the JSON response
        const result = await response.json();

        // Check if the response contains valid candidates and content
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            // The generated content is a JSON string, so parse it
            const jsonString = result.candidates[0].content.parts[0].text;
            const parsedJson = JSON.parse(jsonString);
            return parsedJson; // Return the array of topic ideas
        } else {
            console.error("Unexpected response structure or missing content:", result);
            return []; // Return an empty array if no content is found
        }
    } catch (error) {
        console.error("Error generating topic ideas:", error);
        return []; // Return an empty array in case of an error
    }
};

// Export the function so it can be imported and used in other files.
export default generateTopicIdeas;
