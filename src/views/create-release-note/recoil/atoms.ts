import { atom } from "recoil";
import { ReleaseNote } from "src/views/create-release-note/ReleaseNote";

const today = new Date().toISOString().substring(0, 10);

export const releaseNoteState = atom<ReleaseNote>({
    key: 'releaseNoteState',
    default: {
        releaseNoteId: 0,
        releaseNoteTitle: '',
        creatorId: 0,
        version: '',
        creationDate: today,
        status: '',
        releaseContent: [],
        isImportant: false,
        isPublic: false,
    },
})