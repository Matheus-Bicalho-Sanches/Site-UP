'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '@/config/firebase';

interface ClientData {
  id: string;
  name: string;
  email: string;
  investedAmount?: number;
}

interface AllocationData {
  date: string;
  totalValue: number;
  assets: {
    type: string;
    investments: {
      name: string;
      value: number;
    }[];
  }[];
}

export default function ClientPortalContent() {
  const { user } = useAuth();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [latestAllocation, setLatestAllocation] = useState<AllocationData | null>(null);
  const [loading, setLoading] = useState(true);

  // ... resto do código do componente atual ...
  // (manter todo o useEffect e o JSX de renderização)
} 