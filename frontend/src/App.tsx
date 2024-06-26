import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductListView from './routes/ProductListView';
import AddProductView from './routes/AddProductView';
import ProductDetailView from './routes/ProductDetailView';

const App = (): any => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListView />} />
        <Route path="/add" element={<AddProductView />} />
        <Route path="/product/:id" element={<ProductDetailView />} />
      </Routes>
    </Router>
  );
};

export default App;
