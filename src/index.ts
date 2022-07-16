import 'dotenv/config';
import DB from './scripts/class/DB';
import commands from './scripts/commands';
import { runSchedule } from './scripts/runner';
import { runApi } from './scripts/api';

if (!process.env.TG_BOT_URL) {
  console.log('No TG_BOT_URL env');
  process.exit(1);
}

(async function () {
  try {
    await DB.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  await commands();

  try {
    runSchedule();
    runApi();
  } catch (e) {
    console.error(e);
  }
})();
