import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const LOANS_CACHE_KEY = 'LOANS_CACHE';

export async function cacheLoans(loans: any[]) {
  await AsyncStorage.setItem(LOANS_CACHE_KEY, JSON.stringify(loans));
}

export async function getCachedLoans() {
  const data = await AsyncStorage.getItem(LOANS_CACHE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function addLoanOffline(loan: any) {
  const cached = await getCachedLoans();
  cached.push({ ...loan, status: 'pending', createdAt: new Date().toISOString(), offline: true });
  await cacheLoans(cached);
}

export async function syncLoansWithFirestore() {
  const cached = await getCachedLoans();
  const unsynced = cached.filter((l: any) => l.offline);
  for (const loan of unsynced) {
    await addDoc(collection(db, 'loans'), {
      ...loan,
      userId: auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    });
    loan.offline = false;
  }
  await cacheLoans(cached);
}
