
export interface Question {
  id: number;
  text: string;
  type: 'logic' | 'pattern' | 'math';
  options: string[];
  correctAnswer: number;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export interface IQResult {
  score: number;
  level: string;
  percentile: number;
}

export interface ReactionAttempt {
  id: number;
  time: number;
}
