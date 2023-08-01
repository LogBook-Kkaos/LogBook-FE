import { selector } from "recoil";
import { releaseNoteState } from "./atoms";

export const releaseContentCountSelector = selector<number>({
  key: "releaseContentCountSelector",
  get: ({ get }) => {
    const releaseNotes = get(releaseNoteState);
    const { releaseContent } = releaseNotes;

    return releaseContent.length;
  },
});

// categoriesCountSelector 수정
export const categoriesCountSelector = selector<{[category: string]: number}>({
  key: "categoriesCountSelector",
  get: ({ get }) => {
    const releaseNotes = get(releaseNoteState);
    const { releaseContent } = releaseNotes;

    const categoryCounts: {[category: string]: number} = {};
    releaseContent.forEach(({ category }) => {
      if (!categoryCounts[category]) {
        categoryCounts[category] = 1;
      } else {
        categoryCounts[category] += 1;
      }
    });

    return categoryCounts;
  },
});
