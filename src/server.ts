import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (request, response) => {
    return response.json({ message: 'List.' });
});

server.post('/', (request, response) => {
    const data = request.body;

    return response.json(data);
});

server.listen(3333, () => {
    console.log('===> Server started on port 3333 <===');
});