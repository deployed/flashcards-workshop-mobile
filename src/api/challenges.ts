import { axios } from './axios';

type FlashCardSet = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
};

export const fetchFlashCardSets = async (): Promise<FlashCardSet[]> => {
  const flashCardSets = await axios.get<FlashCardSet[]>('flash-card-sets/');
  return flashCardSets.data;
};

export const deleteFlashCardSet = async (id: string): Promise<FlashCardSet[]> => {
    const flashCardSets = await axios.delete<FlashCardSet[]>(`flash-card-sets/${id}/`);
    return flashCardSets.data;
};

export const fetchFlashCardSet = async (id: string): Promise<FlashCardSet> => {
    const flashCardSets = await axios.get<FlashCardSet>(`flash-card-sets/${id}/`);
    return flashCardSets.data;
};
  
  
export const createFlashCardSet = async (title: string): Promise<FlashCardSet> => {
  const response = await axios.post<FlashCardSet>(`flash-card-sets/`, { title, description: title, is_Active: true });
  return response.data;
};


export const createFlashCard = async (id: string, question: string, answer: string): Promise<FlashCardSet> => {
  const response = await axios.post<FlashCardSet>(`flash-card-sets/${id}/flash-cards/`, {question , answer, flashcard_set: id});
  return response.data;
};
