import { StyleSheet, Text, TextInput, View, FlatList, Keyboard } from "react-native"; // Import Keyboard
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/common/Button";
import { useState } from "react";
import Prompt from "../../constants/Prompt";
import generateTopicIdeas from "../../config/aiModel";

const AddCourse = () => {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [generatedTopics, setGeneratedTopics] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

    const handleGenerate = async () => {
        // Clear any previous error messages
        setErrorMessage('');

        if (!userInput.trim()) { // Use .trim() to check for empty or just whitespace input
            setErrorMessage("Please enter a prompt to generate topics."); // Set error message
            return; // Stop execution if input is empty
        }

        setLoading(true);
        // Construct the full prompt for the AI model
        const PROMPT = userInput + Prompt.IDEA;

        try {
            // Call the generateTopicIdeas function to get topics from the AI model
            const topics = await generateTopicIdeas(PROMPT);
            setGeneratedTopics(topics); // Update the state with the generated topics
            console.log("Generated topics:", topics);
        } catch (error) {
            console.error("Failed to generate topics:", error);
            setErrorMessage("Failed to generate topics. Please try again."); // Set error message on failure
        } finally {
            setLoading(false); // Always set loading to false after the operation
            Keyboard.dismiss(); // Dismiss the keyboard
        }
    };

    return (
        <SafeAreaView
            style={styles.mainContainer}
        >
            <Text style={styles.heading}>Create New Course</Text>

            <Text style={styles.subHeading}>What You Learn Today?</Text>
            <Text style={styles.desc}>
                What Course you want to create? (ex. Learn React Native, Digital Marketing, 10th Science Chapters, etc.)
            </Text>
            <TextInput
                style={styles.textInput}
                placeholderTextColor={colors.LIGHT_GRAY}
                value={userInput}
                onChangeText={(text) => setUserInput(text)}
                numberOfLines={3}
                multiline
                placeholder="ex: Learn Python, Frontend Development"
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} {/* Display error message */}
            <Button text="Generate Topic" type="outline" loading={loading} onPress={handleGenerate} />

            {/* Display generated topics if available */}
            {generatedTopics.length > 0 && (
                <View style={styles.topicsContainer}>
                    <Text style={styles.subHeading}>Generated Topic Ideas:</Text>
                    <FlatList
                        data={generatedTopics}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.topicItem}>• {item}</Text>
                        )}
                    />
                </View>
            )}

            <StatusBar backgroundColor="#ffffff" style="inverted" />
        </SafeAreaView>
    );
};

export default AddCourse;

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.GRAY,
    },
    mainContainer: {
        flex: 1,
        minHeight: "100%",
        padding: 20,
        backgroundColor: colors.WHITE,
        gap: 10,
    },
    heading: {
        fontSize: 30,
        fontFamily: "outfit-bold",
    },
    subHeading: {
        fontSize: 25,
        fontFamily: "outfit",
    },
    desc: {
        fontSize: 16,
        fontFamily: "outfit",
        color: colors.GRAY,
    },
    topicsContainer: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
    },
    topicItem: {
        fontSize: 18,
        fontFamily: "outfit",
        color: colors.BLACK,
        paddingVertical: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'outfit',
        marginTop: 5,
        marginBottom: 5,
    },
});
