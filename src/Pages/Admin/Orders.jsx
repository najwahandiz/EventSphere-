
import React, { useEffect, useState } from 'react';

// Example: Replace with your real API or data source
// For now, we use a placeholder fetch from /orders (update as needed)
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders from API or db.json
    // Replace this with your real fetch logic
    fetch('/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="orders-page" style={{ padding: '2rem' }}>
      <h2>Liste des Commandes</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nom Client</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Événement</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Quantité</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Total</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.customerName}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.eventTitle}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.quantity}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.total} MAD</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
