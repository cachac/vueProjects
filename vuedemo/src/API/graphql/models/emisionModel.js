import dbConn from '../../database'

// object constructor
const Emision = function(emision) {
  this.id = emision.id
  this.fechaRegistro = emision.fechaRegistro
  this.estado = emision.estado
  this.cantidadTotalDoc = emision.cantidadTotalDoc
  this.error = emision.error
  this.aceptados = emision.aceptados
  this.rechazados = emision.rechazados
}

Emision.readAll = async function() {
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await dbConn()
      conn.execute(
        /* sql */ `select * from
        (select ID, ESTADO, FECHA_REGISTRO, EMISOR, CANTIDAD_TOTAL_DOCUMENTOS, CANTIDAD_ACEPTADOS, CANTIDAD_RECHAZADOS, CANTIDAD_DOC_ERROR
          from usrfiscoprd.documento_lote
          where FECHA_REGISTRO between TO_DATE('2020/01/13 00:00:00', 'YYYY/MM/DD HH24:MI:SS') and sysdate
          ORDER BY FECHA_REGISTRO desc)
        WHERE ROWNUM <= 10`,
        function(err, result) {
          if (err) {
            console.error(`[ERROR] ${err.message}`)
            conn.close()
            reject({ message: err.message, errCode: 500 })
          } else {
            if (conn) conn.close()
            resolve(result.rows)
          }
        }
      )
    } catch (err) {
      console.log(`[FATAL] ${err.message}`)
      reject({ message: err.message, errorCode: 500 })
    }
  })
}
Emision.readById = id =>
  new Promise(async (resolve, reject) => {
    try {
      const conn = await dbConn()
      conn.execute(
        /* sql */ `select ID, ESTADO, FECHA_REGISTRO, EMISOR, CANTIDAD_TOTAL_DOCUMENTOS, CANTIDAD_ACEPTADOS, CANTIDAD_RECHAZADOS, CANTIDAD_DOC_ERROR
            from usrfiscoprd.documento_lote
            where ID in (${id})`,
        function(err, result) {
          if (err) {
            console.error(`[ERROR]: ${err.message}`)
            conn.close()
            reject({ message: err.message, errorCode: 500 })
          } else {
            if (conn) conn.close()
            resolve(result.rows)
          }
        }
      )
    } catch (err) {
      console.log(`[FATAL] ${err.message}`)
      reject({ message: err.message, errorCode: 500 })
    }
  })

export default Emision
