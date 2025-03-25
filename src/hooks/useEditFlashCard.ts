import { useMutation } from '@tanstack/react-query';
import { FlashCardUpload, editFlashCard } from '../api/challenges';
import { queryClient } from '@/api/client';
import { useLocalSearchParams } from 'expo-router';

export const useEditFlashCard = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return useMutation({
    mutationFn: ({ id, question, answer , flashCardId}: FlashCardUpload) => editFlashCard({id, flashCardId, question, answer}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:  ['flash-card-set', id] });
    },
    onError: (error) => {
      console.error('Failed to edit flashcard:', error);
    }
  });
};
