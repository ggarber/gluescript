import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export const rootHandler = (_req: Request, res: Response) => {
  const queueId = uuidv4();
  return res.send(`Ugliest page ever.   Your new personal queue id is ${queueId}\r\nMake a post request to /queue/${queueId}`);
};

export const getQueueHandler = async (req: Request, res: Response) => {
  const items = await client.lRange('queue:' + req.params.queue, 0, 99);

  return res.send(items.join('\r\n'));
};

export const postQueueHandler = async (req: Request, res: Response) => {
  const body = req.body;
  console.log('body', body);

  await client.lPush('queue:' + req.params.queue, JSON.stringify(body));
  await client.lTrim('queue:' + req.params.queue, 0, 99);
  return res.sendStatus(200);
};

export const deleteQueueHandler = async (req: Request, res: Response) => {
  await client.lTrim('queue:' + req.params.queue, 0, 0);
  return res.sendStatus(200);
};
