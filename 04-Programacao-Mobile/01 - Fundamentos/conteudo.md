


d\
d\
d\
d\
d\
d
> * **`<main>`** se torna **`<View>`**: o container base para layout com Flexbox.
> * **`<p>`**, **`<span>`**, **`<h1>`** até **`<h6>`** se tornam **`<Text>`**: tudo que for texto deve estar dentro dessa tag.
> * **`<img>`** se torna **`<Image>`**: para exibir imagens locais ou da rede.
> * **`<button>`** se torna **`<Button>`** ou **`<Pressable>`** (ou ainda **`<TouchableOpacity>`**): para capturar o toque do usuário.



```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Olá, React Native!</Text>
    </View>
  );
}

// A estilização não usa CSS puro, usa a API StyleSheet (JavaScript)
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Ocupa toda a tela
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',   // Centraliza no meio da tela (Flexbox)
  },
});
```

```js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Contador() {
  // Declaramos a variável 'count' e a função para atualizá-la
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cliques: {count}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Aperte Aqui!</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
```