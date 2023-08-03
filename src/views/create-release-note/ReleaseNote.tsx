export interface ReleaseNote {
  releaseNoteId: number;
  releaseNoteTitle: string;
  creatorId: number;
  version: string;
  creationDate: string;
  status: string;
  releaseContent: { releaseSummary: string; category: string, documentLink: string }[];
  isImportant: boolean;
  isPublic: boolean;
}
