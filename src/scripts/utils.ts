import DB from './class/DB';
import User from './class/User';
import { constants } from '@/constants';

export async function executeRm(account_id: any): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof account_id !== 'number') {
      reject(constants.ERRORS.INVALID_REMOVE_PARAMS);
    }

    const callback = function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes === 0) reject(constants.ERRORS.NOT_FOUND);
      resolve('Removed');
    };
    DB.connection.run(
      `DELETE FROM users WHERE account_id = ${account_id}`,
      callback
    );
  });
}

export function executeAdd(
  account_id: any,
  cookie_token: any
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof cookie_token !== 'string' || typeof account_id !== 'number') {
      reject(constants.ERRORS.INVALID_ADD_PARAMS);
    }

    const user = new User({
      account_id,
      cookie_token,
    });

    user
      .getFullUserInfo()
      .then(async () => {
        await user.save();
        await user.getRewards().catch(() => {});
        resolve('Saved');
      })
      .catch((err) => {
        reject(err);
      });
  });
}
