import DB from './scripts/class/DB';
import commands from './scripts/commands';
import { runSchedule } from './scripts/runner';
import { runApi } from './scripts/api';

(async function () {
  try {
    await DB.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  await commands();
  runSchedule();
  runApi();
})();
