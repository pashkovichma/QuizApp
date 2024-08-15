export interface Difficulties {
  easy: number,
  medium: number,
  hard: number
}

export interface Categories {
  capitals: number,
  rivers: number
}

export interface Types {
  multipleChoice: number,
  trueFalse: number
}

export interface Statistics {
  totalQuestions: number,
  totalCorrectAnswers: number,
  difficulties: Difficulties,
  categories: Categories,
  types: Types
}

export const initialStatistics: Statistics = {
  totalQuestions: 0,
  totalCorrectAnswers: 0,
  difficulties: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  categories: {
    capitals: 0,
    rivers: 0
  },
  types: {
    multipleChoice: 0,
    trueFalse: 0
  }
};

export interface StatisticsPayload {
  questions: number,
  correctAnswers: number,
  difficulty: keyof Difficulties,
  category: keyof Categories,
  type: keyof Types
}