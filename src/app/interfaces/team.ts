import { Countries, Player } from './players';

export interface Team {
  $key?: string;
  name: string;
  country: Countries;
  players: Player[];
}
