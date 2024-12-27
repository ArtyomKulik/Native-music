declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
  }

  declare module '*.mp3' {
    const value: string;
    export default value;
  }