import DB from './scripts/class/DB';
import commands from './scripts/commands';
import { run } from './scripts/runner';

(async function () {
  try {
    await DB.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  await commands();
  run();

  // try {
  //   // await new User({
  //   //   account_id: 207326232,
  //   //   cookie_token: '4vZGjXcV0iYCIwF7fNsAwzJniLxY2Y5uVrZTX7pf',
  //   // }).save();
  //   // await new User({
  //   //   account_id: 136899397,
  //   //   cookie_token: 'YR8t2rxMpQZUQm38FuVfHlwjdtdTAVWUo5DsKkJr',
  //   // }).save();
  //   // await user.save();
  //   // const some = await User.get(207332);
  //   const all = await User.getAll();
  //   Promise.all(
  //     all.map(async (user) => {
  //       const data = await user.getFullUserInfo();
  //       console.log(data);
  //     })
  //   ).then((list) => console.log(list));
  // } catch (e) {
  //   console.error(e);
  // }
})();
