import streamlit as st
from backend.mentalbot import chat_with_bot

# Application title
st.title("Mental Health AI Chat Assistant")

# Navigation options
pages = ["Home", "Chat"]
selected_page = st.sidebar.radio("Navigate", pages)

# Home Page
if selected_page == "Home":
    st.header("Welcome to the Mental Health AI Chat Assistant!")
    st.write(
        """
        This assistant is here to help you with mental health resources and provide a supportive conversational AI.
        Navigate to the **Chat** section to start a conversation.
        """
    )

# Chat Page
elif selected_page == "Chat":
    st.header("Chat with the AI Assistant")
    st.write("Start typing below to begin a conversation.")

    # Input box for user message
    user_message = st.text_input("Enter your message:", placeholder="Type something...")
    
    # Button to send the message
    if st.button("Send"):
        if not user_message:
            st.error("Please enter a message to continue.")
        else:
            try:
                # Pass user input to the chatbot logic
                chat_response = chat_with_bot(user_message)
                
                # Display chatbot's response
                st.success("AI Assistant's Response:")
                st.write(chat_response['response'])
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
