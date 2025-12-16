import { View, Text, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from "../../store/authStore";
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import styles from '../../assets/styles/profile.styles';
import LogoutButton from '../../components/LogoutButton';
import ProfileHeader from '../../components/ProfileHeader';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { Image } from 'expo-image';

export default function Profile() {

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

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

  const handleDeleteBook = async (bookId) => {
    try {
      setDeleteBookId(bookId);

      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response); // c'est là où apres ca fonctionne plus, erreur 404 [SyntaxError: JSON Parse error: Unexpected character: <]

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la suppression de la recommandation de livre");
      };
      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert("Succès", "La recommandation du livre a été supprimé avec succès");
    } catch (error) {
      console.log(error)
      Alert.alert("Erreur", error.message || "Impossible de supprimer la recommandation");
    } finally {
      setDeleteBookId(null);
    }
  };
  
  const confirmDelete = (bookId) => {
    Alert.alert(
      "Supprimer le livre",
      "Etes-vous sûr de vouloir supprimer cette recommandation de livre ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer", 
          style: "destructive",
          onPress: () => handleDeleteBook(bookId)
        },
      ]
    );
  };

  const renderBookItem = ({item}) => (
    <View style={styles.bookItem}>
      <Image
        source={item.image}
        style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.bookDate}>Partagé le : {new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item._id)}
      >
        {deleteBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary}/>
        ): (
          <Ionicons
            name='trash-outline'
            size={20}
            color={COLORS.primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i < 6; i++){
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
          color={i <= rating ? "#fab400" : COLORS.textSecondary}
          style={{ marginRight: 2}}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <LogoutButton/>
      
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Vos recommandations</Text>
        <Text style={styles.booksCount}>{books.length} Livres</Text>
      </View>
      
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.booksList}
        showsVerticalScrollIndicator={false}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name='book-outline'
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Aucune recommandation trouvée</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Text style={styles.addButtonText}>Ajouter un livre</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}