interface GenshinCookie {
  cookie_token: string;
  account_id: number;
}

export type MessageTypes = ['sticker', 'text'];
export type InitializeMessage =
  | [MessageTypes[number], string]
  | [MessageTypes[number], string, number];
