import app from './app.js';
import config from '@core/config.js';

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
});
