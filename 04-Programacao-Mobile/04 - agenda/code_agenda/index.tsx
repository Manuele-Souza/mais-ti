import { useMemo, useState } from 'react';
import {
 FlatList,
 Modal,
 Pressable,
 ScrollView,
 Text,
 TextInput,
 View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles.js';

type Category = 'trabalho' | 'estudo' | 'pessoal' | 'saude';
type Appointment = {
 id: number;
 title: string;
 date: string;
 time: string;
 category: Category;
 done: boolean;
};

const CATEGORY_LABELS: Record<Category, string> = {
 trabalho: 'Trabalho',
 estudo: 'Estudo',
 pessoal: 'Pessoal',
 saude: 'Saúde',
};
const CATEGORY_COLORS: Record<Category, string> = {
 trabalho: '#2563eb',
 estudo: '#7c3aed',
 pessoal: '#0d9488',
 saude: '#dc2626',
};
const CATEGORY_OPTIONS: Category[] = ['trabalho', 'estudo', 'pessoal', 'saude'];
let nextId = 4;

const INITIAL_APPOINTMENTS: Appointment[] = [
 {
 id: 1,
 title: 'Reunião com orientador',
 date: '29/07',
 time: '09:00',
 category: 'trabalho',
 done: false,
 },
 {
 id: 2,
 title: 'Estudar para a prova de redes',
 date: '29/07',
 time: '14:30',
 category: 'estudo',
 done: false,
 },
 {
 id: 3,
 title: 'Consulta com dentista',
 date: '30/07',
 time: '11:00',
 category: 'saude',
 done: false,
 },
];

function sortAppointments(list: Appointment[]): Appointment[] {
 return [...list].sort((a, b) => {
 if (a.date === b.date) {
 return a.time.localeCompare(b.time);
 }
 return a.date.localeCompare(b.date);
 });
}

export default function Index() {
 const [appointments, setAppointments] = useState<Appointment[]>(() =>
 sortAppointments(INITIAL_APPOINTMENTS),
 );
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [title, setTitle] = useState('');
 const [date, setDate] = useState('');
 const [time, setTime] = useState('');
 const [category, setCategory] = useState<Category>('trabalho');


const totalCount = appointments.length;
 const doneCount = useMemo(
    () => appointments.filter((item) => item.done).length,
    [appointments],
 );
 const nextAppointment = useMemo(
    () => appointments.find((item) => !item.done),
    [appointments],
 );

 function openNewAppointmentModal() {
    setTitle('');
    setDate('');
    setTime('');
    setCategory('trabalho');
    setIsModalVisible(true);
 }

 function closeModal() {
    setIsModalVisible(false);
 }

 function handleSaveAppointment() {
      if (title.trim() === '' || date.trim() === '' || time.trim() === '') {
      return;
      }
      const newAppointment: Appointment = {
      id: nextId,
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      category,
      done: false,
      };
      nextId += 1;
      setAppointments((currentAppointments) =>
      sortAppointments([...currentAppointments, newAppointment]),
      );
      setIsModalVisible(false);
 }

 function toggleDone(id: number) {
 setAppointments((currentAppointments) =>
 currentAppointments.map((item) =>
 item.id === id ? { ...item, done: !item.done } : item,
 ),
 );
 }
 function removeAppointment(id: number) {
 setAppointments((currentAppointments) =>
 currentAppointments.filter((item) => item.id !== id),
 );
 }

return (
  <View style={styles.screen}>
    <StatusBar style="dark" />
    <ScrollView
      contentContainerStyle={styles.screenContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Minha Agenda</Text>
        <Text style={styles.subtitle}>Organize seus compromissos do dia</Text>
      </View>

      <View style={styles.scoreboard}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Total</Text>
          <Text style={styles.scoreValue}>{totalCount}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Concluídos</Text>
          <Text style={styles.scoreValue}>{doneCount}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Próximo</Text>
          <Text style={styles.scoreValueSmall}>
            {nextAppointment ? nextAppointment.time : '--:--'}
          </Text>
        </View>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum compromisso cadastrado. Toque em "Novo compromisso" para começar.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.done && styles.cardDone,
              { borderLeftColor: CATEGORY_COLORS[item.category] },
            ]}
          >
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.done }}
              onPress={() => toggleDone(item.id)}
              style={styles.cardMain}
            >
              <View style={[styles.checkbox, item.done && styles.checkboxChecked]}>
                {item.done && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, item.done && styles.cardTitleDone]}>
                  {item.title}
                </Text>
                <Text style={styles.cardMeta}>{item.date} às {item.time}</Text>
                <View style={[styles.categoryTag, { backgroundColor: CATEGORY_COLORS[item.category] }]}>
                  <Text style={styles.categoryTagText}>{CATEGORY_LABELS[item.category]}</Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remover ${item.title}`}
              onPress={() => removeAppointment(item.id)}
              style={({ pressed }) => [styles.removeButton, pressed && styles.removeButtonPressed]}
            >
              <Text style={styles.removeButtonText}>✕</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable
        accessibilityRole="button"
        onPress={openNewAppointmentModal}
        style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
      >
        <Text style={styles.addButtonText}>+ Novo compromisso</Text>
      </Pressable>
    </ScrollView>

    {/* Estrutura do Modal corrigida com o fechamento correto do modalContent */}
    <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Novo compromisso</Text>
          
          <Text style={styles.fieldLabel}>Título</Text>
          <TextInput 
            value={title} 
            onChangeText={setTitle} 
            placeholder="Ex: Reunião de projeto" 
            style={styles.input} 
          />
          
          <Text style={styles.fieldLabel}>Data</Text>
          <TextInput 
            value={date} 
            onChangeText={setDate} 
            placeholder="Ex: 31/07" 
            style={styles.input} 
          />
          
          <Text style={styles.fieldLabel}>Horário</Text>
          <TextInput 
            value={time} 
            onChangeText={setTime} 
            placeholder="Ex: 15:30" 
            style={styles.input} 
          />
          
          <Text style={styles.fieldLabel}>Categoria</Text>
          <View style={styles.categoryRow}>
            {CATEGORY_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => setCategory(option)}
                style={[
                  styles.categoryOption,
                  { borderColor: CATEGORY_COLORS[option] },
                  category === option && { backgroundColor: CATEGORY_COLORS[option] },
                ]}
              >
                <Text style={[
                  styles.categoryOptionText, 
                  category === option && styles.categoryOptionTextActive
                ]}>
                  {CATEGORY_LABELS[option]}
                </Text>
              </Pressable>
            ))}
          </View>
          
          <View style={styles.modalActions}>
            <Pressable 
              onPress={closeModal} 
              style={({ pressed }) => [styles.cancelButton, pressed && styles.cancelButtonPressed]}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
            <Pressable 
              onPress={handleSaveAppointment} 
              style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </Pressable>
          </View>
        </View> {/* Fim do modalContent */}
      </View> {/* Fim do modalOverlay */}
    </Modal>
  </View>
);
}