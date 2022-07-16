// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { executeAdd, executeRm } from '@/scripts/utils';
import User from '@/scripts/class/User';
import { constants } from '@/constants';

const PORT = 8578;

const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/add', (req, res) => {
  const { cookie_token, account_id, tg_chat_id } = req.body;
  if (typeof tg_chat_id !== 'number') {
    res
      .status(constants.ERRORS.INVALID_ADD_PARAMS.code)
      .send(constants.ERRORS.INVALID_ADD_PARAMS.textApi);
    return;
  }
  executeAdd(account_id, cookie_token, tg_chat_id)
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

app.post('/list', (req, res) => {
  const { tg_chat_id } = req.body;
  if (typeof tg_chat_id !== 'number') {
    res.status(400).send(constants.ERRORS.INVALID_LIST_PARAMS);
    return;
  }
  User.getAllFromChat(tg_chat_id)
    .then(async (m) => {
      const result = Object.fromEntries(
        await Promise.all(
          m.map(async (user) => {
            const info = await user
              .getFullUserInfo()
              .then(({ data }) => data)
              .catch(() => false);
            return [user.account_id, info?.user_info?.nickname || false];
          })
        )
      );
      res.json(result);
    })
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
