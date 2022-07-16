import axios, { AxiosError } from 'axios';
import { GenshinCookie, InitializeMessage } from '@/types/types';

const tgUrl = process.env.TG_BOT_URL;

export function getRewards(
  account_id: GenshinCookie['account_id'],
  cookie_token: GenshinCookie['cookie_token']
) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://hk4e-api-os.mihoyo.com/event/sol/sign?lang=ru-ru',
        { act_id: 'e202102251931481' },
        {
          headers: {
            Cookie: `cookie_token=${cookie_token}; account_id=${account_id}`,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        if (data.retcode !== 0) {
          reject(data);
        } else {
          resolve(data.message);
        }
      })
      .catch((e) => reject(e));
  });
}

export function getFullUserInfo(
  account_id: GenshinCookie['account_id'],
  cookie_token: GenshinCookie['cookie_token']
) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://api-os-takumi.mihoyo.com/community/user/wapi/getUserFullInfo',
        {
          headers: {
            Cookie: `cookie_token=${cookie_token}; account_id=${account_id}`,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        if (data.retcode !== 0) {
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((e: AxiosError) => {
        reject(e);
      });
  });
}

export async function sendMessageInTG(
  chatId,
  message: InitializeMessage | InitializeMessage[]
) {
  const url = new URL(tgUrl);
  url.pathname = '/send';
  return await axios
    .post(url.toString(), {
      message,
      chatId,
    })
    .catch((e) => {
      console.log(e);
    });
}
