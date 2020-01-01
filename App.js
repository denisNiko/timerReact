import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import {Vibration} from 'react-native'


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 48,
  },
});

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      isPaused:false,
      count: 5,
    };
  }
  numF(n) {
    return n > 9 ? '' + n : '0' + n;
  }
  converSeconds(s) {
    var min = Math.floor(s / 60);
    var sec = s % 60;
    return this.numF(min) + ':' + this.numF(sec);
  }

  componentDidMount() {
    if(this.state.count > 0 && this.state.isPaused === false){
      this.interval = setInterval(this.inc, 1000);
      
    }
    this.vibrate = setTimeout(()=>{Vibration.vibrate([500,500,500])}, this.state.count*1000)


      
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  inc = () => {
    if (this.state.count > 0 && this.state.isPaused === false) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }));
    } 
  }
  vibro = () => {
    console.log(this.state.count)
  }  



  

  render() {
    return (
      <View>
        <Text style={styles.count}>
          {this.converSeconds(this.state.count)}{' '}
        </Text>
        <Button
          title="stop"
          onPress={() => {
            this.setState({isPaused: true,})
          }}
        />
        <Button title="start" onPress={()=>{this.setState({isPaused: false,})}} />
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCounter: true,
    };
  }

  toggleCounter = () =>
    this.setState(prevState => ({
      showCounter: !prevState.showCounter,
    }));

  // this was the render() code originally written in lecture
  render() {
    if (this.state.showCounter) {
      return (
        <View style={styles.appContainer}>
          <Button title="toggle" onPress={this.toggleCounter} />

          <Counter />
          <Button title="stop" onPress={this.toggleCounter} />
        </View>
      );
    } else {
      return (
        <View style={styles.appContainer}>
          <Button title="toggle" onPress={this.toggleCounter} />
        </View>
      );
    }
  }

  // this is a more concise version with the same functionality
  render() {
    return (
      <View style={styles.appContainer}>
        <Button title="toggle" onPress={this.toggleCounter} />
        {this.state.showCounter && <Counter />}
      </View>
    );
  }
}
