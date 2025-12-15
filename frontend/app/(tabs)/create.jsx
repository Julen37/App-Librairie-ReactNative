import { View, Text, KeyboardAvoidingView, 
        ScrollView, Platform, TextInput, 
        TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors';

export default function Create() {

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {
    
  }
  const handleSubmit = async () => {

  }

  /*Cette fonction crée un composant de sélection de notation avec 5 étoiles.
  L'utilisateur peut sélectionner une note en cliquant sur une étoile.*/
  const renderRatingPicker = () => {
    const stars= [];
    
    for (let i = 1; i <= 5; i++) {
      // ajout d'une etoile au tableau
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#fab400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* header */}
          <View>
            <Text style={styles.title}>Ajouter une recommandation</Text>
            <Text style={styles.subtitle}>Partager vos favoris avec la communauté</Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* titre du livre */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Titre du livre</Text>
            <View style={styles.inputContainer}>
              <Ionicons
              name="book-outline"
              size={20}
              color={COLORS.textSecondary}
              style={styles.inputIcon}
              />
              <TextInput
              style={styles.input}
              placeholder='Entrer le titre du livre'
              placeholderTextColor={COLORS.placeholderText}
              value={title}
              onChangeText={setTitle}
              />
            </View>
          </View>

          {/* notation */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Votre note</Text>
            {renderRatingPicker()}
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}