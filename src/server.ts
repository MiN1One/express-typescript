import app from './app';
import '@types/global';

const port = process.env.PORT ?? 3003;

app.listen(port, () => {
  console.log(`APP LISTENING ON PORT ${port}`);
});