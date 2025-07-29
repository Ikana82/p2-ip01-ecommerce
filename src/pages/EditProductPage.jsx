import { collection, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../configs/firebase.js';
import { useNavigate, useParams } from 'react-router';

export default function EditProductPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  async function editProduct(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        name: name,
        imageUrl: imageUrl,
        price: price,
      });

      console.log('Successfully edit product with id', id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getProductById(idProduct) {
      try {
        const docRef = doc(db, 'products', idProduct);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setImageUrl(docSnap.data().imageUrl);
          setPrice(docSnap.data().price);
        } else {
          console.log('Product not found!');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductById(id);
  }, []);
  return (
    <>
      <h1>Edit Product</h1>
      <form onSubmit={editProduct} action="">
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
