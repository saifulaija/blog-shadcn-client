'use server';

import { FieldValues } from 'react-hook-form';

export const registerSubscriber = async (data: FieldValues) => {
  const res = await fetch(
    ' http://localhost:5000/api/v1/user/create-subscriber',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    },
  );

  const subscriberInfo = await res.json();
  if (!res.ok) {
    throw new Error(subscriberInfo.message || 'An unexpected error occurred.');
  }

  return subscriberInfo;
};
