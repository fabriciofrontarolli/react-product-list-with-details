import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Descriptions, notification } from 'antd';

import './style.scss';

const ProductDetailView = () => {
  const { id } = useParams();
  const [productInformation, setProductInformation] = useState([]);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message);
        }

        const prodInformation = Object.keys(payload).map(ky => ({
          key: ky,
          label: ky,
          children: payload[ky],
        }));
        setProductInformation(prodInformation);
      }
      catch(error) {
        notification.error({ message: `Error fetching product : ${error.message}` });
      }
    }

    fetchProductDetail(id);
  }, [id]);

  return (
    <div className="main-container">
      <div className='main-container__main-content'>
        <div className='main-container__main-content__header'>
          <Link to={`/`} className="text-blue-500">
            Return to Listing
          </Link>
          <h1>View Product</h1>
        </div>

        <Descriptions title="Product Information" items={productInformation} />
      </div>
    </div>
  );
};

export default ProductDetailView;
