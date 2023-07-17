import { atom } from "recoil";
import { ReleaseNote } from "src/views/create-release-note/ReleaseNote";

const today = new Date().toISOString().substring(0, 10);

export const releaseNoteState = atom<ReleaseNote>({
    key: 'releaseNoteState',
    default: {
        release_note_id: 0,
        title: '',
        creator_id: 0,
        version: '',
        creation_date: today,
        status: '',
        release_content: [],
        is_important: false,
        is_public: false,
    },
})