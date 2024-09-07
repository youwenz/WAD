import SQLite from 'react-native-sqlite-storage';
import homestayList from './HomeStayList';
// Open (or create) the database
const db = SQLite.openDatabase(
  { name: 'homestays.db', location: 'default' },
  () => { console.log('Database opened successfully'); },
  error => { console.error('Database error: ', error); }
);