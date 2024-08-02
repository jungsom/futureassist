export interface IBoard {
  board_id: number;
  user_id: number;
  title: string;
  content: string;
  hashtag: string[];
  views: number;
  likes: number;
  updatedAt: string;
}
