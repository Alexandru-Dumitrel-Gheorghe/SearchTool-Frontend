// src/components/AdvancedSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import classes from './AdvancedSearch.module.css';

function AdvancedSearch() {
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const [searchTerm, setSearchTerm] = useState('');
  const [hasPDF, setHasPDF] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/produkte`, {
        params: { searchTerm, hasPDF, sort, order, page, limit }
      });
      setResults(data.produkte);
      setTotalCount(data.totalCount);
      toast.success('Search completed!');
    } catch (error) {
      console.error(error);
      toast.error('Error searching products');
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    } else if (direction === 'next' && page * limit < totalCount) {
      setPage(page + 1);
    }
  };

  return (
    <div className={classes.advancedSearchContainer}>
      <h3>Advanced Search</h3>
      <div className={classes.filters}>
        <input
          type="text"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={hasPDF} onChange={(e) => setHasPDF(e.target.value)}>
          <option value="">All</option>
          <option value="true">Has PDF</option>
          <option value="false">No PDF</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="createdAt">Date Created</option>
          <option value="artikelnummer">Product Number</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={5}>Limit 5</option>
          <option value={10}>Limit 10</option>
          <option value={20}>Limit 20</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className={classes.results}>
        <p>
          Found {totalCount} products. Page {page} of {Math.ceil(totalCount / limit)}.
        </p>
        <ul>
          {results.map((prod) => (
            <li key={prod._id}>
              <strong>{prod.artikelnummer}</strong> - {prod.beschreibung}
              {prod.pdfPfad && (
                <a href={prod.pdfPfad} target="_blank" rel="noreferrer">
                  View PDF
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className={classes.pagination}>
          <button onClick={() => handlePageChange('prev')} disabled={page <= 1}>
            Prev
          </button>
          <button onClick={() => handlePageChange('next')} disabled={page * limit >= totalCount}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
