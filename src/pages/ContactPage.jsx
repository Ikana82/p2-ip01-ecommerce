import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ContactPage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>Contact page side</div>
    </>
  );
}
