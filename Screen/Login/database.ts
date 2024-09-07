import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'SampleDB';

// Enable promise for SQLite
enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase(
        {name: `${databaseName}`},
        openCallback,
        errorCallback,
    );
}

export const createTableUsers = async( db: SQLiteDatabase ) => {
    try{
        const query = `CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                age VARCHAR(10),
                password VARCHAR(255),
                phone_number VARCHAR(20),
                profile_picture VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await db.executeSql(query);
      } catch (error) {
        console.error(error);
        throw Error('Failed to create table !!!');
      }
}


export const getUsers = async( db: SQLiteDatabase ): Promise<any> => {
    try{
        const userData : any = [];
        const query = `SELECT * FROM users ORDER BY name`;
        const results = await db.executeSql(query);
        results.forEach(result => {
            (result.rows.raw()).forEach(( item:any ) => {
                userData.push(item);
            })
          });
        return userData;
      } catch (error) {
        console.error(error);
        throw Error('Failed to get users !!!');
      }
}

export const getUsersByEmail = async( db: SQLiteDatabase, email: string ): Promise<any> => {
    try{
        const userData : any = [];
        const query = `SELECT password FROM users WHERE email=?`;
        const results = await db.executeSql(query,[email]);
        return results[0].rows.item(0)
      } catch (error) {
        console.error(error);
        throw Error('Failed to get account!!!');
      }
}

export const createUsers = async( 
        db: SQLiteDatabase,
        name : string,
        email: string,
        password : string,
        age : string,
        phone_number : string,
    ) => {
    try{
        const query = 'INSERT INTO users(name,email,password,age,phone_number) VALUES(?,?,?,?,?)';
        const parameters = [name,email,password,age,phone_number]
        await db.executeSql(query,parameters);
      } catch (error) {
        console.error(error);
        throw Error('Failed to create account !!!');
      }
}

export const updateUser = async( 
    db: SQLiteDatabase,
    email : string,
    password : string
) => {
try{
    const query = 'UPDATE users SET password=? WHERE email=?';
    const parameters = [password, email]
    await db.executeSql(query,parameters);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update password !!!');
  }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}