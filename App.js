import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Button from './src/Components/Button';
import Display from './src/Components/Display';

StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.6)');
StatusBar.setHidden(false);

export default function App() {
  const[stateDisplayValue, setStateDisplayValue] = useState('0');
  const[stateClearDisplay, setStateClearDisplay] = useState(false);
  const[stateOperation, setStateOperation] = useState(null);
  const[stateValues, setStateValues] = useState([0, 0]);
  const[stateCurrent, setStateCurrent] = useState(0);//indice do array que estou colocando

  function addDigit(n) {    
    const clearDisplay = stateDisplayValue === '0' || stateClearDisplay;

    if(n === '.' && !clearDisplay && stateDisplayValue.includes('.')) return;

    const currentValue = clearDisplay ? '' : stateDisplayValue;
    const displayValue = currentValue + n;

    setStateDisplayValue(displayValue);
    setStateClearDisplay(false);

    if(n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...stateValues];
      values[stateCurrent] = newValue;
      setStateValues(values);
    }
  }

  function clearMemory() {
    setStateDisplayValue('0');
    setStateClearDisplay(false);
    setStateOperation(null);
    setStateValues([0, 0]);
    setStateCurrent(0);
  }

  function setOperation(operation) {
    if(stateCurrent === 0) {
      setStateOperation(operation);
      setStateCurrent(1);
      setStateClearDisplay(true);
    } else {
      const equals = operation === '=';
      const values = [...stateValues];

      try {
        values[0] = eval(`${values[0]} ${stateOperation} ${values[1]}`);

      } catch(err) {
        values[0] = stateValues[0];
      }
      values[1] = 0;
      setStateDisplayValue(String(values[0]));
      setStateOperation(equals ? null : operation);
      setStateCurrent(equals ? 0 : 1);
      setStateClearDisplay(!equals);
      setStateValues(values);
    }
  }

  return(
    <View style={styles.container}>
      <Display value={stateDisplayValue}/> 
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory}/>
        <Button label="/" operation onClick={setOperation}/>
        <Button label="7" onClick={addDigit}/>
        <Button label="8" onClick={addDigit}/>
        <Button label="9" onClick={addDigit}/>
        <Button label="*" operation onClick={setOperation}/>
        <Button label="4" onClick={addDigit}/>
        <Button label="5" onClick={addDigit}/>
        <Button label="6" onClick={addDigit}/>
        <Button label="-" operation onClick={setOperation}/>
        <Button label="1" onClick={addDigit}/>
        <Button label="2" onClick={addDigit}/>
        <Button label="3" onClick={addDigit}/>
        <Button label="+" operation onClick={setOperation}/>
        <Button label="0" double onClick={addDigit}/>
        <Button label="." onClick={addDigit}/>
        <Button label="=" operation onClick={setOperation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});