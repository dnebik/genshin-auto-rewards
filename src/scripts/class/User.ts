import { getFullUserInfo, getRewards } from '../requests';
import DB from './DB';
import { GenshinCookie } from '@/types/types';

interface ConstructorOptions extends GenshinCookie {
  tg_chat_id?: number;
}

export default class User {
  public cookie_token: GenshinCookie['cookie_token'];
  public account_id: GenshinCookie['account_id'];
  public tg_chat_id?: ConstructorOptions['tg_chat_id'];

  constructor(options: ConstructorOptions) {
    this.cookie_token = options.cookie_token;
    this.account_id = options.account_id;
    this.tg_chat_id = options.tg_chat_id;
  }

  public async getRewards() {
    return await getRewards(this.account_id, this.cookie_token).catch(
      (data) => {
        if (data.retcode === -100) this.setAccess(false).catch(() => {});
        throw new Error(data.retcode + ': ' + data.message);
      }
    );
  }

  public async getFullUserInfo() {
    return await getFullUserInfo(this.account_id, this.cookie_token).catch(
      (data) => {
        if (data.retcode === -100) this.setAccess(false).catch(() => {});
      }
    );
  }

  public async setAccess(value: boolean) {
    return new Promise((resolve, reject) => {
      const callback = function (err) {
        if (err) reject(err);
        resolve(true);
      };

      DB.connection.run(
        `UPDATE users SET has_access = ${value ? 1 : 0} WHERE account_id = ${
          this.account_id
        };`,
        callback
      );
    });
  }

  public async save() {
    return new Promise((resolve, reject) => {
      const callback = (err) => {
        if (err) reject(err);
        resolve(true);
      };

      const columns = `account_id, cookie_token ${
        (this.tg_chat_id && ', tg_chat_id') || ''
      }`;
      const values = `${this.account_id}, '${this.cookie_token}' ${
        (this.tg_chat_id && `, ${this.tg_chat_id}`) || ''
      }`;

      DB.connection.run(
        `REPLACE INTO users (${columns}) VALUES(${values});`,
        callback
      );
    });
  }

  public static async get(
    account_id: GenshinCookie['account_id']
  ): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const callback = (err, row) => {
        if (err) reject(err);
        if (row) resolve(new User(row));
        resolve(null);
      };

      DB.connection.get(
        `SELECT * FROM users WHERE account_id = ${account_id};`,
        callback
      );
    });
  }

  public static async getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const callback = (err, rows) => {
        if (err) reject(err);
        if (rows) resolve(rows.map((row) => new User(row)));
        resolve([]);
      };

      DB.connection.all(`SELECT * FROM users WHERE has_access = 1`, callback);
    });
  }

  public static async getAllFromChat(id: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const callback = (err, rows) => {
        if (err) reject(err);
        if (rows) resolve(rows.map((row) => new User(row)));
        resolve([]);
      };

      DB.connection.all(
        `SELECT account_id, cookie_token FROM users WHERE users.tg_chat_id = ${id}`,
        callback
      );
    });
  }
}
