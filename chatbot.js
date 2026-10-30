/**
 * AVATHAR AI ACADEMY — INTERACTIVE AI ASSISTANT / FAQ CHATBOT
 * Fast, privacy-safe, client-side assistant answering queries using confirmed academy facts.
 * Provides instant answers and 1-click WhatsApp handoff for personalized guidance.
 */

(function () {
  const KNOWLEDGE_BASE = [
    {
      keywords: ["course", "courses", "subject", "learn", "study", "curriculum"],
      question: "What courses are available?",
      answer: "Avathar AI Academy offers 8 specialized technology courses:\n\n1. Artificial Intelligence & Machine Learning\n2. Data Science & Analytics\n3. Cyber Security\n4. Cloud Computing & DevOps\n5. Forward Deployed Engineer\n6. UI/UX Design\n7. Digital Marketing\n8. Business Analytics & Professional Skills\n\nYou can explore full syllabi on our Courses page or submit an enquiry for syllabus details!"
    },
    {
      keywords: ["internship", "intern", "internships", "domain", "domains", "2026"],
      question: "What internship domains are available?",
      answer: "We offer technology internships across 7 domains:\n\n1. Web Development\n2. Mobile App Development\n3. UI/UX Design\n4. Graphic Design\n5. Social Media & Digital Marketing\n6. Embedded Systems\n7. VLSI Design\n\nInternships focus on hands-on, project-based learning and portfolio development."
    },
    {
      keywords: ["mode", "online", "offline", "classroom", "remote", "hybrid", "training"],
      question: "Is training available online and offline?",
      answer: "Yes! Training at Avathar AI Academy is available in both **Online** and **Offline** modes. During your course enquiry or internship application, you can select Online, Offline, or request guidance from our advisors to choose the right mode."
    },
    {
      keywords: ["apply", "application", "register", "join", "eligibility"],
      question: "How do I apply for an internship?",
      answer: "You can apply directly via our Internships page by selecting your preferred domain and clicking 'Apply Now'. Students, freshers, engineering, diploma, and final-year learners are eligible to apply."
    },
    {
      keywords: ["contact", "phone", "whatsapp", "call", "reach", "number"],
      question: "How can I contact Avathar AI Academy?",
      answer: "You can reach us directly via Phone or WhatsApp at **+91 97512 05260**. Click the WhatsApp button in the header or chat window to start a conversation with our learning counselors."
    },
    {
      keywords: ["address", "location", "place", "karur", "where", "office"],
      question: "What is the academy's address?",
      answer: "Our academy is located at:\n**31, Velammal Layout, Sengundhapuran Post, Karur, Tamil Nadu**.\nWe welcome students for offline learning and consultations."
    },
    {
      keywords: ["fee", "fees", "cost", "price", "pricing", "payment"],
      question: "How can I enquire about course fees?",
      answer: "Course fees are customized according to your chosen learning track and training mode. Please submit an enquiry form or message our counselors directly on WhatsApp at **+91 97512 05260** for current fee details."
    },
    {
      keywords: ["who", "eligibility", "beginner", "student", "qualification"],
      question: "Who can join the academy?",
      answer: "Our programs and internships are open to college students, engineering & diploma students, final-year candidates, recent freshers, and motivated beginners eager to develop emerging technology skills."
    }
  ];

  const DEFAULT_ANSWER = "Thank you for asking! For specific details, our counselors are ready to help you directly. You can message us on WhatsApp at **+91 97512 05260** or submit an enquiry on our website.";

  document.addEventListener('DOMContentLoaded', function () {
    const triggerBtn = document.getElementById('chatbot-toggle-btn');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const suggestionsContainer = document.getElementById('chatbot-suggestions');

    if (!triggerBtn || !chatWindow) return;

    // Toggle Chat Window
    triggerBtn.addEventListener('click', function () {
      chatWindow.classList.toggle('open');
      if (chatWindow.classList.contains('open')) {
        inputField?.focus();
      }
    });

    closeBtn?.addEventListener('click', function () {
      chatWindow.classList.remove('open');
    });

    // Append Message to UI
    function appendMessage(text, sender = 'bot') {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${sender}`;
      
      // Basic markdown formatting: bold and newlines
      let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
      
      bubble.innerHTML = formattedText;
      messagesContainer.appendChild(bubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Process User Query
    function handleUserQuery(query) {
      if (!query || query.trim() === '') return;
      const cleanQuery = query.trim();
      appendMessage(cleanQuery, 'user');
      inputField.value = '';

      // Match against knowledge base
      const lower = cleanQuery.toLowerCase();
      let matchedItem = null;

      // Exact or partial keyword scoring
      let highestScore = 0;
      KNOWLEDGE_BASE.forEach(item => {
        let score = 0;
        item.keywords.forEach(keyword => {
          if (lower.includes(keyword)) score += 2;
        });
        if (score > highestScore) {
          highestScore = score;
          matchedItem = item;
        }
      });

      // Typing simulation
      setTimeout(() => {
        if (matchedItem && highestScore > 0) {
          appendMessage(matchedItem.answer, 'bot');
        } else {
          appendMessage(DEFAULT_ANSWER, 'bot');
        }

        // WhatsApp handoff suggestion
        appendWhatsAppSuggestion();
      }, 350);
    }

    function appendWhatsAppSuggestion() {
      const waAction = document.createElement('div');
      waAction.className = 'chat-bubble bot';
      waAction.style.background = 'rgba(7, 89, 199, 0.25)';
      waAction.style.border = '1px solid rgba(0, 191, 255, 0.3)';
      waAction.innerHTML = `
        <div style="font-size: 0.85rem; margin-bottom: 0.5rem;">Would you like to speak directly with an admissions counselor?</div>
        <a href="https://wa.me/919751205260?text=Hello%20Avathar%20AI%20Academy%2C%20I%20have%20an%20enquiry%20regarding%20courses%20and%20internships." 
           target="_blank" rel="noopener noreferrer" 
           class="btn btn-sm btn-whatsapp" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; display: inline-flex;">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.832.88 2.796.88 3.178 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.771zm0-2.172c4.418 0 8 3.582 8 8 0 1.488-.415 2.884-1.137 4.084l1.106 4.04-4.148-1.088c-1.163.682-2.51 1.084-3.821 1.084-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8z"/></svg>
          Chat on WhatsApp
        </a>
      `;
      messagesContainer.appendChild(waAction);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Input handlers
    sendBtn?.addEventListener('click', () => {
      handleUserQuery(inputField.value);
    });

    inputField?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserQuery(inputField.value);
      }
    });

    // Setup Suggested Question Pills
    if (suggestionsContainer) {
      const sampleQuestions = [
        "What courses are available?",
        "What internship domains are available?",
        "Is training online or offline?",
        "How do I apply for an internship?",
        "What is the academy's address?",
        "How can I enquire about course fees?"
      ];

      sampleQuestions.forEach(q => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'suggestion-chip';
        chip.textContent = q;
        chip.addEventListener('click', () => {
          handleUserQuery(q);
        });
        suggestionsContainer.appendChild(chip);
      });
    }
  });
})();
