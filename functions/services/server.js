const express = require('express');
const app = express();
const port = 3000;

// Import function we will run and serve to chainlink functions when called
const { getFarcasterLikes } = require('./function-code/get-farcaster-likes');

// Host function at endpoint
app.get('/', async (req, res) => {
    console.log('getLikes ---');

    try {
        const result = await getFarcasterLikes('0x92dc68040066319b2174c791f269af3ea5ac1bd1');
        console.log('result', result);
        res.send('Hello World!');
    } catch (error) {
        console.error('Error in handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
