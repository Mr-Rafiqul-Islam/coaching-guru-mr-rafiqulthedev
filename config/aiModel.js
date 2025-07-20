

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

// This function will handle the API call to the Gemini model
// to generate detailed course content based on the provided prompt and schema.
export const generateCourseContent = async (prompt) => {
    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const payload = {
            contents: chatHistory,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "courses": {
                            "type": "ARRAY",
                            "items": {
                                "type": "OBJECT",
                                "properties": {
                                    "courseTitle": { "type": "STRING" },
                                    "description": { "type": "STRING" },
                                    "banner_image": { "type": "STRING" },
                                    "chapters": {
                                        "type": "ARRAY",
                                        "items": {
                                            "type": "OBJECT",
                                            "properties": {
                                                "chapterName": { "type": "STRING" },
                                                "content": {
                                                    "type": "ARRAY",
                                                    "items": {
                                                        "type": "OBJECT",
                                                        "properties": {
                                                            "topic": { "type": "STRING" },
                                                            "explain": { "type": "STRING" },
                                                            "code": { "type": "STRING" },
                                                            "example": { "type": "STRING" }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "quizzes": {
                                        "type": "ARRAY",
                                        "items": {
                                            "type": "OBJECT",
                                            "properties": {
                                                "question": { "type": "STRING" },
                                                "options": {
                                                    "type": "ARRAY",
                                                    "items": { "type": "STRING" }
                                                },
                                                "correctAns": { "type": "STRING" }
                                            }
                                        }
                                    },
                                    "flashcards": {
                                        "type": "ARRAY",
                                        "items": {
                                            "type": "OBJECT",
                                            "properties": {
                                                "front": { "type": "STRING" },
                                                "back": { "type": "STRING" }
                                            }
                                        }
                                    },
                                    "qa": {
                                        "type": "ARRAY",
                                        "items": {
                                            "type": "OBJECT",
                                            "properties": {
                                                "question": { "type": "STRING" },
                                                "answer": { "type": "STRING" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Check if the HTTP response itself was successful
        if (!response.ok) {
            const errorText = await response.text();
            console.error("API response not OK:", response.status, errorText);
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log("Raw AI response result:", JSON.stringify(result, null, 2)); // Log the full raw result for debugging

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const jsonString = result.candidates[0].content.parts[0].text;
            console.log("JSON string from AI before parsing:", jsonString); // NEW: Log the string before parsing

            try {
                const parsedJson = JSON.parse(jsonString);
                // NEW: Validate the structure after successful parsing
                if (parsedJson && Array.isArray(parsedJson.courses)) {
                    return parsedJson;
                } else {
                    console.error("Parsed JSON does not contain a 'courses' array as expected:", parsedJson);
                    throw new Error("AI response format invalid: missing 'courses' array or malformed structure.");
                }
            } catch (parseError) {
                // NEW: Catch JSON parsing errors specifically
                console.error("JSON Parse Error during generateCourseContent:", parseError.message, "Problematic String:", jsonString);
                throw new Error("Failed to parse AI response as JSON.");
            }
        } else {
            console.error("Unexpected response structure or missing content from AI:", result);
            return null; // Return null if no valid content is found
        }
    } catch (error) {
        console.error("Error in generateCourseContent (outer catch):", error);
        return null; // Return null in case of any error during the process
    }
};



