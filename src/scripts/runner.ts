import User from './class/User';
import { sendMessageInTG } from '@/scripts/requests';
import { constants } from '@/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;

export function runSchedule() {
  const cron = new CronJob('0 */2 * * *', async () => {
    console.log('start sending rewards!');
    const all = await User.getAll();
    await getRewards(all);
    console.log('done!');
  });
  cron.start();
}

async function getRewards(list: User[]) {
  const user = list.pop();
  user
    .getRewards()
    .then(async () => {
      if (user.tg_chat_id) {
        const random = Math.floor(
          Math.random() * constants.TAKEN_MESSAGES.length
        );
        await sendMessageInTG(
          user.tg_chat_id,
          constants.TAKEN_MESSAGES[random]
        );
      }
    })
    .catch(async (e) => {
      if (e.retcode === -100) {
        if (user.tg_chat_id) {
          await sendMessageInTG(user.tg_chat_id, [
            [
              'text',
              `К сожалению я больше не могу собирать награды для тебя с акаунта ${user.account_id}. ` +
                'Кука связывающая твой профиль к сожалению больше не действительна. ' +
                'Скорее всего ты перезашел в свой акаунт после чего она обновилась, а старая больше не дает доступ. ' +
                'Если у тебя 2 и более профиля, то чтобы было удобнее их привязывать - попробуй входить из приватного окна для привязки профилей, ' +
                'а профилем которым хочешь пользоваться постоянно зайди в своем основном браузере без приватного режима. Это должно помочь!',
            ],
            ['sticker', 'SAHAROZA_SAD'],
          ]);
        }
      }
    })
    .finally(() => {
      if (list.length) getRewards(list);
    });
}
