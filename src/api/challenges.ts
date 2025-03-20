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
  
  
