# 📘 Plano de Trabalho — Calculadora em React Native (Expo)

> Público-alvo: alunos iniciantes em React Native
> Ferramenta: Expo Go
> Linguagem: TypeScript (.tsx)

Este plano organiza o ensino em etapas **incrementais**: cada etapa usa o que foi aprendido na etapa anterior. Não pule etapas — a calculadora só "ganha vida" aos poucos.

---

## Etapa 1 — Criando o projeto

**Objetivo pedagógico:** entender como um projeto Expo nasce e o papel de cada comando no terminal, antes de ver qualquer código.

Comandos:
```bash
npx create-expo-app minha-calculadora
cd minha-calculadora
npx expo start
```

O que o aluno deve compreender:
- `npx` aciona o gerenciador de pacotes do Node.js.
- `create-expo-app` baixa um modelo pronto, já com pastas, configurações nativas (iOS/Android) e bibliotecas essenciais.
- `cd` entra na pasta do projeto recém-criado.
- `npx expo start` liga o Metro Bundler, o servidor que envia o código para o app Expo Go no celular ou emulador.

✅ **Checkpoint:** o aluno deve conseguir abrir o projeto padrão do Expo no celular via QR Code.

---

## Etapa 2 — Entendendo os componentes visuais

**Objetivo pedagógico:** antes de escrever a calculadora, o aluno precisa saber que React Native não usa HTML — usa componentes nativos.

Conceitos apresentados nesta etapa:
- `View` — o "caixote" que organiza tudo na tela.
- `Text` — único componente que pode exibir letras e números.
- `TouchableOpacity` — o botão, que dá feedback visual ao ser tocado.
- `SafeAreaView` (da biblioteca `react-native-safe-area-context`) — garante que o conteúdo não fique escondido atrás de notch, câmera ou barras do sistema.

✅ **Checkpoint:** o aluno consegue montar uma tela simples com um `View`, um `Text` e um `TouchableOpacity`, sem nenhuma lógica ainda.

---

## Etapa 3 — Montando o layout da calculadora (visual estático)

**Objetivo pedagógico:** reproduzir visualmente o teclado da calculadora antes de fazer qualquer botão funcionar. Isso separa "aparência" de "lógica", o que facilita o aprendizado.

Layout de referência (baseado no PDF):
```
DISPLAY DO RESULTADO (ex: 1234)

C (Limpar)   +/-   %    ÷
7            8     9    ×
4            5     6    -
1            2     3    +
0            .     =
```

Conceitos de estilização introduzidos:
- `StyleSheet` — API do React Native para escrever estilos em CamelCase.
- `flexDirection: 'row'` — organiza os botões lado a lado.
- `flex: 1` — divide o espaço igualmente entre os elementos.
- `justifyContent` e `alignItems` — centralizam o conteúdo dentro do botão.
- `borderRadius` — arredonda os botões (valores altos criam botões circulares).

✅ **Checkpoint:** a calculadora já se parece visualmente com uma calculadora, mas nenhum botão faz nada ainda.

---

## Etapa 4 — Dando "memória" à calculadora (useState)

**Objetivo pedagógico:** apresentar o conceito de estado — a "memória viva" que faz a tela se atualizar sozinha.

Estados introduzidos:
```javascript
const [display, setDisplay] = useState('0');
const [previousValue, setPreviousValue] = useState(null);
const [operator, setOperator] = useState(null);
```

O que o aluno deve compreender:
- `display` guarda o que o usuário vê no visor agora.
- `previousValue` guarda o número anterior, salvo quando um operador é escolhido.
- `operator` guarda qual operação matemática foi solicitada (+, -, ×, ÷).

✅ **Checkpoint:** o aluno entende que mudar um estado com `setDisplay`, por exemplo, faz a tela se redesenhar automaticamente.

---

## Etapa 5 — Conectando os botões aos estados (onPress)

**Objetivo pedagógico:** ligar a interface (Etapa 3) à memória (Etapa 4) através do evento `onPress`.

Nesta etapa, cada botão numérico e de operação passa a chamar uma função ao ser tocado, mesmo que essas funções ainda estejam vazias. Isso ensina o aluno a primeiro estruturar a "ligação" antes de implementar a lógica.

✅ **Checkpoint:** tocar em um botão já imprime algo no console (ex: `console.log`), provando que o clique está sendo capturado.

---

## Etapa 6 — Implementando `handleNumber`

**Objetivo pedagógico:** ensinar concatenação de strings e o uso do operador ternário para decidir entre substituir ou completar o número no visor.

```javascript
const handleNumber = (number) => {
  setDisplay(display === '0' ? number : display + number);
};
```

✅ **Checkpoint:** os números digitados aparecem corretamente no visor, sem zeros indesejados no início.

---

## Etapa 7 — Implementando `handleOperator`

**Objetivo pedagógico:** ensinar como "congelar" um valor (guardando-o em `previousValue`) antes de continuar a conta.

```javascript
const handleOperator = (op) => {
  setOperator(op);
  setPreviousValue(display);
  setDisplay('0');
};
```

✅ **Checkpoint:** ao clicar em um operador, o visor zera para receber o próximo número, e a operação escolhida fica guardada.

---

## Etapa 8 — Implementando `handleEqual`

**Objetivo pedagógico:** ensinar conversão de texto para número (`parseFloat`), validações de segurança (`if`) e conversão de volta para texto (`String`).

```javascript
const handleEqual = () => {
  const current = parseFloat(display);
  const previous = parseFloat(previousValue);

  if (!previousValue || !operator) return;

  let result = 0;
  if (operator === '+') result = previous + current;
  // outras operações

  setDisplay(String(result));
  setPreviousValue(null);
  setOperator(null);
};
```

✅ **Checkpoint:** a calculadora realiza corretamente a soma entre dois números.

---

## Etapa 9 — Completando as demais operações

**Objetivo pedagógico:** reforçar a lógica condicional aprendida na Etapa 8, agora aplicada a subtração, multiplicação e divisão.

✅ **Checkpoint:** todas as quatro operações básicas funcionam corretamente.

---

## Etapa 10 — Funções auxiliares (Limpar, Porcentagem, Inverter Sinal, Decimal)

**Objetivo pedagógico:** aplicar tudo o que foi aprendido para criar funcionalidades extras da calculadora (`handleClear`, `handlePercent`, `handleInvertSignal`, `handleDecimal`), reforçando o uso de `useState` de forma independente.

✅ **Checkpoint:** a calculadora está funcionalmente completa e pronta para uso.

---

## Resumo da sequência pedagógica

1. Criar o projeto → 2. Entender componentes → 3. Montar o visual → 4. Criar a memória (estado) → 5. Conectar botões → 6. Números → 7. Operadores → 8. Igual → 9. Todas as operações → 10. Funções extras.

Cada etapa deve ser testada no Expo Go antes de avançar para a próxima.
