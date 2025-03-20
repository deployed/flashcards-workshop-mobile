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
