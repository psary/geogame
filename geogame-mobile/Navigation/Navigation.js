
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Game from '../Components/Game'

const SearchStackNavigator = createStackNavigator({
    Game: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: Game,
      navigationOptions: {
        title: 'Jeu'
      }
    }
  })

export default createAppContainer(SearchStackNavigator)
