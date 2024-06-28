import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "../styles/sellerform.scss"

interface FormValues {
  name: string;
  price: number;
  bonus?:number;
  collection: string;
  category: string;
  quantity:number;
  expiryDate: Date;
  images:any;
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(15)
    .required('Name is required'),
  price: Yup.number()
  .typeError('price must be a number')
    .positive("price must be a positive number")
    .required("Price is required"),
  collection: Yup.string()
    .required('Collection is required'),
  quantity:Yup.number().required("items quantity is required").positive('quantity must be  a positive number')
  .typeError('Quantity must be  number'),
  category: Yup.string()
    .required('Category is required'),
  expiryDate: Yup.date()
     .typeError('Must be a valid date')
    .min(new Date())
    .required('Expiration date is required'),
  bonus:Yup.number().positive('bonus must be a positive number')
  .typeError('Bonus must be a number'),
  images:Yup.mixed().required("Images are requires")

});

const SellerForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="add-product-form-container">
      <h2>Create a product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formControl">
          <label htmlFor="name">Name:</label>
          <input type="text" {...register('name')} id="name" placeholder='Name..'/>
          <p>{errors.name?.message}</p>
        </div>
        <div className="two-columns">
          <div className="formControl">
            <label htmlFor="price">Price:</label>
            <input type="number" {...register('price')} id="price"  placeholder='Price..'/>
            <p>{errors.price?.message}</p>
          </div>
          <div className="formControl">
            <label htmlFor="collection">Collection:</label>
            <select  id="collection" { ...register('collection')}>
              <option value="">Collection...</option>
              <option value="Phone">1 collection</option>
              <option value="Clothes">2 collection</option>
            </select>
            <p>{errors.collection?.message}</p>
          </div>
        </div>
      
        <div className="two-columns">
          <div className="formControl">
            <label htmlFor="quantity">Quantiy:</label>
            <input type="number" {...register('quantity')} id="quantity"  placeholder='Quantity'/>
            <p>{errors.quantity?.message}</p>
          </div>
          <div className="formControl">
            <label htmlFor="category">Category:</label>
            <select  id="category" {...register('category')}>
              <option value="">Category...</option>
              <option value="phone">phones</option>
              <option value="clothes">clothes</option>
            </select>
            <p>{errors.category?.message}</p>
          </div>
        </div>
        <div className="two-columns">
          <div className="formControl">
            <label htmlFor="bonus">Bonus:</label>
            <input type="number" {...register('bonus')} id="bonus"  placeholder='Bonus..'/>
            <p>{errors.bonus?.message}</p>
          </div>
          <div className="formControl">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="date" {...register('expiryDate')} id="expiryDate"  placeholder='Expiry date..'/>
            <p>{errors.expiryDate?.message}</p>
          </div>
        </div>
        <div className="formControl">
            <label htmlFor="expiryDate">Images:</label>
            <input type="file" {...register('images')} id="images"  placeholder='Images..'/>
            {/* <p>{errors.images?.message}</p> */}
          </div>
        
       <div className="btn"><button type="submit">Create Product</button></div>
      </form>
    </div>
  );
}

export default SellerForm;
