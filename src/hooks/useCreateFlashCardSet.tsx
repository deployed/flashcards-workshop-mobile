import { useMutation } from '@tanstack/react-query';
import { createFlashCardSet } from '../api/challenges';
import { useRouter } from 'expo-router';

export function useCreateFlashCardSet() {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (title: string) => createFlashCardSet(title),
    onSuccess: (data) => { 
      router.push(`/create/${data.id}`);
    },
  });
}
