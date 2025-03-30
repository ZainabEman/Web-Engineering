import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  TextField,
  Autocomplete,
} from '@mui/material';

const commonSubjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Urdu',
  'Computer Science',
  'Economics',
  'History',
  'Geography',
  'Literature',
  'Statistics',
  'Accounting',
  'Business Studies',
  'Islamic Studies',
];

const SubjectsSelector = ({ selectedSubjects, onChange, isPreview }) => {
  const handleSubjectChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Subjects Taught
      </Typography>

      {isPreview ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedSubjects.map((subject) => (
            <Chip
              key={subject}
              label={subject}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      ) : (
        <Autocomplete
          multiple
          options={commonSubjects}
          value={selectedSubjects}
          onChange={handleSubjectChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Subjects"
              placeholder="Choose subjects you teach"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                color="primary"
                variant="outlined"
              />
            ))
          }
          renderOption={(props, option) => (
            <li {...props}>{option}</li>
          )}
        />
      )}
    </Paper>
  );
};

export default SubjectsSelector; 