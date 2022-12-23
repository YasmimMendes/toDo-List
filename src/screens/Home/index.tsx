import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';

import { style } from './style';

import { Task } from '../../components/Task';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskAdd, setTaskAdd] = useState('');
  const [countAdd, setCountAdd] = useState(0);
  const [countDone, setCountDone] = useState(0);

  function handleDoneTask() {
    setCountDone(countDone + 1);
  };

  function handleAddTask() {
    if (tasks.includes(taskAdd)) {
      return Alert.alert('Task existente', 'Essa tarefa já existe.');
    }

    setTasks((prevState) => [...prevState, taskAdd]);
    setTaskAdd('');

    setCountAdd(countAdd + 1);
  };

  function handleRemoveTask(name: string) {
    Alert.alert('Remover', 'Deseja remover essa tarefa?', [
      {
        text: 'Sim',
        onPress: () => {
          setTasks((prevState) => prevState.filter((Task) => Task !== name)),
            setCountAdd(countAdd - 1);
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={style.container}>
      <View style={style.containerRow}>
        <Image source={require('../../assets/logo.png')} />
      </View>

      <View style={style.containerRow}>
        <TextInput
          style={style.inputText}
          placeholder='Adicione uma nova tarefa'
          placeholderTextColor='#808080'
          onChangeText={setTaskAdd}
          value={taskAdd}
        />
        <TouchableOpacity onPress={handleAddTask} style={style.button}>
          <Text style={style.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={style.containerCountSection}>
        <View style={style.containerRow}>
          <Text style={style.textCreate}>Criadas</Text>
          <View style={style.containerCount}>
            <Text style={style.textCount}>{countAdd}</Text>
          </View>
        </View>
        <View style={style.containerRow}>
          <Text style={style.textDone}>Concluídas</Text>
          <View style={style.containerCount}>
            <Text style={style.textCount}>{countDone}</Text>
          </View>
        </View>
      </View>

      <FlatList
        style={style.list}
        data={tasks}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Task
            key={item}
            name={item}
            onRemove={() => handleRemoveTask(item)}
            onDone={handleDoneTask}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={style.emptyList}>
            <Image source={require('../../assets/clipboard.png')} />
            <Text style={style.emptyListText}>
              Ainda não há tarefas cadastradas.
            </Text>
            <Text style={style.emptyListSubText}>
              Crie tarefas e organize seus itens.
            </Text>
          </View>
        )}
      />
    </View>
  );
}