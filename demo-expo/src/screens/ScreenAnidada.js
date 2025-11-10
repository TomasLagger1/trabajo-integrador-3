import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Coments from '../components/Coments';

const Stack = createNativeStackNavigator()
export default function ScreenAnidada() {

    return (
      
        <Stack.Navigator>
         
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false}}/>
            <Stack.Screen name='Comentarios' component={Coments} options={{ headerShown: false}}/>
        </Stack.Navigator>
      
    )
  }