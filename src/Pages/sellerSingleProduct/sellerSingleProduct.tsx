import React, { ChangeEvent, useEffect, useState } from 'react';
import './sellerSingleProduct.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getProductByIdAction, updateProductAction, deleteImage, clearMessages } from '../../redux/slices/productDahSlice';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Toast from '../../components/Toast/Toast';

interface FormValues {
  name: string;
  price: number;
  discount: number;
  quantity: number;
}

const SingleProduct: React.FC = () => {
  return <SellerForm />;
};
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, 'Name cannot exceed 15 characters')
    .required('Name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .required('Price is required'),
  quantity: Yup.number()
    .required('Items quantity is required')
    .positive('Quantity must be a positive number')
    .typeError('Quantity must be a number'),
  discount: Yup.number().default(0)
});

const SellerForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: any }>();
  const product = useSelector((state: RootState) => state.product.product.data);
  const { loading, successMessage, errorMessage } = useSelector((state: RootState) => state.product);
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<Blob[] | any>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputColors, setInputColors] = useState<{ [key: string]: string }>({
    name: 'black',
    price: 'black',
    discount: 'black',
    category: 'black',
    quantity: 'black'
  });
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    price: 0,
    discount: 0,
    quantity: 0
  });

  useEffect(() => {
    if (id) {
      const productId = id;
  
        dispatch(getProductByIdAction(productId))
          .unwrap()
          .then((res) => {
            console.log(res)
            setValue('name', product.name);
            setValue('price', product.price);
            setValue('discount', product.discount);
            setValue('quantity', product.quantity);
            setImages(product.images);
            setFormValues({
              name: product.name,
              price: product.price,
              discount: product.discount,
              quantity: product.quantity
            });
            setInputColors({
              name: 'black',
              price: 'black',
              discount: 'black',
              category: 'black',
              quantity: 'black'
            });
          })
          .catch((err) => console.log(err));

    }
  }, [dispatch, id, setValue ]);

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('discount', product.discount);
      setValue('quantity', product.quantity);
      setImages(product.images);
      setFormValues({
        name: product.name,
        price: product.price,
        discount: product.discount,
        quantity: product.quantity
      });
      setInputColors({
        name: 'black',
        price: 'black',
        discount: 'black',
        category: 'black',
        quantity: 'black'
      });
    }
  }, [product, setValue]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleUpdate = (data: FormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('discount', data.discount.toString());
    formData.append('quantity', data.quantity.toString());

    Array.from(files).forEach((file: any) => {
      formData.append('images', file);
    });

    dispatch(updateProductAction({ id: product.productId, data: formData }))
      .then(() => {
        dispatch(getProductByIdAction(product.productId))
          .then(() => {
            setFormValues({
              name: product.name,
              price: product.price,
              discount: product.discount,
              quantity: product.quantity
            });
            setInputColors({
              name: 'black',
              price: 'black',
              discount: 'black',
              category: 'black',
              quantity: 'black'
            });
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    handleUpdate(data);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDelete = (index: number) => {
      const imageToDelete = images[index];
      setImages(images.filter((_, i) => i !== index));
      setImagesToDelete([...imagesToDelete, imageToDelete]);
      dispatch(deleteImage({ productId: product.productId, images: imageToDelete }))
        .catch((err) => console.log(err));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: name === 'price' || name === 'discount' || name === 'quantity' ? Number(value) : value
    });

    // Change the color based on the value
    setInputColors({
      ...inputColors,
      [name]: value === '' ? 'black' : isNaN(Number(value)) ? 'orange' : 'orange'
    });
  };

  return (
    <div className="add-product-form-container">
      <div>
      <div className="imagepage">
            <div className="carousel">
              <div
                className="carousel-inner"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div
                    className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                    key={index}
                  >
                    <img src={image} alt={`Slide ${index + 1}`} />
                    <div className="carousel-number">{index + 1}/{images.length}</div>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-button prev" onClick={handlePrev}>⟨</button>
            <button className="carousel-button next" onClick={handleNext}>⟩</button>
          </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-and-image-container">
          <div className='right-section'>
            <h2>Single Product Page</h2>
            <div className="product-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                {...register('name')}
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder='Name..'
                style={{ color: inputColors.name }}
              />
              <p>{errors.name?.message}</p>
            </div>
            <div className="product-field">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                {...register('price')}
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                placeholder='Price..'
                style={{ color: inputColors.price }}
              />
              <p>{errors.price?.message}</p>
            </div>
            <div className="product-field">
              <label htmlFor="discount">Discount:</label>
              <input
                type="number"
                {...register('discount')}
                id="discount"
                name="discount"
                value={formValues.discount}
                onChange={handleChange}
                placeholder='Discount..'
                style={{ color: inputColors.discount }}
              />
              <p>{errors.discount?.message}</p>
            </div>
            <div className="product-field">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                {...register('quantity')}
                id="quantity"
                name="quantity"
                value={formValues.quantity}
                onChange={handleChange}
                placeholder='Quantity..'
                style={{ color: inputColors.quantity }}
              />
              <p>{errors.quantity?.message}</p>
            </div>
            <div className="product-field">
              <label htmlFor="images">Images:</label>
              <input multiple type="file" onChange={(e) => setFiles(e.target.files)} id="images" placeholder='Images..'/>
            </div>
            <div className="btn">
              <button type="submit">Update Product</button>
            </div>
          </div>
        </div>
      </form>
      {loading && <Spinner />}
      {!loading && errorMessage && <Toast messageType={"error"} message={errorMessage} />}
      {!loading && successMessage && <Toast messageType={"success"} message={successMessage} />}
    </div>
  );
};

export default SingleProduct;

