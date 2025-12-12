import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";


export default function Index() {
  const {user, token, checkAuth, logout} = useAuthStore();

  console.log(user, token);

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bonjour {user?.username}</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>

      <Link href="./(auth)/">Connexion</Link>
      <Link href="./(auth)/signup">S'inscrire</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title : {
    color: "blue",
  }
})