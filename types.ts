export interface ActivityResult {
  title: string;
  message: string;
}

export enum AppStep {
  LOGIN = 'LOGIN',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
}

export interface UserState {
  isLoggedIn: boolean;
  teacherName: string;
  folderId?: string;
}

export interface ActivityData {
  childName: string;
  photoDataUrl: string | null;
  result: ActivityResult | null;
}