'use server';
import { FieldValues } from 'react-hook-form';
export const addTag = async (data: FieldValues) => {
  const res = await fetch('http://localhost:5000/api/v1/tag/create-tag', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const tagData = await res.json();
  if (!res.ok) {
    throw new Error(tagData.message || 'An unexpected error occurred.');
  }

  return tagData;
};
