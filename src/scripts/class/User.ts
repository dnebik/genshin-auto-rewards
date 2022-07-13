import { getFullUserInfo, getRewards } from '../requests';
import DB from './DB';

export default class User {
  public cookie_token: GenshinCookie['cookie_token'];
  public account_id: GenshinCookie['account_id'];

  constructor(options: GenshinCookie) {
    this.cookie_token = options.cookie_token;
    this.account_id = options.account_id;
  }

  public async getRewards() {
    return await getRewards(this.account_id, this.cookie_token);
  }

  public async getFullUserInfo(): Promise<string> {
    return await getFullUserInfo(this.account_id, this.cookie_token);
  }

  public async save() {
    return new Promise((resolve, reject) => {
      const callback = (err) => {
        if (err) reject(err);
        resolve(true);
      };

      DB.connection.run(
        `
      REPLACE INTO users (account_id, cookie_token)
          VALUES(${this.account_id}, '${this.cookie_token}');
        `,
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

      DB.connection.all(`SELECT * FROM users`, callback);
    });
  }
}
