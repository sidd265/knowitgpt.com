# 🧠 KnowItGPT

**Smart Answers. Super Simple.** 



KnowItGPT is a production-grade AI chatbot built with React and TailwindCSS that explains complex topics in simple terms using real-world analogies. Powered by Google's Gemini AI, it delivers lightning-fast explanations that anyone can understand.

**[Live Demo](https://knowitgpt.com)** | 📖 **[Documentation](#-quick-start)** | **[Deploy Now](#-deployment)**

## ✨ Features

### 🏠 **Homepage**
- Beautiful mountain gradient background inspired by leading AI platforms
- Clean, professional navigation with responsive design
- Hero section with prominent call-to-action
- Centered input bar for immediate engagement
- Mobile-optimized layout

### 💬 **Chat Interface**
- Dark mode design for comfortable extended use
- Real-time chat with AI-powered explanations
- Usage counter showing free question limit (5 questions)
- Smooth animations and loading states
- Auto-scrolling to latest messages

### 🔄 **Smart Features**
- **Free Tier**: 5 free questions to try the service
- **Lead Generation**: Modal form after question limit
- **Gemini Integration**: Powered by Google's Gemini AI model
- **Error Handling**: Graceful degradation when API is unavailable
- **Responsive Design**: Works perfectly on mobile and desktop

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd knowitgpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── api/
│   └── gemini.js              # Gemini API integration
├── components/
│   ├── ChatInputBar.jsx       # Message input component
│   ├── ChatMessageBubble.jsx  # Individual message display
│   ├── FormModal.jsx          # Lead generation modal
│   └── UsageCounter.jsx       # Question counter display
├── pages/
│   ├── HomePage.jsx           # Landing page
│   └── ChatPage.jsx           # Chat interface
├── App.js                     # Main app with routing
├── index.js                   # React entry point
└── index.css                  # TailwindCSS styles
```

## 🎨 Design System

### Colors
- **Primary Orange**: `#ff7e5f` to `#feb47b` (gradient)
- **Chat Background**: `#0a0a0a` (dark mode)
- **Chat Elements**: Various grays for optimal contrast
- **Accent Colors**: Orange for CTAs and branding

### Typography
- **Font**: Inter (clean, professional)
- **Hierarchy**: Clear size and weight distinctions
- **Readability**: Optimized contrast ratios

### Components
- **Buttons**: Rounded corners, hover states, proper focus
- **Inputs**: Consistent styling with validation states
- **Cards**: Subtle shadows and proper spacing
- **Modals**: Backdrop blur with centered content

## 🔧 Configuration

### API Setup
The app uses Google's Gemini AI model. Configure your API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `REACT_APP_GEMINI_API_KEY`

### Customization
- **Question Limit**: Modify `maxFreeQuestions` in `ChatPage.jsx`
- **AI Personality**: Update the system prompt in `api/gemini.js`
- **Styling**: Customize colors in `tailwind.config.js`

## 📱 Mobile Responsiveness

The app is fully responsive with:
- **Adaptive Navigation**: Collapsed menu on mobile
- **Touch-Friendly**: Proper button sizes and spacing
- **Readable Text**: Optimal font sizes across devices
- **Landscape Support**: Works in all orientations

## 🔒 Privacy & Security

- **API Key Security**: Keys are environment variables (not in code)
- **Form Validation**: Client-side validation with error handling
- **No Data Storage**: Chat history is session-only
- **HTTPS Ready**: Prepared for secure deployment

## 🚀 Deployment


### Manual Deployment

#### Netlify
1. **Connect Repository**: Link your GitHub repository
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `build`
3. **Environment Variables**: Add `REACT_APP_GEMINI_API_KEY`
4. **Deploy**: Automatic deployment on every push

#### Vercel
1. **Import Project**: Connect from GitHub
2. **Framework**: Auto-detected as React
3. **Environment Variables**: Add `REACT_APP_GEMINI_API_KEY`
4. **Deploy**: Automatic deployment on every push

#### Build for Production
```bash
# Standard build
npm run build

# Optimized production build (no source maps)
npm run build:prod

# Test production build locally
npm run serve
```

### Environment Variables
Set these in your deployment platform:
```bash
REACT_APP_GEMINI_API_KEY=your_production_api_key
```

**Get your API key from**: [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🎯 Business Features

### Lead Generation
- **Free Tier**: 5 questions to demonstrate value
- **Conversion Point**: Form modal after question limit
- **Data Collection**: Name, email, and use case
- **User Experience**: Non-intrusive, value-first approach

### Analytics Ready
Easy to integrate with:
- Google Analytics
- Mixpanel
- Amplitude
- Custom tracking solutions

## 🔄 Future Enhancements

Potential features to add:
- **User Accounts**: Persistent chat history
- **Payment Integration**: Stripe for premium plans
- **Advanced Analytics**: Usage tracking and insights
- **Multi-language**: Support for other languages
- **Voice Input**: Speech-to-text functionality
- **Export Chats**: PDF or text export options

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues:
- Create an issue in the GitHub repository
- Check the documentation above
- Review the code comments for implementation details

---

**Built with ❤️ using React, TailwindCSS, and Google Gemini AI** 
