import { axios } from './axios';

type FlashCardSet = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
};


type FlashCard = {
  id: number;
  answer: string;
  question: string;
  flashcard_set: string;
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
  console.log(response);
  return response.data;
};

export const createFlashCard = async (id: string, question: string, answer: string): Promise<FlashCard> => {
  const response = await axios.post<FlashCard>(`flash-card-sets/${id}/flash-cards/`, {question , answer, flashcard_set: id});
  console.log(response.data);
  return response.data;
};


export const editFlashCard = async (id: string, flashCardId: number,  question: string, answer: string): Promise<any> => {
  const response = await axios.put<any>(`flash-card-sets/${id}/flash-cards/${flashCardId}/`, {question , answer, flashcard_set: id});
  console.log(response.data);
  return response.data;
};

export const fetchFlashCards = async (id: string): Promise<FlashCard[]> => {
  const response = await axios.get<FlashCard[]>(`flash-card-sets/${id}/flash-cards/`);
  return response.data;
};


