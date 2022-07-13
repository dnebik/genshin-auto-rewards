import User from './class/User';
import DB from './class/DB';
import { executeAdd, executeRm } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
const existedCommands = ['add', 'rm'] as const;
type ExistedCommands = typeof existedCommands[number];

export default async function commands() {
  if (argv._.length === 0) return;
  if (argv._.length > 1) {
    exit(1, 'unknown command');
  }

  const commandName: ExistedCommands = argv._[0];
  if (!existedCommands.includes(commandName)) {
    exit(1, 'unknown command');
  }

  switch (commandName) {
    case 'add':
      await executeAdd(argv.account_id, argv.cookie_token)
        .then((m: string) => exit(0, m))
        .catch((e) => exit(e.code || 1, e.text || e.message));
      break;
    case 'rm':
      await executeRm(argv.account_id)
        .then((m: string) => exit(0, m))
        .catch((e) => exit(e.code, e.text || e.message));
      break;
  }
}

function exit(code: number, message: string) {
  if (code !== 0) {
    console.error(new Error(message || 'Closed with error'));
  } else if (message) {
    console.log(message);
  }
  process.exit(code);
}
