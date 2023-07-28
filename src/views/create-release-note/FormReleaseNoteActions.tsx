import { ReleaseNote } from 'src/views/create-release-note/ReleaseNote';

// 저장을 위한 액션 타입
export const SAVE_RELEASE_NOTE = 'SAVE_RELEASE_NOTE';
// 삭제를 위한 액션 타입
export const DELETE_RELEASE_NOTE = 'DELETE_RELEASE_NOTE';

// 액션 인터페이스
export interface SaveReleaseNoteAction {
  type: typeof SAVE_RELEASE_NOTE;
  payload: ReleaseNote;
}

export interface DeleteReleaseNoteAction {
  type: typeof DELETE_RELEASE_NOTE;
  payload: number; // 릴리스 노트 ID, 변환 시 필요한 경우 수정하세요.
}

export type ReleaseNoteActionTypes = SaveReleaseNoteAction | DeleteReleaseNoteAction;

// handleSave 함수
export const handleSave = (releaseNote: ReleaseNote) => {

  console.log(releaseNote);

  return {
    type: SAVE_RELEASE_NOTE,
    payload: releaseNote,
  };
};

// handleDelete 함수
export const handleDelete = (noteId: number) => {
  return {
    type: DELETE_RELEASE_NOTE,
    payload: noteId,
  };
};
