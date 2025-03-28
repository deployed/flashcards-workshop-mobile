import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

import { queryClient } from '@/api/client';
import { queryKeys } from '@/api/queryKyes';

import { markAsUnknown } from '../api/challenges';

export const useMarkAsUnknown = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return useMutation({
    mutationFn: ({ flashCardId, user }: { flashCardId: string; user: string }) =>
      markAsUnknown(id, flashCardId, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.setCounters(id) });
    },
    onError: (error) => {
      console.error('Failed to mark this flashcard:', error);
    },
  });
};
