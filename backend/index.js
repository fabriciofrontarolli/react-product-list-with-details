const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
