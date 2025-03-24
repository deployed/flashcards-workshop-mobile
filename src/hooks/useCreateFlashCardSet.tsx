import { useMutation } from '@tanstack/react-query';
import { createFlashCardSet } from '../api/challenges';
import { useRouter } from 'expo-router';

export function useCreateFlashCardSet() {
  const router = useRouter();
  console.log("useCreateFlashCardSet initialized");
  
  return useMutation({
    mutationFn: (title: string) => {
      console.log("Mutation function called with title:", title);
      return createFlashCardSet(title);
    },
    onSuccess: (data) => { 
      console.log("Mutation successful, received data:", data);
      router.push(`/create/${data.id}`);
    },
    onError: (error) => {
      console.error("Mutation failed with error:", error);
    }
  });
}
