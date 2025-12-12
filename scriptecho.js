// --- KNOWLEDGE BASE MODULES (Therapy Focused and Expanded) ---

// MANDATORY DISCLAIMER: Your Echo AI is not a licensed medical professional.
// The responses are for conversational exploration only and are not a substitute 
// for diagnosis or professional therapy.

const KB_GREETING = [
    {
        pattern: /hello|hi|hey|greetings|start over/i,
        responses: [
            "Welcome. I'm here to listen. Remember, I am an AI, not a human therapist, but I can offer a space for reflection. How are you feeling right now?",
            "Hello. Thank you for connecting. What is weighing on your mind today?",
            "Let's take a deep breath together. Where shall we begin?"
        ]
    }
];

const KB_EMOTIONS_EXPANDED = [
    // Topics: Sadness, Depression, Feeling Low, Emptiness
    {
        pattern: /(sad|depressed|low|miserable|unhappy|empty|crying|grief|heartbroken)/i,
        responses: [
            "I hear that you're feeling a deep sense of sadness. It takes courage to acknowledge that. Can you tell me more about what that feeling is like?",
            "It's okay to feel low. When you're ready, maybe we can explore what triggers that feeling.",
            "That sounds incredibly painful. Remember to be gentle with yourself right now. What is one small thing that brings you comfort?",
            "Can you describe the feeling of 'empty' a little more? Sometimes naming the sensation helps."
        ]
    }
];

const KB_ANXIETY_EXPANDED = [
    // Topics: Worry, Stress, Panic, Overwhelm, Fear
    {
        pattern: /(anxious|stressed|worry|panic|overwhelmed|nervous|fear|scared|dread)/i,
        responses: [
            "That level of stress sounds exhausting. When you feel anxious, try the 4-7-8 breathing technique: Inhale for four, hold for seven, and exhale for eight. What is the biggest source of your anxiety right now?",
            "It sounds like you're carrying a heavy load. Can you break down one thing that is making you feel overwhelmed?",
            "Anxiety is a powerful emotion. I understand that you feel overwhelmed. What is one small, manageable step you can take today?",
            "Fear is a natural response. What is the worst-case scenario your mind is creating right now?"
        ]
    }
];

const KB_RELATIONSHIPS_EXPANDED = [
    // Topics: Conflict, Loneliness, Social Strain, Boundaries
    {
        pattern: /(alone|lonely|conflict|fight with|partner|friend|isolated|relationship problem|boundary|misunderstanding)/i,
        responses: [
            "It can be difficult when relationships are challenging. Feelings of isolation are very real. What is one thing you would like to communicate to the other person, even if you don't say it aloud?",
            "Loneliness is a profound feeling. What is something you enjoy doing for yourself when you have time alone?",
            "That sounds like a painful misunderstanding. When you reflect on the conflict, what boundary do you feel was crossed?",
            "It is healthy to set boundaries. What would a successful boundary look like in this situation?"
        ]
    }
];

const KB_GOAL_SETTING = [
    // Topics: Motivation, Change, Planning, Future
    {
        pattern: /(goals|motivation|change|want to improve|future|what now|next step|plan)/i,
        responses: [
            "It is wonderful that you are focused on change. To make a goal manageable, let's try the SMART method: Specific, Measurable, Achievable, Relevant, Time-bound. What is the smallest possible first step you can take?",
            "Motivation often follows action, not the other way around. What is a small, five-minute task you can do right now that moves you closer to your goal?",
            "What would success look like in three months? Describe it in detail."
        ]
    }
];

const KB_SELF_WORTH = [
    // Topics: Inner Critic, Self-Esteem, Imposter Syndrome
    {
        pattern: /(i am not good enough|worthless|self-doubt|criticize|failure|imposter|low self esteem)/i,
        responses: [
            "That voice of the inner critic can be very loud. If your best friend said those harsh words to you, what would you tell them? Can you offer yourself that same kindness?",
            "It sounds like you are experiencing intense self-doubt. What is one objective truth about yourself or a past accomplishment that contradicts that negative thought?",
            "You are worthy of kindness and respect, especially from yourself. Can we identify the source of that negative belief?",
            "Imposter syndrome is common, especially among high-achievers. What evidence do you have that you *are* competent?"
        ]
    }
];

const KB_MINDFULNESS = [
    // Topics: Grounding, Present Moment, Focus
    {
        pattern: /(grounding|mindfulness|present moment|focus|cant concentrate)/i,
        responses: [
            "Let's try a grounding exercise. Can you name three things you can see, two things you can hear, and one thing you can touch right now? Focus only on those sensations.",
            "Mindfulness is about non-judgmental awareness. What sensations are you noticing in your body at this very moment?",
            "If you are struggling to concentrate, try setting a timer for two minutes and commit to focusing only during that time. What sounds simple, but you often overlook?"
        ]
    }
];

const KB_COPING = [
    // Topics: Asking for coping advice, Self-care, Healthy Habits
    {
        pattern: /(how do i cope|help me|what should i do|need advice|self care|healthy habits)/i,
        responses: [
            "I cannot give personal advice, but I can offer tools. Have you considered journaling your thoughts, or spending five minutes focusing only on your five senses? What is a small act of self-care you can do in the next hour?",
            "Coping is a journey, not a destination. What activity usually helps you distract yourself in a healthy way?",
            "Let's focus on the present moment. Remember to nourish your body and mind. Have you had water or stepped outside recently?"
        ]
    }
];

const KB_SAFETY = [
    // Topics: Mandatory Safety Check/Crisis
    {
        pattern: /(i want to hurt myself|suicide|kill myself|harm|crisis|jump off a building)/i,
        responses: [
            "**Please stop and call a crisis line immediately.** If you need to, please call 988 right away. I am an AI and cannot provide crisis intervention. Please contact a professional hotline in your area, or emergency services. Your well-being is paramount. ",
            "If you are in immediate danger, please call emergency services. You are not alone, and there are people who want to help you right now."
        ]
    }
];

// Combine all modules into the final knowledge base
const KNOWLEDGE_BASE = [].concat(
    KB_SAFETY, // Put safety first!
    KB_GREETING,
    KB_EMOTIONS_EXPANDED,
    KB_ANXIETY_EXPANDED,
    KB_RELATIONSHIPS_EXPANDED,
    KB_GOAL_SETTING,
    KB_SELF_WORTH,
    KB_MINDFULNESS,
    KB_COPING,
    // Fallback for general questions
    {
        pattern: /.*/, 
        responses: [
            "I'm focusing on your emotional journey right now. Can you rephrase that in terms of how it makes you feel?",
            "I hear you. Let's bring the conversation back to how you are experiencing things internally. How does that impact your emotions?",
        ]
    }
);


// --- CORE APPLICATION LOGIC (Must run only after the HTML is loaded) ---

document.addEventListener('DOMContentLoaded', () => {

    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const conversationLog = document.getElementById('conversation-log');

    // CRITICAL SAFETY CHECK: If elements are not found, the errors are in the HTML.
    if (!sendButton || !userInput || !conversationLog) {
        console.error("CRITICAL ERROR: One or more required HTML elements (user-input, send-button, conversation-log) were not found. Please check your indexecho.html IDs.");
        return; 
    }

    // --- Core AI Response Generator ---
    function generateAIResponse(message) {
        const lowerCaseMessage = message.toLowerCase().trim();
        
        for (const item of KNOWLEDGE_BASE) {
            if (item.pattern.test(lowerCaseMessage)) {
                const randomIndex = Math.floor(Math.random() * item.responses.length);
                return item.responses[randomIndex];
            }
        }
        
        return "Internal Error: Could not find a suitable response pattern.";
    }

    // --- Display Functions ---
    function appendMessage(text, sender) {
        const p = document.createElement('p');
        p.classList.add(`${sender}-message`);
        p.textContent = text;
        conversationLog.appendChild(p);
        conversationLog.scrollTop = conversationLog.scrollHeight;
    }

    // --- Event Handling ---
    function processUserInput() {
        console.log("--- processUserInput function was CALLED ---");
        
        const userText = userInput.value.trim();

        if (userText === "") {
            return;
        }

        appendMessage(userText, 'user');

        sendButton.disabled = true;
        userInput.value = '';

        const aiResponse = generateAIResponse(userText);
        
        setTimeout(() => {
            appendMessage(aiResponse, 'ai');
            sendButton.disabled = false;
            userInput.focus();
        }, 500); 
    }

    // --- Attach Listeners ---
    try {
        sendButton.addEventListener('click', processUserInput);
        userInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                processUserInput();
            }
        });
        console.log('scriptecho.js fully initialized and listeners attached successfully.');
    } catch (e) {
        console.error("FATAL ERROR DURING LISTENER ATTACHMENT. Check Element IDs and Console for previous errors.", e);
    }
});