import { InitializeMessage } from '@/types/types';

export const ERRORS = {
  NOT_FOUND: { text: 'Not found', code: 404 },
  INVALID_REMOVE_PARAMS: {
    text: 'Invalid parameters. need: --cookie_token as string; --account_id as number',
    textApi:
      'Invalid parameters. need: cookie_token as string; account_id as number',
    code: 400,
  },
  INVALID_ADD_PARAMS: {
    text: 'Invalid parameters. need: --cookie_token as string; --account_id as number',
    textApi:
      'Invalid parameters. need: cookie_token as string; account_id as number; tg_chat_id as number',
    code: 400,
  },
  ALREADY_EXIST: {
    text: 'Account already exist',
    textApi: 'Профиль уже добавлен',
    code: 456,
  },
  INVALID_LIST_PARAMS: {
    textApi: 'Invalid parameters. need: tg_chat_id as number',
    code: 400,
  },
};

export const TAKEN_MESSAGES: InitializeMessage[][] = [
  [
    ['text', 'Я собрала для тебя награду!'],
    ['sticker', 'SAHAROZA_EXCITED'],
  ],
  [
    ['text', 'Твоя награда ждет тебя в игре!'],
    ['sticker', 'SAHAROZA_OK'],
  ],
  [
    ['text', 'По моей информации твой подарочек уже в игре!'],
    ['sticker', 'CHECKING'],
  ],
  [
    [
      'text',
      'В колендаре можно забирать награду!\nОй! Я же ее уже забрала, принимай ее в игре!',
    ],
    ['sticker', 'SAHAROZA_OK'],
  ],
  [
    ['text', 'Новый день с новой наградой!'],
    ['sticker', 'SAHAROZA_EXCITED'],
  ],
  [
    ['text', 'Я сходила за твоей наградой!'],
    ['sticker', 'OK'],
  ],
  [
    [
      'text',
      'Там какая то мелочь в календаре, но я взяла ее тебе на всякий случай.',
    ],
    ['sticker', 'SADNESS'],
  ],
  [
    ['text', 'Твоя награда собрана, надеюсь не за бесплатно!'],
    ['sticker', 'MONA_MONEY'],
  ],
  [
    ['text', 'Предсказываю что ты заберешь сегодня награду в игре!'],
    ['sticker', 'MONA_HEART'],
  ],
  [
    ['sticker', 'MONA_YES_IAM'],
    ['text', 'Можешь похвалить меня, ведь я собрала твою награду!'],
  ],
];

export const constants = {
  ERRORS,
  TAKEN_MESSAGES,
};
