import { sequelize } from '../models';
import app from '../server';

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`ODAS app listening on port ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been establised successfully.');
    })
    .catch(error => {
      console.error('Unable to connect to the database:', error);
    });
})

