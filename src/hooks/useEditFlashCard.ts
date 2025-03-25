import { useMutation } from '@tanstack/react-query';
import { FlashCardUpload, editFlashCard } from '../api/challenges';
import { queryClient } from '@/api/client';
import { useLocalSearchParams } from 'expo-router';

export const useEditFlashCard = () => {
  const { id: flashcardSet } = useLocalSearchParams<{ id: string }>(); 
  return useMutation({
    mutationFn: ({ question, answer, flashCardId }: FlashCardUpload) => 
      editFlashCard({ flashcardSet, flashCardId, question, answer }), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flash-card-set', flashcardSet] });
    },
    onError: (error) => {
      console.error('Failed to edit flashcard:', error);
    }
  });
};
