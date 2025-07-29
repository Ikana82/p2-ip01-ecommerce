import { collection, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../configs/firebase.js';
import { useNavigate } from 'react-router';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: name,
        imageUrl: imageUrl,
        price: price,
      });
      console.log(docRef);
      console.log('Successfully created a product ', name);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      <h1>Add Product</h1>
      <form onSubmit={submitProduct} action="">
        <div>
          <label htmlFor="">Product Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Image URL</label>
          <br />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}
