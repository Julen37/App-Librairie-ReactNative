import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from "../../store/authStore";
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import styles from '../../assets/styles/profile.styles';
import LogoutButton from '../../components/LogoutButton';
import ProfileHeader from '../../components/ProfileHeader';

export default function Profile() {

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const {token} = useAuthStore();

  // recup les livres du user depuis l'api
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des livres');
      }

      setBooks(data);

    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les livres, Veuillez essayer de raffraichir');
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <LogoutButton/>
      
      <Text>onglet Profile</Text>
      
    </View>
  )
}