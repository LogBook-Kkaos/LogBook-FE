export interface ReleaseNote {
  releaseNoteId: number;
  releaseNoteTitle: string;
  creatorId: number;
  version: string;
  creationDate: string;
  status: string;
  releaseContent: { content: string; category: string }[];
  isImportant: boolean;
  isPublic: boolean;
}
