const STORAGE_KEY = 'application_form_data';

export interface FormData {
  step: number;
  data: Record<string, any>;
}

export const formStorage = {
  save: (data: FormData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  load: (): FormData | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
