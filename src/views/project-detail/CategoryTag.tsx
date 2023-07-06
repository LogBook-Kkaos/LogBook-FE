// ** MUI Imports
import React from "react"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Category = {
    Feature: 'Feature',
    Changed: 'Changed',
    Deprecated: 'Deprecated',
    Fixed: 'Fixed'
  } as const;
  export type Category = typeof Category[keyof typeof Category]
  
  const categoryColors = {
    [Category.Feature]: '#C7E3FE',
    [Category.Changed]: '#FFF8B6',
    [Category.Deprecated]: '#FFC7C7',
    [Category.Fixed]: '#BBFFF3',
  }
  
  const categoryTextColors = {
    [Category.Feature]: '#41A3FF',
    [Category.Changed]: '#ECD200',
    [Category.Deprecated]: '#FF5454',
    [Category.Fixed]: '#05D7B1',
  }
  
  interface CategoryTagProps {
    category: Category;
  }

  const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
    return (
      <Box
        sx={{
          borderRadius: 1,
          paddingTop: 0.1,
          paddingBottom: 0.1,
          paddingLeft: 1,
          paddingRight: 1,
          background: categoryColors[category],
          display: "inline-block",
          marginRight: 1,
        }}
      >
        <Typography
          variant="caption"
          component="span"
          sx={{ color: categoryTextColors[category] }}
        >
          <b>{category}</b>
        </Typography>
      </Box>
    );
  };
  
  export default CategoryTag;