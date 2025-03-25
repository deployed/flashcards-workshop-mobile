import { useMutation } from '@tanstack/react-query';
import {markAsUnknown} from '../api/challenges';

export const useMarkAsKnown = () => {
    return useMutation({
        mutationFn: ({ id, flashCardId, user }: { id: string; flashCardId: string; user: string }) => markAsUnknown(id, flashCardId, user),
        onError: (error) => {
          console.error('Failed to mark this flashcard:', error);
        }
    });
}