import User from './class/User';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;

export function runSchedule() {
  const cron = new CronJob('* */6 * * *', async () => {
    const all = await User.getAll();
    getRewards(all);
  });
  cron.start();
}

async function getRewards(list: User[]) {
  const user = list.pop();
  user
    .getRewards()
    .then(() => {
      console.log(user.account_id, 'Getted!');
    })
    .catch((e) => console.log(user.account_id, e.message))
    .finally(() => {
      if (list.length) getRewards(list);
    });
}
