import User from './class/User';
import DB from './class/DB';

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
      await runAdd();
      break;
    case 'rm':
      await runRm();
      break;
  }
}

async function runRm() {
  return new Promise(() => {
    if (typeof argv.account_id !== 'number') {
      exit(
        1,
        'invalid parameters. need: --cookie_token as string; --account_id as number'
      );
    }

    const callback = function (err) {
      if (err) {
        exit(1, err.message);
      }
      if (this.changes === 0) exit(0, 'Not found');
      exit(0, 'Removed');
    };
    DB.connection.run(
      `DELETE FROM users WHERE account_id = ${argv.account_id}`,
      callback
    );
  });
}

function runAdd() {
  return new Promise(() => {
    if (
      typeof argv.cookie_token !== 'string' ||
      typeof argv.account_id !== 'number'
    ) {
      exit(
        1,
        'invalid parameters. need: --cookie_token as string; --account_id as number'
      );
    }

    const user = new User({
      account_id: argv.account_id,
      cookie_token: argv.cookie_token,
    });

    user
      .getFullUserInfo()
      .then(async () => {
        await user.save();
        await user.getRewards().catch(() => {});
        exit(0, 'Saved!');
      })
      .catch((err) => {
        exit(1, err.message);
      });
  });
}

function exit(code: number, message: string) {
  if (code !== 0) {
    console.error(new Error(message || 'closed with error'));
  } else if (message) {
    console.log(message);
  }
  process.exit(code);
}
