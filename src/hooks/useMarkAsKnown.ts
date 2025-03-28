import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

import { markAsKnown } from '../api/challenges';

export const useMarkAsKnown = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return useMutation({
    mutationFn: ({ flashCardId, user }: { flashCardId: string; user: string }) =>
      markAsKnown(id, flashCardId, user),
    onError: (error) => {
      console.error('Failed to mark this flashcard:', error);
    },
  });
};
