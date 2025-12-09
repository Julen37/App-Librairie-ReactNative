import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAuthStore, checkAuth } from "../store/authStore";
import { useEffect } from "react";


export default function Index() {
  const {user, token} = useAuthStore();

  console.log(user, token);

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>hello</Text>
      <Link href="./(auth)/">Login</Link>
      <Link href="./(auth)/signup">Signup</Link>
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