// Gemini API Integration for KnowItGPT
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Usage tracking constants
const DAILY_QUESTION_LIMIT = 5;
const USAGE_STORAGE_KEY = 'knowitgpt_daily_usage';

/**
 * Get today's date as a string (YYYY-MM-DD)
 * @returns {string} - Today's date
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get current usage data for today
 * @returns {object} - Usage data with date and count
 */
function getTodayUsage() {
  const today = getTodayDate();
  const stored = localStorage.getItem(USAGE_STORAGE_KEY);
  
  if (!stored) {
    return { date: today, count: 0 };
  }
  
  try {
    const usage = JSON.parse(stored);
    // If it's a new day, reset the count
    if (usage.date !== today) {
      return { date: today, count: 0 };
    }
    return usage;
  } catch (error) {
    return { date: today, count: 0 };
  }
}

/**
 * Update usage count for today
 * @param {number} count - New count value
 */
function updateUsageCount(count) {
  const today = getTodayDate();
  const usage = { date: today, count };
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(usage));
}

/**
 * Check if user has reached daily limit
 * @returns {boolean} - True if limit reached
 */
function hasReachedDailyLimit() {
  const usage = getTodayUsage();
  return usage.count >= DAILY_QUESTION_LIMIT;
}

/**
 * Get remaining questions for today
 * @returns {number} - Number of questions remaining
 */
function getRemainingQuestions() {
  const usage = getTodayUsage();
  return Math.max(0, DAILY_QUESTION_LIMIT - usage.count);
}

/**
 * Send a prompt to Gemini API and get a response
 * @param {string} prompt - The user's question/prompt
 * @returns {Promise<string>} - The AI's response
 */
export async function sendPromptToGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set REACT_APP_GEMINI_API_KEY in your environment.');
  }

  // Check daily usage limit
  if (hasReachedDailyLimit()) {
    return `🚫 **Daily Limit Reached!**

You've used all 5 free questions for today. Here's what you can do:

**Option 1: Come Back Tomorrow** 🌅
Your free questions reset every day at midnight.

**Option 2: Upgrade to Pro** ⭐
• Unlimited questions
• Faster responses
• Priority support
• Advanced features

Ready to upgrade? Contact us or check our pricing page!

Thanks for using KnowItGPT! 😊`;
  }

  const requestBody = {
    contents: [{
      parts: [{
        text: `You are KnowItGPT. Give clear, helpful explanations using everyday words and real examples.

Rules:
- Keep answers between 300-350 words
- Use simple vocabulary (explain like talking to a friend)
- Start with a real-world example people know
- Be direct and clear
- No jargon or complicated terms
- Include practical examples throughout

Question: ${prompt}`
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 600,
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
    
    // Increment usage count after successful response
    const currentUsage = getTodayUsage();
    updateUsageCount(currentUsage.count + 1);
    
    // Add remaining questions info if close to limit
    const remaining = getRemainingQuestions();
    let responseWithUsageInfo = aiResponse.trim();
    
    if (remaining <= 2 && remaining > 0) {
      responseWithUsageInfo += `\n\n---\n💡 **Note:** You have ${remaining} free question${remaining === 1 ? '' : 's'} remaining today. Upgrade to Pro for unlimited questions!`;
    } else if (remaining === 0) {
      responseWithUsageInfo += `\n\n---\n🎉 **This was your last free question for today!** Come back tomorrow or upgrade to Pro for unlimited access.`;
    }
    
    return responseWithUsageInfo;
    
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

/**
 * Get remaining questions for today (for UI display)
 * @returns {number} - Number of questions remaining
 */
export function getQuestionsRemaining() {
  return getRemainingQuestions();
}

/**
 * Check if user has reached daily limit (for UI display)
 * @returns {boolean} - True if limit reached
 */
export function isAtDailyLimit() {
  return hasReachedDailyLimit();
}

/**
 * Get current usage stats for today
 * @returns {object} - Object with used and remaining counts
 */
export function getDailyUsageStats() {
  const usage = getTodayUsage();
  return {
    used: usage.count,
    remaining: getRemainingQuestions(),
    limit: DAILY_QUESTION_LIMIT
  };
} 