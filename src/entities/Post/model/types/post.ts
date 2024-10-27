export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostPageSchema {
  isLoading?: boolean;
  error?: string;
  post?: Post;
}
