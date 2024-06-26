import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Table } from "antd";

import './style.scss';

const ProductListView = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterSearch: true,
      filterMode: 'tree',
      filters: filteredProducts.map(p => ( { text: p.name, value: p.name })),
      onFilter: (value, record) => record.name.toLowerCase().startsWith(value),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      filterSearch: true,
      filterMode: 'tree',
      filters: filteredProducts.map(p => ( { text: p.price, value: p.price })),
      onFilter: (value, record) => record.price.toLowerCase().contains(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`/product/${record.id}`} className="text-blue-500">
          View Product
        </Link>
      ),
    },
  ];

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="main-container">
      <div className='main-container__main-content'>
        <h1>Product List</h1>

        <Link to="/add" className="main-container__button">
          <Button type='primary'>
            Add Product
          </Button>
        </Link>

        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Table columns={columns} dataSource={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductListView;
