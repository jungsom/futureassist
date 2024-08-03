export interface IBoard {
  board_id: number;
  user_id: number;
  user_name: string;
  title: string;
  content: string;
  hashtag: string[];
  views: number;
  updatedAt: string;
}
