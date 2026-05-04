export interface QuizLevel {
  id: string;
  name: string;
  description: string;
  parts: QuizPart[];
}

export interface QuizPart {
  id: number;
  name: string;
  levelId: string;
  description?: string;
  duration?: number
  questionCount?: number
}

export interface School {
  id: string;
  name: string;
  location: string;
}

export interface PasswordRecord {
  id: string;
  text: string;
  expiresAt: string;
  schoolId: string;
  partId: string;
  levelId: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  time: number;
  school: string;
  class: string;
  rank: number;
  avatar?: string;
}
