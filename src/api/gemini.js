// Gemini API Integration for KnowItGPT
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Send a prompt to Gemini API and get a response
 * @param {string} prompt - The user's question/prompt
 * @returns {Promise<string>} - The AI's response
 */
export async function sendPromptToGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set REACT_APP_GEMINI_API_KEY in your environment.');
  }

  const requestBody = {
    contents: [{
      parts: [{
        text: `You are KnowItGPT, an AI that explains complex topics in simple terms using real-world analogies. Your goal is to make any concept understandable to anyone, regardless of their background. Please explain the following in a clear, engaging way using analogies and simple language:

${prompt}`
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('No response generated from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return aiResponse.trim();
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Return a user-friendly error message
    if (error.message.includes('API key')) {
      return "I'm having trouble connecting to my AI service. Please check that the API key is properly configured.";
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      return "I'm currently experiencing high demand. Please try again in a moment.";
    } else {
      return "I'm having trouble processing your request right now. Please try again in a moment.";
    }
  }
}

/**
 * Validate that the API is properly configured
 * @returns {boolean} - Whether the API is ready to use
 */
export function isGeminiConfigured() {
  return !!GEMINI_API_KEY;
} 