import { sequelize } from '../models';
import app from '../server';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`ODAS app listening on port ${PORT}`);
  sequelize
    .sync({ force: true})
    .then(() => {
      console.log('Connection has been establised successfully.');
    })
    .catch(error => {
      console.error('Unable to connect to the database:', error);
    });
})

