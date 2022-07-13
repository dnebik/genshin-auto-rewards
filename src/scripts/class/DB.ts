import { Database, OPEN_READWRITE, OPEN_CREATE } from 'sqlite3';
import * as path from 'path';

const DB_PATH = path.resolve(__dirname, 'users.db');

export default class DB {
  public static connection: Database;

  public static connect() {
    return new Promise((resolve, reject) => {
      DB.connection = new Database(
        DB_PATH,
        OPEN_READWRITE | OPEN_CREATE,
        (err) => {
          if (err) {
            reject(err);
          } else {
            DB.connection.run('PRAGMA journal_mode = WAL;');
            DB.createUsersTable()
              .then(() => resolve(DB.connection))
              .catch((err) => reject(err));
          }
        }
      );
    });
  }

  private static createUsersTable() {
    return new Promise((resolve, reject) => {
      const callback = function (err) {
        if (err) reject(err);
        resolve(DB.connection);
      };

      DB.connection.run(
        `CREATE TABLE IF NOT EXISTS users (account_id INTEGER PRIMARY KEY, cookie_token TEXT NOT NULL);`,
        callback
      );
    });
  }
}
