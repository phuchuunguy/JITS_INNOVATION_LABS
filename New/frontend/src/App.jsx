import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [products, setProducts] = useState([]);       
  const [searchTerm, setSearchTerm] = useState("");    
  const [currentPage, setCurrentPage] = useState(1);   
  const itemsPerPage = 5; 

  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });                             

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:1337/product'); 
    const data = await res.json();
    setProducts(data); 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddProduct = async () => {
    await fetch('http://localhost:1337/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });
    setNewProduct({ name: '', price: '', description: '' });
    fetchProducts();   
    setCurrentPage(1); 
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:1337/product/${id}`, {
      method: 'DELETE'
    });
    fetchProducts();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Quản lý sản phẩm</h1>

      {/* Tìm kiếm */}
      <input 
        type="text"
        className="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {/* Thêm sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 rounded-md"
          placeholder="Giá"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Mô tả"
          value={newProduct.description}
          onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleAddProduct}
      >
        ➕ Thêm sản phẩm
      </button>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 gap-4 mt-8">
        {paginatedProducts.map(prod => (
          <div key={prod.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
            <h3 className="font-semibold text-lg text-blue-800">{prod.name}</h3>
            <p className="text-gray-700">Giá: {Number(prod.price).toLocaleString()} VNĐ</p>
            <p className="text-sm text-gray-500 italic">{prod.description}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => alert('Chức năng sửa chưa triển khai')}
              >
                ✏️ Sửa
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(prod.id)}
              >
                🗑️ Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅️ Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`px-3 py-1 border rounded ${currentPage === num ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sau ➡️
        </button>
      </div>
    </div>
  );
}

export default App;
