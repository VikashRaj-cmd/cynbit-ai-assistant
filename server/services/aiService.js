import OpenAI from 'openai';
import { getSystemPrompt } from './knowledgeBase.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate an AI response grounded in Cynbit's knowledge base.
 * @param {Array} messages - Array of {role, content} message history
 * @returns {string} - AI generated response text
 */
export const generateAIResponse = async (messages) => {
  try {
    const systemPrompt = getSystemPrompt();

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error.message);

    // Graceful fallback response
    if (error.status === 429) {
      throw new Error('RATE_LIMIT');
    } else if (error.status === 401) {
      throw new Error('AUTH_ERROR');
    }
    throw new Error('AI_UNAVAILABLE');
  }
};

/**
 * Generate a fallback response when AI is unavailable.
 * Uses keyword matching against the knowledge base.
 * @param {string} userMessage
 * @returns {string}
 */
export const getFallbackResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  if (msg.includes('service') || msg.includes('what do you do') || msg.includes('offer')) {
    return `Cynbit Technologies offers four core services:
1. **AI Automation** — Custom AI agents, LLM integrations, autonomous agents
2. **Software Development** — Full-stack web/mobile, cloud infrastructure (AWS/Azure)
3. **Digital Marketing & SEO** — Performance ads, technical SEO, CRM automation
4. **Cloud Infrastructure** — Zero-trust deployment, scalable architecture

👉 Learn more at [cynbit.in/services](https://www.cynbit.in/services)`;
  }

  if (msg.includes('product') || msg.includes('studio') || msg.includes('tenantease') || msg.includes('revio')) {
    return `Cynbit has three proprietary products:
- **Cynbit Studio** — AI-powered career growth lab for developers
- **TenantEase** — Smart property & tenant management platform
- **Revio** — AI reputation management for multi-location businesses

👉 Explore at [cynbit.in/products](https://www.cynbit.in/products)`;
  }

  if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone')) {
    return `Here's how to reach Cynbit Technologies:
📧 **Email:** opportunities@cynbit.in
📞 **Phone:** +91 89479 62667
📍 **Address:** 32/115 Pratap Nagar, Jaipur, Rajasthan 302033

👉 [Visit Contact Page](https://www.cynbit.in/contact)`;
  }

  if (msg.includes('career') || msg.includes('job') || msg.includes('intern') || msg.includes('apply') || msg.includes('hire')) {
    return `Cynbit Technologies is actively hiring engineers, designers, and digital marketers!

To apply for internships or full-time roles:
📧 Email: opportunities@cynbit.in
👉 [View Careers Page](https://www.cynbit.in/careers)`;
  }

  if (msg.includes('bitelevate') || msg.includes('training') || msg.includes('program') || msg.includes('learn')) {
    return `**BitElevate** is Cynbit's globally recognized training program designed to bridge academic learning and industry mastery. It includes:
- Global Certification
- Expert Mentorship
- Industry Projects
- Career Placement Support

👉 [Explore BitElevate](https://www.cynbit.in/bitelevate)`;
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('quote') || msg.includes('how much')) {
    return `Cynbit provides custom quotes based on your project's specific requirements. To get a tailored estimate:
📧 Email: opportunities@cynbit.in
📞 Call: +91 89479 62667

👉 [Start Discovery](https://www.cynbit.in/contact)`;
  }

  if (msg.includes('location') || msg.includes('where') || msg.includes('address') || msg.includes('office')) {
    return `Cynbit's headquarters is located at:
📍 **32/115 Pratap Nagar, Jaipur, Rajasthan 302033**

They serve clients **globally** from their Jaipur engineering hub.
👉 [Contact Page](https://www.cynbit.in/contact)`;
  }

  return `I'm here to help you learn about Cynbit Technologies! You can ask me about:
- 🛠️ **Services** (AI Automation, Software Dev, SEO, Cloud)
- 📦 **Products** (Cynbit Studio, TenantEase, Revio)
- 💼 **Careers & Internships**
- 🎓 **BitElevate Training Program**
- 📞 **Contact & Pricing**

What would you like to know?`;
};
