module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "odas_dev",
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "database_test",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: "postgres",
    password: "postgres",
    database: "database_test",
    host: "localhost",
    dialect: "postgres"
  },
}
