
export interface Question {
  id: string;
  text: string;
  type: 'logic' | 'pattern' | 'math';
  options: string[];
  correctAnswer: number;
  explanation: string;
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
