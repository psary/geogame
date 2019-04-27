// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Button, Text } from 'react-native'

class Game extends React.Component {

  constructor(props) {
    super(props)
    
    this.clickGain = 1
    this.builds = {
      'BRAD' : {'key': 'BRAD', 'title': 'Acheter un Bradou', 'cost': 100, 'income': 1, 'owned': 0, 'activated': false},
      'LAV' : {'key': 'LAV', 'title': 'Lave vaiselle', 'cost': 10000, 'income': 90, 'owned': 0, 'activated': false},
      'GAB' : {'key': 'GEN', 'title': 'Acheter un gabou', 'cost': 1000, 'income': 9, 'owned': 0, 'activated': false},
      'REM' : {'key': 'REM', 'title': 'Acheter un rémi', 'cost': 100000, 'income': 900, 'owned': 0, 'activated': false},
      'ITH' : {'key': 'ITH', 'title': 'Acheter une ithai', 'cost': 1000000, 'income': 9000, 'owned': 0, 'activated': false}
    };
    this.state = {
      totalIncome: 0,
      total: 0
    }

    this.timer = this.timer.bind(this);


  }

  componentDidMount() {
    setInterval(this.timer, 100);
 }
 
 componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.timer);
 }
 
 timer() {
    // setState method is used to update the state
    //this.setState({ total: this.state.total + this.state.totalIncome });
    this.setState({ total: this.state.total + (this.state.totalIncome / 10) });
    this.updateBuildList()
 }

 updateBuildList(){
  Object.keys(this.builds).map(key => this.updateBuild(key))
 }

 updateBuild(name){
  if(this.builds[name]['cost']<=this.state.total) {
    this.builds[name]['activated'] = true
  }
 }

 click() {
   this.setState({ total: this.state.total + this.clickGain});
   this.updateBuildList()
 }

 add(build){
    this.setState({total: this.state.total - this.builds[build]['cost'], totalIncome: this.state.totalIncome + this.builds[build]['income']})
    this.builds[build]['owned']++
 }

 canBuy(build) {
   return this.state.total >= this.builds[build]['cost']
 }

 renderBuild(name){
   if(this.builds[name]['activated']) {
    return <Button key={name}  style={styles.buy_button} disabled={!this.canBuy(name)} title={this.builds[name]["title"]+' ('+this.builds[name]['owned']+')'} onPress={() => this.add(name)}/>
   }
   else {
     return
   }
 }
 
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.infos}>
          <Text style={styles.textinput}>
            {Math.floor(this.state.total)}
          </Text>
        </View>
        <View style={styles.click}>
          <TouchableOpacity style={styles.click_button} onPress={() => this.click()}>
              <Text style={styles.click_text}>tap!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buy}>
          {Object.keys(this.builds).map(key => this.renderBuild(key))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  click: {
    flex: 3,
    backgroundColor: 'skyblue',
    justifyContent: 'center'
  },
  buy: {
    flex: 6,
    justifyContent: 'space-evenly'
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    flex: 0.8,
    fontSize: 20
  },
  click_text: {
    flex: 1,
    fontSize: 20,
    marginTop:20,
    marginLeft: '45%'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  click_button: {
      marginTop: 5,
      top: 5,
      flex: 2
  },
  buy_button: {
    marginTop: 5,
    top: 5,
    color: '#ccc',
    flex: 1

  }
})

export default Game