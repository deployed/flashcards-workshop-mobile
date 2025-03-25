import { useMutation } from '@tanstack/react-query';
import { createFlashCardSet } from '../api/challenges';
import { useRouter } from 'expo-router';
import { queryClient } from '@/api/client';

export function useCreateFlashCardSet() {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (title: string) => {
      return createFlashCardSet(title);
    },
    onSuccess: (data) => { 
      queryClient.invalidateQueries({ queryKey: ['flash-card-sets'] });
      router.navigate(`/create/${data.id}`);
    },
    onError: (error) => {
      console.error("Mutation failed with error:", error);
    }
  });
}
