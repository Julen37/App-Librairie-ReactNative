import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useAuthStore} from "../../store/authStore";
import styles from "../../assets/styles/home.styles"
import { API_URL } from '../../constants/api';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { formatPublishDate } from '../../lib/utils';
import Loader from '../../components/Loader';

// Fonction utilitaire pour créer une pause (attente) asynchrone
// ms : durée de la pause en millisecondes
// Retourne une promesse qui se résout après le délai spécifié
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {

  const {token} = useAuthStore();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (pageNum=1, refresh=false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum === 1){
        setLoading(true);
      };

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=2`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Echec du fetch des livres");
      };

      // setBooks(prevBooks => [...prevBooks, ...data.books]); // fait doublons dans la liste quand elle est mise

      const uniqueBooks = 
        refresh || pageNum === 1 
        ? data.books 
        : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
          [...books, ...data.books].find((book) => book._id === id)
      );
      
      setBooks(uniqueBooks);

      setHasMore(pageNum < data.totalPages);

      setPage(pageNum);
    } catch (error) {
      console.log("Erreur dans le fetch des livres", error);
    } finally {
      if (refresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await sleep (500); // pause de 1 seconde (pour 1000ms) pour eviter les appels trop rapides
      await fetchBooks(page + 1); // charge la page suivante
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{uri: item.user.profileImage}}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>Partagé le : {formatPublishDate(item.createdAt)}</Text>
      </View>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];

    for (let i = 1; i < 6; i++){
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#fab400" : COLORS.textSecondary}
          style={{ marginRight: 2}}
        />
      );
    }
    return stars;
  };

  // si les données sont en cours de chargement, on affiche un indicateur de chargement
  if (loading) {
    return (
      <Loader size='large'/>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bienvenue dans BookShare</Text>
            <Text style={styles.headerSubtitle}>Découvrez les derniers livres partagés par la communauté</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color={COLORS.primary}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name='book-outline'
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Aucun livre trouvé</Text>
            <Text style={styles.emptySubtext}>Partagez votre premier livre !</Text>
          </View>
        }
      />
    </View>
  )
}