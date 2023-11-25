import express from 'express';
import { rootHandler, postQueueHandler, getQueueHandler } from './handlers';

const app = express();
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.post('/queue/:queue', postQueueHandler);
app.get('/queue/:queue', getQueueHandler);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
