/* eslint-disable no-console */
import app from './app';
import { ENV } from './config/env';

const env = ENV.ENVIRONMENT;
const port = ENV.PORT || 3000;

app.listen(port, () => console.log(`server runs on port ${port} in ${env} environment`));
