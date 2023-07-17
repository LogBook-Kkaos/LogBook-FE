import { selector } from "recoil";
import { releaseNoteState } from "./atoms";

export const releaseContentCountSelector = selector<number>({
  key: "releaseContentCountSelector",
  get: ({ get }) => {
    const releaseNotes = get(releaseNoteState);
    const { release_content } = releaseNotes;

    return release_content.length;
  },
});

// categoriesCountSelector 수정
export const categoriesCountSelector = selector<{[category: string]: number}>({
  key: "categoriesCountSelector",
  get: ({ get }) => {
    const releaseNotes = get(releaseNoteState);
    const { release_content } = releaseNotes;

    const categoryCounts: {[category: string]: number} = {};
    release_content.forEach(({ category }) => {
      if (!categoryCounts[category]) {
        categoryCounts[category] = 1;
      } else {
        categoryCounts[category] += 1;
      }
    });

    return categoryCounts;
  },
});
