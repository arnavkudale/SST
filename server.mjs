import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Simple response generation function
function generateResponse(prompt) {
  // Convert prompt to lowercase for easier matching
  const lowerPrompt = prompt.toLowerCase();
  
  // Define some basic responses
  const responses = {
    greeting: "Hello! I'm Sally's virtual assistant. How can I help you with our skincare services today?",
    services: "We offer a range of skincare services including facials, chemical peels, skin consultations, and dermaplane treatments. We also have our own line of premium skincare products.",
    booking: "You can book an appointment by clicking the 'Book Now' button on our website, or by calling us directly. We recommend booking in advance to secure your preferred time slot.",
    products: "We offer a variety of premium skincare products including cleansers, moisturizers, serums, and masks. All our products are carefully selected for their quality and effectiveness.",
    location: "We are located in the heart of the city. You can find our exact address and directions on our Contact page.",
    hours: "Our business hours are Monday to Friday 9 AM to 6 PM, and Saturday 10 AM to 4 PM. We are closed on Sundays.",
    default: "I'm here to help you with information about our skincare services and products. Could you please be more specific about what you'd like to know?"
  };

  // Check for keywords in the prompt
  if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || lowerPrompt.includes('hey')) {
    return responses.greeting;
  }
  if (lowerPrompt.includes('service') || lowerPrompt.includes('offer')) {
    return responses.services;
  }
  if (lowerPrompt.includes('book') || lowerPrompt.includes('appointment')) {
    return responses.booking;
  }
  if (lowerPrompt.includes('product')) {
    return responses.products;
  }
  if (lowerPrompt.includes('where') || lowerPrompt.includes('location')) {
    return responses.location;
  }
  if (lowerPrompt.includes('hour') || lowerPrompt.includes('time')) {
    return responses.hours;
  }

  return responses.default;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const response = generateResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 