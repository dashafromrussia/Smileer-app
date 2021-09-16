import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('smileer.db')

export class DB {
    static init() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY NOT NULL, name STRING, comment STRING, time STRING, idpost INTEGER)',
            [],
            resolve,
            (_, error) => reject(error)
          )
        })
      })
    }

    static initlog() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, password STRING)',
            [],
            resolve,
            (_, error) => reject(error)
          )
        })
      })
    }

    static initdata() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY NOT NULL, category STRING NOT NULL, data STRING)',
            [],
            resolve,
            (_, error) => reject(error)
          )
        })
      })
    }

    static initviews() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS views (id INTEGER PRIMARY KEY NOT NULL, idpost INTEGER, amount INTEGER)',
            [],
            resolve,
            (_, error) => reject(error)
          )
        })
      })
    }

    static loadViews() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM views`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static addView(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO views (idpost, amount) VALUES (?, ?)`,
            [data.idpost, data.amount],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 

    static updateView(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE views SET amount ="${data.amount}" WHERE idpost ="${data.idpost}"`,
            [],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 

    static addData(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO data (category, data) VALUES (?, ?)`,
            [data.category, JSON.stringify(data.data)],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 


    static loadData() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM data`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteData() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM data`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteAllComments() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM comments`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteComment(id) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM comments WHERE id=${id}`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteCatComment(id) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM comments WHERE idpost=${id}`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deletePost(id) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM data WHERE id=${id}`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }
  

    static loadLogin() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM login`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static addLogin(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO login (name, password) VALUES (?, ?)`,
            [data.name,data.password],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 
  


      static loadComments() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM comments`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


      static addComment(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO comments (name, comment, time, idpost) VALUES (?, ?, ?, ?)`,
              [data.name,data.comment,data.time,data.idpost],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 
    }