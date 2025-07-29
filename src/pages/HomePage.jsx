import { signOut } from 'firebase/auth';
import { auth, db } from '../configs/firebase';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(), // =>  object { name, imageUrl, price }
      };
      /*
        {
          id: 1asdada,
          imageUrl: dsdsaad,
          name: dsadsadsad,
          price: 08392103281

        }
      */
    });
    setProducts(result);
  }

  async function deleteProduct(id) {
    try {
      await deleteDoc(doc(db, 'products', id));
      console.log('Successfully delete product with id ', id);
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <main>
        <h1>Product List</h1>
        <button onClick={() => navigate('/products/add')}>Add Product</button>
        <table border="1">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          {products?.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>
                <img width="100px" src={p.imageUrl} alt={p.name} />
              </td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => navigate(`/products/edit/${p.id}`)}>
                  Edit
                </button>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </main>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
