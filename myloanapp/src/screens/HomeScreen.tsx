import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, FAB, Badge } from 'react-native-paper';
import { db, auth } from '../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import { syncLoansWithFirestore, getCachedLoans } from '../services/offlineLoans';
import { mockLoans } from '../services/mockLoans';

interface Loan {
  id: string;
  amount: number;
  status: string;
  [key: string]: any;
}

const HomeScreen = ({ navigation }: any) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const fetchLoans = useCallback(() => {
    if (!auth.currentUser) return;
    setRefreshing(true);
    const q = query(collection(db, 'loans'), where('userId', '==', auth.currentUser.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setLoans(snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          amount: data.amount ?? 0,
          status: data.status ?? '',
          ...data,
        };
      }));
      setRefreshing(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const showOfflineLoans = async () => {
      if (isOffline) {
        const cachedLoans = await getCachedLoans();
        setLoans([...cachedLoans, ...mockLoans]);
        return;
      }
      const unsub = fetchLoans();
      return () => unsub && unsub();
    };
    showOfflineLoans();
  }, [fetchLoans, isOffline]);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    if (!isOffline) {
      syncLoansWithFirestore();
    }
  }, [isOffline]);

  const onRefresh = () => {
    fetchLoans();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#2E7D32';
      case 'pending': return '#FFB300';
      case 'rejected': return '#D32F2F';
      case 'flagged': return '#F57C00';
      default: return '#757575';
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>My Loans</Text>
      <Text style={{color: 'red', textAlign: 'center'}}>{isOffline ? 'You are offline. Some features may be unavailable.' : ''}</Text>
      <FlatList
        data={loans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ flex: 1 }}>
              {item.amount} - {item.status}
              {item.offline && (
                <Text style={{ color: '#FFB300', fontWeight: 'bold' }}> (Offline)</Text>
              )}
              {item.id && item.id.startsWith('mock-') && !item.offline && (
                <Text style={{ color: '#90A4AE', fontStyle: 'italic' }}> (Sample)</Text>
              )}
            </Text>
            <Badge style={{ backgroundColor: getStatusColor(item.status) }}>{item.status}</Badge>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text>No loans found.</Text>}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('ApplyLoan')}
        label="Apply for Loan"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default HomeScreen;
