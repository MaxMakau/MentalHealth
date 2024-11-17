const express = require('express');
const router = express.Router();

router.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Add your AI chat logic here
        const response = "This is a test response from the server";
        
        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 