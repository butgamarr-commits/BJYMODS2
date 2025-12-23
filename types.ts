
export interface AppData {
  id: string;
  name: string;
  link: string;
  timestamp: number;
  icon?: string;
}

export enum PanelView {
  USER = 'user',
  ADMIN = 'admin'
}
