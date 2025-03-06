import { act } from "@testing-library/react-native";
import type * as ZustandExportedTypes from "zustand";
export * from "zustand";

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof ZustandExportedTypes>("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

// recursive function to convert objects, arrays, etc. to plain objects
function convertToPlainObject(value: any): any {
  if (Array.isArray(value)) {
    return value.map(convertToPlainObject);
  } else if (typeof value === "object" && value !== null) {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = convertToPlainObject(value[key]);
      return acc;
    }, {} as any);
  } else {
    return value;
  }
}

const createUncurried = <T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>
) => {
  const store = actualCreate(stateCreator);
  // This is for initial state that have objects, arrays, etc.
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(JSON.parse(JSON.stringify(initialState)));
  });

  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>
) => {
  console.log("zustand create mock");

  // to support curried version of create
  return typeof stateCreator === "function"
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof ZustandExportedTypes.create;

const createStoreUncurried = <T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>
) => {
  const store = actualCreateStore(stateCreator);
  const initialState = convertToPlainObject(store.getInitialState());

  storeResetFns.add(() => {
    console.log("aqui");
    store.setState(initialState, true);
  });
  console.log({ storeResetFns });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (<T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>
) => {
  console.log("zustand createStore mock");

  // to support curried version of createStore
  return typeof stateCreator === "function"
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof ZustandExportedTypes.createStore;

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
