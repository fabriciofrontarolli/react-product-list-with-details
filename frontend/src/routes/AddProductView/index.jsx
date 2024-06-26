import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import './style.scss';

const AddProductView = () => {
  const [apiErrors, setApiErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = data => {
    setApiErrors([]);

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok && response.status === 422) {
          return response.json()
                .then((payload) => {
                  const apiErrorsPayload = payload.map(err => ({
                    message: err.message
                  }));
                  setApiErrors(apiErrorsPayload);
                  throw Error('Bad payload!');
                })
                .catch(err => {
                  throw err;
                })
        } else {
          return response.json();
        }
      })
      .then((payload) => {
        navigate('/');
      })
      .catch(error => {
        notification.error({ message: `Error fetching product : ${error.message}` });
      });
  };

  return (
    <div className="main-container">
      <div className='main-container__main-content'>
        <div className='main-container__main-content__header'>
          <Link to={`/`}>
            Return to Listing
          </Link>
          <h1>Add Product</h1>
        </div>

        {
          apiErrors && (
            <ul>
              {
                apiErrors.map(err => (
                  <li>
                    { err && err.message }
                  </li>
                ))
              }
            </ul>
          )
        }

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{}}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input a name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                min: 5,
                message: 'Please input a description!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                pattern: /^\$?\d+(,\d{3})*(\.\d*)?$/,
                message: 'Please input a price!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductView;
