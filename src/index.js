import { app } from './app.js';
import swaggerDocs from './uttils/swagger.js';
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
