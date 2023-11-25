import express from 'express';
import { rootHandler, postQueueHandler, getQueueHandler, deleteQueueHandler } from './handlers';

const app = express();
const port = process.env.PORT || '9090';
app.use(express.json())

app.get('/', rootHandler);
app.post('/queue/:queue', postQueueHandler);
app.get('/queue/:queue', getQueueHandler);
app.delete('/queue/:queue', deleteQueueHandler);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

