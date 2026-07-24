# 📚 Apostila de Apoio — Calculadora em React Native

> Material de apoio complementar ao Plano de Trabalho.
> Cada estrutura é explicada com: **O que é** • **Para que serve** • **Como funciona** • **Exemplo** • **Uso na calculadora**.

---

## 🧩 Estrutura da Linguagem

### 📦 `import`

- **O que é:** um comando que traz código de outros arquivos ou bibliotecas para dentro do arquivo atual.
- **Para que serve:** evita que a gente reescreva código já pronto — reaproveitamos o que outras bibliotecas oferecem.
- **Como funciona:** você escreve o nome do que quer importar e de onde vem.
- **Exemplo:**
  ```javascript
  import { useState } from 'react';
  ```
- **Uso na calculadora:** usamos `import` para trazer `View`, `Text`, `TouchableOpacity`, `useState` e o `SafeAreaView`.

---

### 📤 `export default`

- **O que é:** um comando que disponibiliza algo (geralmente um componente) para ser usado em outros arquivos.
- **Para que serve:** permite que o arquivo principal do app (como o `App.tsx`) seja "encontrado" e executado pelo Expo.
- **Como funciona:** é colocado antes da declaração do componente principal do arquivo.
- **Exemplo:**
  ```javascript
  export default function App() { ... }
  ```
- **Uso na calculadora:** o componente `App`, que contém toda a calculadora, é exportado como padrão para o Expo conseguir iniciá-lo.

---

### ⚙️ `function`

- **O que é:** uma forma de agrupar um bloco de código que executa uma tarefa específica.
- **Para que serve:** organiza o código em partes menores e reutilizáveis.
- **Como funciona:** você declara um nome, pode receber parâmetros, e escreve o que ela deve fazer.
- **Exemplo:**
  ```javascript
  function somar(a, b) {
    return a + b;
  }
  ```
- **Uso na calculadora:** cada ação (somar, limpar, calcular) é uma `function`, como `handleNumber` e `handleEqual`.

---

## 🖼️ Componentes React Native

### 🧱 Componentes React Native (visão geral)

- **O que é:** blocos prontos de interface que o React Native transforma em elementos visuais reais no iOS e Android.
- **Para que serve:** construir a interface sem precisar escrever HTML (que não existe em apps nativos).
- **Como funciona:** cada componente é uma tag, como `<View>` ou `<Text>`, que representa um elemento na tela.
- **Exemplo:**
  ```jsx
  <View>
    <Text>Olá!</Text>
  </View>
  ```
- **Uso na calculadora:** toda a interface (visor, botões, teclado) é construída combinando esses componentes.

---

### 📐 `View`

- **O que é:** o componente básico de estrutura, como uma "caixa" invisível.
- **Para que serve:** agrupar e organizar outros componentes (botões, textos) na tela.
- **Como funciona:** funciona como um contêiner que pode ser estilizado com `flexDirection`, `flex`, etc.
- **Exemplo:**
  ```jsx
  <View style={{ flexDirection: 'row' }}>
    <Text>1</Text>
    <Text>2</Text>
  </View>
  ```
- **Uso na calculadora:** usada para agrupar cada linha de botões do teclado (ex: a linha "7, 8, 9, ÷").

---

### 🔤 `Text`

- **O que é:** o único componente capaz de exibir letras e números na tela.
- **Para que serve:** mostrar qualquer conteúdo textual, como o número do visor ou o símbolo dos botões.
- **Como funciona:** todo texto precisa estar dentro de uma tag `<Text>` — nunca solto diretamente numa `View`.
- **Exemplo:**
  ```jsx
  <Text>7</Text>
  ```
- **Uso na calculadora:** exibe o valor do `display` e o símbolo de cada botão (números e operadores).

---

### 👆 `TouchableOpacity`

- **O que é:** o componente de botão do React Native.
- **Para que serve:** capturar o toque do usuário e dar uma resposta visual (diminuindo a opacidade).
- **Como funciona:** envolve o conteúdo do botão (geralmente um `Text`) e recebe uma função no `onPress`.
- **Exemplo:**
  ```jsx
  <TouchableOpacity onPress={() => console.log('toquei!')}>
    <Text>7</Text>
  </TouchableOpacity>
  ```
- **Uso na calculadora:** é usado em **todos** os botões — números, operadores e funções especiais.

---

### 🛡️ `SafeAreaView` (react-native-safe-area-context)

- **O que é:** um componente que garante que o conteúdo do app não fique escondido atrás de áreas do sistema (notch, câmera, barra de status, barra de gestos).
- **Para que serve:** manter a interface visível e organizada em qualquer aparelho, especialmente os com tela recortada.
- **Como funciona:** envolve toda a tela do app, ajustando margens automaticamente conforme o dispositivo.
- **Exemplo:**
  ```jsx
  import { SafeAreaView } from 'react-native-safe-area-context';

  <SafeAreaView style={{ flex: 1 }}>
    {/* conteúdo do app */}
  </SafeAreaView>
  ```
- **Uso na calculadora:** envolve toda a estrutura da calculadora, garantindo que o visor e o teclado fiquem visíveis em qualquer celular.

---

## 🧠 Estado (Memória da Calculadora)

### 🔄 `useState`

- **O que é:** uma função do React que cria uma "variável viva", capaz de atualizar a tela automaticamente quando muda.
- **Para que serve:** guardar dados que mudam com o tempo, como o número no visor.
- **Como funciona:** retorna dois itens — o valor atual e uma função para alterá-lo.
- **Exemplo:**
  ```javascript
  const [contador, setContador] = useState(0);
  ```
- **Uso na calculadora:** usado para criar `display`, `previousValue` e `operator`.

---

### 🖥️ `display`

- **O que é:** a variável de estado que guarda o texto mostrado no visor da calculadora.
- **Para que serve:** representar visualmente o número que o usuário está digitando ou o resultado calculado.
- **Como funciona:** começa com o valor `'0'` e é atualizado pela função `setDisplay`.
- **Exemplo:** `display` pode valer `'0'`, `'75'` ou `'120.5'`.
- **Uso na calculadora:** é o valor exibido no `<Text>` do visor.

---

### 🔙 `previousValue`

- **O que é:** a variável de estado que guarda o número anterior, antes de uma operação ser aplicada.
- **Para que serve:** permitir que a calculadora "lembre" do primeiro número enquanto o usuário digita o segundo.
- **Como funciona:** é preenchida dentro de `handleOperator`, com o valor do `display` no momento do clique.
- **Exemplo:** se o usuário digita `5` e clica em `+`, `previousValue` vira `'5'`.
- **Uso na calculadora:** é usada em `handleEqual` para realizar o cálculo final.

---

### ➗ `operator`

- **O que é:** a variável de estado que guarda qual operação matemática foi escolhida.
- **Para que serve:** informar à calculadora qual conta deve ser feita quando o botão "=" for pressionado.
- **Como funciona:** recebe o símbolo (`'+'`, `'-'`, `'×'`, `'÷'`) dentro de `handleOperator`.
- **Exemplo:** `operator` pode valer `'+'` após o usuário clicar no botão de soma.
- **Uso na calculadora:** é verificada dentro de `handleEqual` para decidir qual cálculo executar.

---

## 🎯 Eventos e Funções

### 👉 `onPress`

- **O que é:** a propriedade que define o que acontece quando o usuário toca em um componente.
- **Para que serve:** conectar o toque físico do usuário a uma função do código.
- **Como funciona:** recebe uma função (geralmente uma arrow function) que será executada no toque.
- **Exemplo:**
  ```jsx
  <TouchableOpacity onPress={() => handleNumber('7')}>
    <Text>7</Text>
  </TouchableOpacity>
  ```
- **Uso na calculadora:** todos os botões usam `onPress` para chamar a função correspondente.

---

### 🔢 `handleNumber()`

- **O que é:** a função responsável por adicionar um número digitado ao visor.
- **Para que serve:** construir o número que o usuário está digitando, dígito por dígito.
- **Como funciona:** usa um operador ternário para decidir entre substituir o `'0'` inicial ou concatenar o novo número.
- **Exemplo:**
  ```javascript
  const handleNumber = (number: string) => {
    setDisplay(display === '0' ? number : display + number);
  };
  ```
- **Uso na calculadora:** chamada por todos os botões numéricos (0 a 9).

---

### ➕ `handleOperator()`

- **O que é:** a função que registra qual operação matemática foi escolhida.
- **Para que serve:** "congelar" o número atual e preparar o visor para o próximo número.
- **Como funciona:** salva o `operator` escolhido, move o `display` atual para `previousValue`, e zera o `display`.
- **Exemplo:**
  ```javascript
  const handleOperator = (op: string) => {
    setOperator(op);
    setPreviousValue(display);
    setDisplay('0');
  };
  ```
- **Uso na calculadora:** chamada pelos botões `+`, `-`, `×` e `÷`.

---

### 🟰 `handleEqual()`

- **O que é:** a função que executa o cálculo final e mostra o resultado.
- **Para que serve:** transformar os valores guardados (`previousValue`, `display`, `operator`) em um resultado numérico.
- **Como funciona:** converte os textos em números com `parseFloat`, valida se há dados suficientes, calcula o resultado e o converte de volta para texto com `String`.
- **Exemplo:**
  ```javascript
  const handleEqual = () => {
    const current = parseFloat(display);
    const previous = parseFloat(previousValue ?? '0');
    if (!previousValue || !operator) return;

    let result = 0;
    if (operator === '+') result = previous + current;

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
  };
  ```
- **Uso na calculadora:** chamada pelo botão `=`.

---

### 🧹 `handleClear()`

- **O que é:** a função responsável por resetar a calculadora ao estado inicial.
- **Para que serve:** permitir que o usuário comece uma nova conta do zero.
- **Como funciona:** redefine `display` para `'0'`, e `previousValue`/`operator` para `null`.
- **Exemplo:**
  ```javascript
  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
  };
  ```
- **Uso na calculadora:** chamada pelo botão `C`.

---

### 💯 `handlePercent()`

- **O que é:** a função que converte o número do visor em porcentagem.
- **Para que serve:** permitir cálculos rápidos de porcentagem, como em calculadoras reais.
- **Como funciona:** divide o valor atual do `display` por 100.
- **Exemplo:**
  ```javascript
  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
  };
  ```
- **Uso na calculadora:** chamada pelo botão `%`.

---

### 🔟 `handleDecimal()`

- **O que é:** a função que adiciona um ponto decimal ao número do visor.
- **Para que serve:** permitir a digitação de números não-inteiros (ex: `3.5`).
- **Como funciona:** verifica se o `display` já contém um ponto; se não contiver, adiciona um.
- **Exemplo:**
  ```javascript
  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };
  ```
- **Uso na calculadora:** chamada pelo botão `.`.

---

### ➖ `handleInvertSignal()`

- **O que é:** a função que troca o sinal do número no visor (positivo ↔ negativo).
- **Para que serve:** permitir a inserção de números negativos.
- **Como funciona:** multiplica o valor atual do `display` por `-1`.
- **Exemplo:**
  ```javascript
  const handleInvertSignal = () => {
    const current = parseFloat(display);
    setDisplay(String(current * -1));
  };
  ```
- **Uso na calculadora:** chamada pelo botão `+/-`.

---

## 🔢 Conversões de Tipo

### 🔁 `parseFloat()`

- **O que é:** uma função do JavaScript que converte texto em número decimal.
- **Para que serve:** permitir que operações matemáticas reais sejam feitas (sem isso, o JavaScript concatenaria textos ao invés de somar).
- **Como funciona:** recebe uma string e retorna um número.
- **Exemplo:**
  ```javascript
  parseFloat('7.5'); // resulta em 7.5 (número)
  ```
- **Uso na calculadora:** usada em `handleEqual`, `handlePercent` e `handleInvertSignal` para transformar o texto do `display` em número antes de calcular.

---

### 🔡 `String()`

- **O que é:** uma função do JavaScript que converte um número em texto.
- **Para que serve:** permitir que o resultado do cálculo seja exibido no `<Text>`, que trabalha com strings.
- **Como funciona:** recebe um número e retorna sua versão em texto.
- **Exemplo:**
  ```javascript
  String(120.5); // resulta em '120.5' (texto)
  ```
- **Uso na calculadora:** usada em `handleEqual`, `handlePercent` e `handleInvertSignal` para atualizar o `display` com `setDisplay`.

---

## 🎨 Estilização

### 🖌️ `StyleSheet`

- **O que é:** a API do React Native usada para criar estilos.
- **Para que serve:** organizar e otimizar os estilos visuais dos componentes, de forma parecida com o CSS.
- **Como funciona:** usa a função `StyleSheet.create()` com propriedades escritas em CamelCase (ex: `backgroundColor` ao invés de `background-color`).
- **Exemplo:**
  ```javascript
  const styles = StyleSheet.create({
    botao: { backgroundColor: '#333' }
  });
  ```
- **Uso na calculadora:** usada para estilizar o visor, as linhas de botões e cada botão individual.

---

### 📏 `flex`

- **O que é:** uma propriedade que define quanto espaço um elemento deve ocupar em relação aos demais.
- **Para que serve:** dividir o espaço da tela de forma proporcional entre os elementos.
- **Como funciona:** se vários elementos usam `flex: 1` na mesma linha, cada um recebe uma parte igual do espaço total.
- **Exemplo:** 4 botões com `flex: 1` numa linha dividem o espaço em 4 partes iguais (25% cada).
- **Uso na calculadora:** garante que os botões de cada linha do teclado tenham o mesmo tamanho.

---

### ↔️ `flexDirection`

- **O que é:** a propriedade que define a direção em que os elementos filhos são organizados.
- **Para que serve:** decidir se os componentes ficam em coluna (padrão) ou em linha.
- **Como funciona:** o valor `'row'` organiza os elementos lado a lado, horizontalmente.
- **Exemplo:**
  ```javascript
  { flexDirection: 'row' }
  ```
- **Uso na calculadora:** aplicada em cada linha do teclado, para que os botões fiquem enfileirados horizontalmente.

---

### 🎯 `justifyContent`

- **O que é:** a propriedade que alinha o conteúdo ao longo do eixo principal do `flexDirection`.
- **Para que serve:** centralizar (ou distribuir) o conteúdo dentro de um componente.
- **Como funciona:** o valor `'center'` centraliza o conteúdo verticalmente (quando o eixo principal é linha).
- **Exemplo:**
  ```javascript
  { justifyContent: 'center' }
  ```
- **Uso na calculadora:** usada nos botões para centralizar o número/símbolo dentro do círculo.

---

### 🎯 `alignItems`

- **O que é:** a propriedade que alinha o conteúdo ao longo do eixo transversal (perpendicular ao `flexDirection`).
- **Para que serve:** centralizar o conteúdo horizontalmente dentro de um componente.
- **Como funciona:** o valor `'center'`, combinado com `justifyContent: 'center'`, centraliza totalmente o texto do botão.
- **Exemplo:**
  ```javascript
  { alignItems: 'center' }
  ```
- **Uso na calculadora:** garante que o número/símbolo fique exatamente no meio de cada botão circular.

---

### ⭕ `borderRadius`

- **O que é:** a propriedade que arredonda as bordas de um elemento.
- **Para que serve:** transformar um botão quadrado em um botão circular.
- **Como funciona:** quanto maior o valor (em relação ao tamanho do botão), mais arredondado ele fica — valores altos criam círculos completos.
- **Exemplo:**
  ```javascript
  { borderRadius: 50 }
  ```
- **Uso na calculadora:** aplicada em todos os botões, criando o visual circular clássico de calculadoras estilo iOS.

---

## ✅ Resumo Visual da Apostila

| Categoria | Itens |
|---|---|
| 🧩 Linguagem | `import`, `export default`, `function` |
| 🖼️ Componentes | `View`, `Text`, `TouchableOpacity`, `SafeAreaView` |
| 🧠 Estado | `useState`, `display`, `previousValue`, `operator` |
| 🎯 Eventos e Funções | `onPress`, `handleNumber`, `handleOperator`, `handleEqual`, `handleClear`, `handlePercent`, `handleDecimal`, `handleInvertSignal` |
| 🔢 Conversões | `parseFloat`, `String` |
| 🎨 Estilo | `StyleSheet`, `flex`, `flexDirection`, `justifyContent`, `alignItems`, `borderRadius` |

> Use esta apostila como referência de consulta durante a construção do `App.tsx`, seguindo a ordem do Plano de Trabalho.
