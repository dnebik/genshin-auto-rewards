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

export const constants = {
  ERRORS,
};
