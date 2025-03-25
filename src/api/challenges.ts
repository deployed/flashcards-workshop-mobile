import { axios } from './axios';

type FlashCardSet = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
};

export type FlashCardUpload = {
  id: string;
  answer: string;
  question: string;
  flashCardId?: string;
};


type FlashCardResponse = {
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

  return response.data;
};

export const createFlashCard = async (id: string, question: string, answer: string): Promise<FlashCardResponse> => {
  const response = await axios.post<FlashCardResponse>(`flash-card-sets/${id}/flash-cards/`, {question , answer, flashcard_set: id});
  return response.data;
};


export const editFlashCard = async ({id, flashCardId,  question, answer}: FlashCardUpload): Promise<FlashCardResponse> => {
  const response = await axios.put<FlashCardResponse>(`flash-card-sets/${id}/flash-cards/${flashCardId}/`, {question , answer, flashcard_set: id});
  return response.data;
};

export const fetchFlashCards = async (id: string): Promise<FlashCardResponse[]> => {
  const response = await axios.get<FlashCardResponse[]>(`flash-card-sets/${id}/flash-cards/`);
  return response.data;
};


export const markAsKnown = async (id: string, flashcardId: string, user: string): Promise<void> => {
   await axios.post(`flash-card-sets/${id}/flash-cards/${flashcardId}/mark-as-known/`, {user});
}

export const markAsUnknown = async (id: string, flashcardId: string, user: string): Promise<void> => {
  await axios.post(`flash-card-sets/${id}/flash-cards/${flashcardId}/mark-as-unknown/`, {user});
}