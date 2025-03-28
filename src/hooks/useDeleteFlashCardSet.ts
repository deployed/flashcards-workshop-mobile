import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { queryKeys } from '@/api/queryKyes';

import { deleteFlashCardSet } from '../api/challenges';

export const useDeleteFlashCardSet = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return useMutation({
    mutationFn: () => deleteFlashCardSet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sets() });
      queryClient.invalidateQueries({ queryKey: queryKeys.set(id) });
      router.back();
    },
  });
};
