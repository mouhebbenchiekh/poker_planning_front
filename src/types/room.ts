export interface IRoom {
  owner: string;
  refrence: string;
  type: RoomType;
  name: string;
  _id: string;
}

export enum RoomType {
  fibonachi = 'Fibonachi',
  regular = 'Regular',
}
