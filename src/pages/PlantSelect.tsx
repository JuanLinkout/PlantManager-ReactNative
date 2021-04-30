import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import colors from '../style/colors';
import GlobalStyle from '../style/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Header } from '../components/Header';
import fonts from '../style/fonts';
import { EnvironmentButton } from '../components/EnvironmentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
  key: string,
  title: string,
}

export function PlantSelect() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>();
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState<PlantProps[]>();
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
  const [userName, setUserName] = useState<string>();
  
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data) {
      setIsLoading(true);
    }

    if (page > 1) {
      setPlants(oldValues => [...oldValues, ...data]);
      setFilteredPlants(oldValues => [...oldValues, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }


  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant => {
      return plant.environments.includes(environment);
    });

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantCardSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }
  
  async function loadStorageUserName() {
    const user = await AsyncStorage.getItem('@plantmanager:userName');
    setUserName(user || '');
  }

  useEffect(() => {
    loadStorageUserName();
  },[]);

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');
      setEnvironment([{ key: 'all', title: 'Todos'}, ...data]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);
  
  if (isLoading)
    return <Load />

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Header title="Olá," subtitle={userName} />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
    
      <View>
        <FlatList
          data={environment}
          keyExtractor={(item) => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
          renderItem={({item}) => (
            <EnvironmentButton onPress={() => handleEnvironmentSelected(item.key)} active={item.key === environmentSelected} title={item.title} />
          )}
        />
      </View>
      
      <View style={styles.plants}>
            <FlatList 
              data={filteredPlants}
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.plantsList}
              numColumns={2}
              renderItem={({item}) => (
                <PlantCardPrimary data={item} onPress={() => handlePlantCardSelect(item)} />
              )}
              onEndReachedThreshold={0.1}
              onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
              ListFooterComponent={
                loadingMore 
                ? <ActivityIndicator color={colors.green} />
                : <></>
              }
            />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.droidSafeArea,
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20
  },
  header: {
    paddingHorizontal: 32
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginVertical: 32,
    paddingBottom: 5
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
  plantsList: {
    
  }
});