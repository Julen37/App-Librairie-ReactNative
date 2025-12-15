import { View, Text, KeyboardAvoidingView, 
        ScrollView, Platform, TextInput, 
        TouchableOpacity,
        Image,
        Alert} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../constants/colors';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";

export default function Create() {

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const pickImage = async () => {
    try {
      // demander l'autorisation
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission refusée", "Nous avons besoin d'accéder à votre galerie pour changer l'image");
          return;
        }
      }

      // lancer la galerie
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3], //définit le rapport d'aspect de l'image (4:3)
        quality: 0.5, //définit la qualité de l'image (entre 0 et 5)
        base64: true, // renvoie l'image sous forme de chaine de caractere en base64
      });
      if (!result.canceled) {
        console.log("Résultat ici: ", result);
        setImage(result.assets[0].uri); //met a jour l'etat de l'image avec l'uri de l'image

        // Si l'image sélectionnée contient déjà une version encodée en base64,
        // on la récupère directement depuis result.assets[0].base64 et on la stocke dans l'état.
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          // Sinon, on lit le fichier image à partir de son URI
          // et on le convertit manuellement en base64 grâce à FileSystem,
          // puis on pourra utiliser cette chaîne base64 comme fallback.
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Erreur", "Il y a eu un problème pour sélectionner votre image");
    }
  };

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

          {/* image */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Image du livre</Text>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{uri: image}} style={styles.previewImage}/>
              ): (
                <View style={styles.placeholderContainer}>
                  <Ionicons
                  name="image-outline"
                  size={40}
                  color={COLORS.textSecondary}
                  />
                  <Text style={styles.placeholderText}>Toucher pour selectionner une image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* caption */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder='Ecrivez votre avis sur ce livre'
              placeholderTextColor={COLORS.placeholderText}
              value={caption}
              onChangeText={setCaption}
              multiline
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}