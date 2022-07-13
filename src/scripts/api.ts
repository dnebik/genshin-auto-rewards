// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { executeAdd, executeRm } from '@/scripts/utils';

const PORT = 8578;

const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/add', (req, res) => {
  const { cookie_token, account_id } = req.body;
  executeAdd(account_id, cookie_token)
    .then((m) => res.send(m))
    .catch((e) =>
      res.status(e.code || 500).send(e.textApi || e.message || 'error')
    );
});

app.post('/rm', (req, res) => {
  const { account_id } = req.body;
  executeRm(account_id)
    .then((m) => res.send(m))
    .catch((e) =>
      res.status(e.code || 500).send(e.textApi || e.message || 'error')
    );
});

export function runApi() {
  app.listen(PORT, onStart);
}

function onStart() {
  console.log(`Api started on port ${PORT}`);
}
