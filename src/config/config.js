export default {
  development: {
    username: "root",
    password: null,
    database: "odas_dev",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  },
}
