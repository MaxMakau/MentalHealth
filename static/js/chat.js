// Make openChatModal globally available
window.openChatModal = function() {
    const chatModal = document.getElementById('chatModal');
    if (chatModal) {
        chatModal.classList.remove('hidden');
    } else {
        console.error('Chat modal not found');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const chatModal = document.getElementById('chatModal');
    const closeChatButton = document.getElementById('closeChatButton');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // Close chat modal
    function closeChat() {
        chatModal.classList.add('hidden');
    }

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message to backend
    async function sendMessage(message) {
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error:', error);
            return 'Sorry, I encountered an error.';
        }
    }

    // Handle send message
    async function handleSendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            // Get bot response
            const response = await sendMessage(message);
            addMessage(response);
        }
    }

    // Setup event listeners
    if (closeChatButton) {
        closeChatButton.addEventListener('click', closeChat);
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', handleSendMessage);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

    // Setup chat triggers with retry
    function setupChatTriggers() {
        const buttons = document.querySelectorAll('[data-text="Ask Watson"], [data-text="Talk to AI"], [data-text="Get Help"]');
        
        buttons.forEach(button => {
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openChatModal();
                });
            }
        });
    }

    // Initial setup
    setupChatTriggers();

    // Retry setup after a delay to ensure DOM is loaded
    setTimeout(setupChatTriggers, 1000);
    setTimeout(setupChatTriggers, 2000);
});