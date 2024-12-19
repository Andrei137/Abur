import app from './app.js';
import config from './utils/config.js';
import util from './core/services/requestService.js';

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
});
