import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from "../../assets/styles/login.styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../../constants/colors";
import { useRouter } from 'expo-router';

export default function Signup() {

    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter(); 

    const handleSignup = () => {
        
    }

  return (
    <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View  style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>Librairie <Icon name='book' size={24} color="#2b543aff"/></Text>
                    <Text style={styles.subtitle}>Partage tes livres préférés</Text>
                </View>
            
                <View style={styles.container}>
{/* username */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nom d'utilisateur</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name='person-outline'
                                style={styles.inputIcon}
                                size={20}
                                color={COLORS.primary}
                                />
                            <TextInput
                                style={styles.input}
                                placeholder='Entrez votre nom'
                                placeholderTextColor={COLORS.placeholderText}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize='none'
                                />
                        </View>
                    </View>

{/* email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name='mail-outline'
                                style={styles.inputIcon}
                                size={20}
                                color={COLORS.primary}
                                />
                            <TextInput
                                style={styles.input}
                                placeholder='Entrez votre email'
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                />
                        </View>
                    </View>
{/* mdp */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name='lock-closed-outline'
                                style={styles.inputIcon}
                                size={20}
                                color={COLORS.primary}
                                />
                            <TextInput
                                style={styles.input}
                                placeholder='Entrez votre mot de passe'
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            {/* icon pour afficher le mdp */}
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={COLORS.primary}
                                    />
                            </TouchableOpacity>
                        </View>
                    </View>

{/* bouton */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup} 
                        disabled={isLoading}
                    >
                        {isLoading ?(<ActivityIndicator color='#fff'/>
                        ) : (
                            <Text style={styles.buttonText}>Inscrivez-vous</Text>
                        )}
                    </TouchableOpacity>
{/* footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Vous avez dèjà un compte ?</Text>
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Text style={styles.link}>Connexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView> 
  )
}