'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="eb4cb834fa28a99887077808156a73e42d3f259a"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};