import {
  // createConnection,
  createConnections,
  // Connection /* getConnectionOptions */,
} from 'typeorm'

// ;(async (): Promise<void> => {
//   const options = await getConnectionOptions('default')

//   createConnection({ ...options, name: 'default' })
// })()
// console.log('Database Connection Established!!')

createConnections()
console.log('Database Connection Established!!')

// async function init() {
// let connection: Connection;
// let queryRunner: QueryRunner;

//   if (!getConnectionManager().has('default')) {
//     const connectionOptions = await getConnectionOptions();
//     connection = await createConnection(connectionOptions);
//   } else {
//     connection = getConnection();
//   }

// queryRunner = connection.createQueryRunner();
// }

// init()
