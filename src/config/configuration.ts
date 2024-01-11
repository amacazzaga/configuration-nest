export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
}); // cuando el objeto de configuracion puede llegar a tornarse muy grande (configModule.forRoot()) podemos crear este archivo
// lo importaremos despues en el propio modulo dentro del configModule.forRoot(   load: [configuration],), usando load y declarando ese arreglo
