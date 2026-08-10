// App.tsx
// Calculadora simples em React Native + Expo (TypeScript)
// Projeto didático — baseado no guia "Interface e Comandos da Calculadora React Native"

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  // ---------------------------------------------------------
  // ESTADOS (memória viva da calculadora)
  // ---------------------------------------------------------
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  // ---------------------------------------------------------
  // FUNÇÕES
  // ---------------------------------------------------------

  // Adiciona um número digitado ao visor
  const handleNumber = (number: string) => {
    setDisplay(display === '0' ? number : display + number);
  };

  // Adiciona o ponto decimal ao visor (evita pontos duplicados)
  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Registra a operação escolhida e prepara o visor para o próximo número
  const handleOperator = (op: string) => {
    setOperator(op);
    setPreviousValue(display);
    setDisplay('0');
  };

  // Calcula o resultado final
  const handleEqual = () => {
    const current = parseFloat(display);
    const previous = parseFloat(previousValue ?? '0');

    if (!previousValue || !operator) return;

    let result = 0;

    if (operator === '+') result = previous + current;
    if (operator === '-') result = previous - current;
    if (operator === '×') result = previous * current;
    if (operator === '÷') result = current === 0 ? 0 : previous / current;

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
  };

  // Limpa a calculadora, voltando ao estado inicial
  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
  };

  // Converte o valor do visor em porcentagem
  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
  };

  // Inverte o sinal do número no visor (positivo/negativo)
  const handleInvertSignal = () => {
    const current = parseFloat(display);
    setDisplay(String(current * -1));
  };

  // ---------------------------------------------------------
  // INTERFACE VISUAL
  // ---------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      {/* DISPLAY DO RESULTADO */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      {/* TECLADO */}
      <View style={styles.keyboard}>
        {/* Linha 1: C, +/-, %, ÷ */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonFunction} onPress={handleClear}>
            <Text style={styles.buttonFunctionText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFunction} onPress={handleInvertSignal}>
            <Text style={styles.buttonFunctionText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFunction} onPress={handlePercent}>
            <Text style={styles.buttonFunctionText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperator('÷')}>
            <Text style={styles.buttonOperatorText}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2: 7, 8, 9, × */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('7')}>
            <Text style={styles.buttonNumberText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('8')}>
            <Text style={styles.buttonNumberText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('9')}>
            <Text style={styles.buttonNumberText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperator('×')}>
            <Text style={styles.buttonOperatorText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 3: 4, 5, 6, - */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('4')}>
            <Text style={styles.buttonNumberText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('5')}>
            <Text style={styles.buttonNumberText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('6')}>
            <Text style={styles.buttonNumberText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperator('-')}>
            <Text style={styles.buttonOperatorText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 4: 1, 2, 3, + */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('1')}>
            <Text style={styles.buttonNumberText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('2')}>
            <Text style={styles.buttonNumberText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumber('3')}>
            <Text style={styles.buttonNumberText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperator('+')}>
            <Text style={styles.buttonOperatorText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 5: 0, ., = */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonZero} onPress={() => handleNumber('0')}>
            <Text style={styles.buttonNumberText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber} onPress={handleDecimal}>
            <Text style={styles.buttonNumberText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOperator} onPress={handleEqual}>
            <Text style={styles.buttonOperatorText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------
// ESTILOS
// ---------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    padding: 24,
    alignItems: 'flex-end',
  },
  displayText: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '300',
  },
  keyboard: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  buttonNumber: {
    flex: 1,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZero: {
    flex: 2,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    alignSelf: 'flex-start',
  },
  buttonFunction: {
    flex: 1,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 35,
    backgroundColor: '#a5a5a5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOperator: {
    flex: 1,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 35,
    backgroundColor: '#ff9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNumberText: {
    color: '#fff',
    fontSize: 28,
  },
  buttonFunctionText: {
    color: '#000',
    fontSize: 28,
  },
  buttonOperatorText: {
    color: '#fff',
    fontSize: 28,
  },
});