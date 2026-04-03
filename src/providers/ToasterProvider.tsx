import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#1f2937',
          color: '#fff',
          borderRadius: '10px',
        },
      }}
    />
  );
}
