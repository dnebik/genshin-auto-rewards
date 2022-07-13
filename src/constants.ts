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
      'Invalid parameters. need: cookie_token as string; account_id as number',
    code: 400,
  },
};

export const constants = {
  ERRORS,
};
