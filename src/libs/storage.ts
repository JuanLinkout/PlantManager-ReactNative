import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number,
    repeat_every: string
  };
  dateTimeNotification?: Date;
  hour: string;
}

export interface StorageProps {
  [id: string]: {
    data: PlantProps
  }
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StorageProps) : {};
    const newPlant = { [plant.id]: { data: plant } };
    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({ ...newPlant, ...oldPlants }));
  } catch (e) {
    throw new Error(e);
  }
}

export async function getPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StorageProps) : {};
    
    const plantsSorted = Object.keys(plants).map(plant => {
      return { ...plants[plant].data, hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm') }
    })
    .sort((a, b) => 
      Math.floor( new Date(a.dateTimeNotification).getTime() / 1000 - Math.floor(new Date(b.dateTimeNotification).getTime() / 100))
    );

    return plantsSorted;

  } catch (e) {
    throw new Error(e);
  }
}

export async function deletePlant(plant: PlantProps): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StorageProps) : {};

  delete plants[plant.id];

  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
}