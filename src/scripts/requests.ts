import axios from 'axios';

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
          reject(new Error(data.retcode + ': ' + data.message));
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
          reject(new Error(data.retcode + ': ' + data.message));
        } else {
          resolve(data);
        }
      })
      .catch((e) => reject(e));
  });
}
