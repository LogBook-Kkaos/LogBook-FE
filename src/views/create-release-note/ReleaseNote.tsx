export interface ReleaseNote {
  release_note_id: number;
  title: string;
  creator_id: number;
  version: string;
  creation_date: string;
  status: string;
  release_content: { content: string; category: string }[]; // 수정된 부분
  is_important: boolean;
  is_public: boolean;
}
