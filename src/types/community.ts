
export interface PostAuthor {
  name: string;
  avatar: string;
  username: string;
}

export interface PostReactions {
  "👍": number;
  "❤️"?: number;
  "🔥"?: number;
  "🚀"?: number;
  "🧠": number;
  "💰": number;
  "🤔"?: number;
  "👏"?: number;
  [key: string]: number | undefined;
}

export interface Post {
  id: number;
  author: PostAuthor;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  activity: string;
  tags: string[];
  hasLiked: boolean;
  reactions: PostReactions;
}
