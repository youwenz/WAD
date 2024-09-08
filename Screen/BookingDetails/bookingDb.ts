import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const databaseName = 'bookingDB';

// Enable promise for SQLite
enablePromise(true);

export const getDBConnection = async () => {
  const db = await openDatabase({ name: `${databaseName}` });
  await createBookingTable(db); // Ensure the table is created
  return db;
};

export const createBookingTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS bookings(
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  homestay_name VARCHAR(255),
                  check_in_date VARCHAR(20),
                  check_out_date VARCHAR(20),
                  total_price REAL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;
  await db.executeSql(query);
};

export const getAllBookings = async (db: SQLiteDatabase): Promise<any[]> => {
  try {
    const results = await db.executeSql('SELECT * FROM bookings ORDER BY created_at DESC');
    const bookings: any[] = [];
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        bookings.push(result.rows.item(index));
      }
    });
    return bookings;
  } catch (error) {
    console.error('Failed to get bookings:', error);
    throw Error('Failed to get bookings');
  }
};

export const addBooking = async (
    db: SQLiteDatabase,
    homestayName: string,
    checkInDate: string,
    checkOutDate: string,
    totalPrice: number
  ) => {
    try {
      const insertQuery = `INSERT INTO bookings(homestay_name, check_in_date, check_out_date, total_price) VALUES (?, ?, ?, ?)`;
      await db.executeSql(insertQuery, [homestayName, checkInDate, checkOutDate, totalPrice]);
      console.log('Booking added successfully');
    } catch (error) {
      console.error('Error adding booking:', error);
      throw Error('Failed to add booking');
    }
  };
  

export const deleteBooking = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM bookings WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
};

export const deleteAllBookings = async (db: SQLiteDatabase) => {
  const deleteQuery = `DELETE FROM bookings`;
  await db.executeSql(deleteQuery);
};
