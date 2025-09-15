import type { CommentsHistory } from './OrderHistory';

export interface CommentsMutation {
    historyId: string;
    values: CommentsHistory;
}
