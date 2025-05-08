function toggleChatbot() {
    let chatbot = document.getElementById("chatbot-container");
    let toggleButton = document.getElementById("chatbot-toggle");

    if (window.innerWidth <= 768) {  
        // Ensure chatbot is a floating window on mobile instead of a popup
        chatbot.style.position = "fixed";
        chatbot.style.bottom = "10px";
        chatbot.style.right = "10px";
        chatbot.style.width = "90vw";  // Adjust width for small screens
        chatbot.style.height = "50vh"; // Adjust height for mobile usability
        chatbot.style.borderRadius = "10px";
    } else {
        chatbot.style.position = "fixed";
        chatbot.style.bottom = "20px";
        chatbot.style.right = "20px";
        chatbot.style.width = "350px"; // Normal desktop width
        chatbot.style.height = "380px"; // Normal desktop height
    }

    // Toggle visibility
    if (chatbot.style.display === "none" || chatbot.style.display === "") {
        chatbot.style.display = "block";
        toggleButton.style.display = "none"; 
    } else {
        chatbot.style.display = "none";
        toggleButton.style.display = "block"; 
    }
}

// Ensure chatbot starts minimized
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("chatbot-container").style.display = "none";
    document.getElementById("chatbot-toggle").style.display = "block";
});

// Handle Enter and Shift+Enter keypress
document.getElementById("chatbot-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent new line
        sendMessage();
    }
});

function appendMessage(message, sender = 'bot') {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message-wrapper " + (sender === "user" ? "align-right" : "align-left");

    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message " + (sender === "user" ? "user-message" : "bot-message");
    msgDiv.textContent = message;

    wrapper.appendChild(msgDiv);
    document.getElementById("chatbot-messages").appendChild(wrapper);
    document.getElementById("chatbot-messages").scrollTop = document.getElementById("chatbot-messages").scrollHeight;
}

async function getAIResponse() {
    
     let apiKey = "";
     try {
        const response = await fetch(`${SERVER_URL}/api/secure-config`, {
          headers: {
             "Accept": "application/json",
            "Content-Type": "application/json"
          },
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();

        apiKey = data.openAiApiKey;
        
      } catch (error) {
        console.error("Failed to load secure config with openAiApiKey", error);
      }

    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    const data = {
        model: "gpt-4.1",
        messages: chatHistory,
        max_tokens: 2048,
        temperature: 0.7
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result.choices[0].message.content.trim();
}

async function getBotResponse(userInput) {
    userInput = userInput.toLowerCase().trim();
    let possibleResponses = [];

    for (let key in ifaKnowledgeBase) {
        let keywords = key.split(",").map(k => k.trim().toLowerCase()); // Split multiple keywords

        if (keywords.some(keyword => userInput.includes(keyword))) {
            possibleResponses.push(ifaKnowledgeBase[key]); // Collect matching responses
        }
    }

    // If only one match, return the response
    if (possibleResponses.length === 1) {
        return possibleResponses[0];
    }

    // If multiple matches found, ask for clarification
    if (possibleResponses.length > 1) {
        return `I found multiple possible answers. Can you clarify?\n\n- ${possibleResponses.join("\n- ")}`;
    }

    // If no match found, fallback to AI-generated response
    return await getAIResponse(userInput);
}


async function sendMessage() {
    let inputField = document.getElementById("chatbot-input");
    let messagesDiv = document.getElementById("chatbot-messages");
    let userMessage = inputField.value.trim().toLowerCase();

    if (userMessage === "") return;

    // Show user message
    let userMessageElement = document.createElement("div");
    userMessageElement.classList.add("chat-message-wrapper", "align-right");
    userMessageElement.innerHTML = `<div class="chat-message user-message">${userMessage}</div>`;
    messagesDiv.appendChild(userMessageElement);
    inputField.value = "";

    // Store in chat memory
    chatHistory.push({ role: "user", content: userMessage });

    // Show bot loading
    let botResponseElement = document.createElement("div");
    botResponseElement.classList.add("chat-message-wrapper", "align-left");
    botResponseElement.innerHTML = `<div class="chat-message bot-message"><em>Thinking...</em></div>`;
    messagesDiv.appendChild(botResponseElement);

    // Check if local response exists
    let response = checkIfaKnowledgeBase(userMessage);

    if (!response) {
        try {
            response = await getAIResponse(); // ← no longer passing input directly
        } catch (err) {
            console.error(err);
            response = "Sorry, I couldn't process your request.";
        }
    }

    // Update AI response visually
    botResponseElement.innerHTML = `<div class="chat-message bot-message">${response}</div>`;

    // Save bot reply to memory
    chatHistory.push({ role: "assistant", content: response });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    await logChat(userMessage, response);

}

function checkIfaKnowledgeBase(userMessage) {
    for (let key in ifaKnowledgeBase) {
        if (userMessage.includes(key)) {
            return ifaKnowledgeBase[key]; // Return the matching answer
        }
    }
    return null; // No match found
}

function resetChatMemory() {
    chatHistory = [
        { role: "system", content: "You are a helpful assistant specializing in Ifa divination and Yoruba spirituality." }
    ];
}

async function logChat(userMessage, botResponse) {
    try {
        await fetch(`${SERVER_URL}/api/chat/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userMessage, botResponse })
        });
    } catch (error) {
        console.error("Failed to log chat:", error);
    }
}
