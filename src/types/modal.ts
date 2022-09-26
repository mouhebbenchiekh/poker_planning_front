export interface ModalRoom {
  username: boolean;
  room: boolean;
  share: boolean;
}
export interface actionRoom {
  type: ActionTypes;
  payload: boolean;
}

const Links = {
  Link1: 'test1',
  Link2: 'test2',
} as const;

type Links = typeof Links[keyof typeof Links];

const actions = {
  OpenUsername: 'open_username',
  OpenRoom: 'open_room',
  OpenShare: 'open_share',
} as const;
export type ActionTypes = typeof actions[keyof typeof actions];
