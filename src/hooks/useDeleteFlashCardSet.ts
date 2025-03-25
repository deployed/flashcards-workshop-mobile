import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { deleteFlashCardSet } from '../api/challenges';

export const useDeleteFlashCardSet = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return useMutation({
    mutationFn: () => deleteFlashCardSet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flash-card-sets'] });
      queryClient.invalidateQueries({ queryKey: ['flash-card-set', id] });
      router.back();
    },
  });
};