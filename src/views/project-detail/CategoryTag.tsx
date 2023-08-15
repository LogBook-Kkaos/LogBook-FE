import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Category = {
  General: "General",
  Feature: "Feature",
  Changed: "Changed",
  Deprecated: "Deprecated",
  Fixed: "Fixed",
} as const;
export type CategoryType = typeof Category[keyof typeof Category];

const categoryColors: Record<CategoryType, string> = {
  [Category.General]: "#CECECE",
  [Category.Feature]: "#C7E3FE",
  [Category.Changed]: "#FFF8B6",
  [Category.Deprecated]: "#FFC7C7",
  [Category.Fixed]: "#BBFFF3",
};

const categoryTextColors: Record<CategoryType, string> = {
  [Category.General]: "#797979",
  [Category.Feature]: "#41A3FF",
  [Category.Changed]: "#ECD200",
  [Category.Deprecated]: "#FF5454",
  [Category.Fixed]: "#05D7B1",
};

interface CategoryTagProps {
  category: CategoryType | string;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
  const defaultBackgroundColor = categoryColors[Category.Feature];
  const defaultTextColor = categoryTextColors[Category.Feature];

  return (
    <Box
      sx={{
        borderRadius: 1,
        paddingTop: 0.1,
        paddingBottom: 0.1,
        paddingLeft: 1,
        paddingRight: 1,
        background: categoryColors[category as CategoryType] || defaultBackgroundColor,
        display: "inline-block",
        marginRight: 1,
      }}
    >
      <Typography
        variant="caption"
        component="span"
        sx={{
          color: categoryTextColors[category as CategoryType] || defaultTextColor,
        }}
      >
        <b>{category}</b>
      </Typography>
    </Box>
  );
};

export default CategoryTag;
