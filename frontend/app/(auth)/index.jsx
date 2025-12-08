import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import styles from "../../assets/styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Link } from 'expo-router';


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        
    }

  return (
    <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    > {/* eviter que le clavier cache le contenu de la page sur les mobiles */}
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../../assets/images/Bibliophile-bro.png")}
                    style={styles.illustrationImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.card}>
                <View style={styles.formContainer}>
                    {/* input email */}
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
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>
                    </View>
                    {/* input mot de passe */}
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
                                secureTextEntry={!showPassword} // pour ne pas afficher le mdp
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
                    {/* bouton login */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin} disabled={isLoading}
                    >
                        {isLoading ?(<ActivityIndicator color='#fff'/>
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>
                    {/* footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Vous n'avez pas de compte ?</Text>
                        <Link href="/signup" asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>S'inscrire</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
  )
}