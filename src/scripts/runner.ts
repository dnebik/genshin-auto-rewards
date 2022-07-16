import User from './class/User';
import { sendMessageInTG } from '@/scripts/requests';
import { constants } from '@/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;

export function runSchedule() {
  const cron = new CronJob('0/1 * * * *', async () => {
    console.log('start sending rewards!');
    const all = await User.getAll();
    await getRewards(all);
    console.log('done!');
  });
  cron.start();
}

async function getRewards(list: User[]) {
  if (!list.length) return;
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
      if ((e.message as string).search(/-100/g) > -1) {
        if (user.tg_chat_id) {
          await sendMessageInTG(user.tg_chat_id, [
            [
              'text',
              `<b>К сожалению я больше не могу собирать награды для тебя с акаунта ${user.account_id}.<b>\n\n` +
                'Кука связывающая твой профиль к сожалению больше не действительна. ' +
                'Скорее всего ты перезашел в свой акаунт после чего она обновилась, а старая больше не дает доступ.\n\n' +
                'Тебе придется заного добавить аккаунт, если хочешь чтобы награды собирались и дальше.\n' +
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
