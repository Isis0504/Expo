import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function App() {
  const [score, setScore] = useState(0);
  const [size, setSize] = useState(80);
  const [time, setTime] = useState(2000);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const randomPosition = () => {
    return {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    };
  };

  const handleHit = () => {
    setScore((prevScore) => prevScore + 1);
    setSize((prevSize) => Math.max(prevSize * 0.9, 20));
    setTime((prevTime) => Math.max(prevTime * 0.9, 500));
    setPosition(randomPosition());
  };

  const handleMiss = async () => {
    if (score > 0) {
      try {
        await addDoc(collection(db, "scores"), {
          score: score,
          timestamp: serverTimestamp(),
        });
        console.log("Puntaje guardado:", score);
      } catch (error) {
        console.error("Error al guardar el puntaje:", error);
      }
    }

    Alert.alert("Game Over", `Puntaje final: ${score}`, [{ text: "OK", onPress: resetGame }]);
  };

  const resetGame = () => {
    setScore(0);
    setSize(80);
    setTime(2000);
    setPosition(randomPosition());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMiss();
    }, time);
    return () => clearTimeout(timer);
  }, [position, time]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity
        style={[styles.target, { width: size, height: size, top: position.top, left: position.left }]}
        onPress={handleHit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  score: {
    position: "absolute",
    top: 20,
    fontSize: 24,
    color: "white",
  },
  target: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 50,
  },
});
