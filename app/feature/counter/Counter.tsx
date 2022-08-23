import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  counterSelector,
  increment,
  decrement,
  incrementByAmount,
  asyncFetchRemote,
  asyncFetchRemoteSelector,
} from './counterRedux';

const Button = ({
  onPressHandler,
  children,
}: {
  onPressHandler: () => void;
  children: JSX.Element;
}) => {
  return (
    <View
      style={{
        height: 30,
        width: 150,
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
      }}>
      <TouchableOpacity onPress={onPressHandler}>{children}</TouchableOpacity>
    </View>
  );
};

const Counter = () => {
  const counter = useAppSelector(counterSelector);
  const asyncFetcherState = useAppSelector(asyncFetchRemoteSelector);
  console.log('================');
  console.log(asyncFetcherState.isIdle());
  console.log(asyncFetcherState.isFailure());
  console.log(asyncFetcherState.isSuccess());
  console.log(asyncFetcherState.isPending());
  const dispatch = useAppDispatch();

  const [increaseAmountState, setIncreaseAmountHandler] = useState(3);

  const onIncreaseHandler = () => dispatch(increment());
  const onDecreaseHandler = () => dispatch(decrement());
  const onIncreaseByAmountHandler = () =>
    dispatch(incrementByAmount(increaseAmountState));
  const onFetchRemoteHandler = () =>
    dispatch(asyncFetchRemote.requestAction(23));
  return (
    <View>
      <Text>{counter}</Text>
      <Button onPressHandler={onIncreaseHandler}>
        <Text>INCREASE</Text>
      </Button>
      <Button onPressHandler={onDecreaseHandler}>
        <Text>DECREASE</Text>
      </Button>
      <Button onPressHandler={onIncreaseByAmountHandler}>
        <Text>INCREASE BY {increaseAmountState}</Text>
      </Button>
      <View
        style={{
          borderColor: 'black',
          height: 30,
          marginHorizontal: 10,
          borderWidth: 1,
        }}>
        <TextInput onChangeText={value => setIncreaseAmountHandler(+value)} />
      </View>
      <Button onPressHandler={onFetchRemoteHandler}>
        <Text>Fetch Remote Value</Text>
      </Button>
    </View>
  );
};

export default Counter;
