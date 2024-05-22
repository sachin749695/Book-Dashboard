// src/components/BooksTable.js

import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { fetchBooks } from '../services/apiService';
import './Books.css'; // Import CSS file

const BooksTable = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData(1, pageSize, searchQuery);
    }, [pageSize, searchQuery]);

    const loadData = async (page, limit, query) => {
        const result = await fetchBooks(page, limit, query);
        setData(result.docs);
        setPageCount(Math.ceil(result.numFound / limit));
    };

    const handleSearch = () => {
        loadData(1, pageSize, searchQuery);
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Title', accessor: 'title' },
            { Header: 'Author Name', accessor: 'author_name[0]' },
            { Header: 'First Publish Year', accessor: 'first_publish_year' },
            { Header: 'Subject', accessor: 'subject[0]' },
            { Header: 'Author Birth Date', accessor: 'author_birth_date' },
            { Header: 'Author Top Work', accessor: 'author_top_work' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount: controlledPageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize: setPageSizeTable,
        state: { pageIndex }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="books-table-container"> {/* Apply container class */}
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by author"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table {...getTableProps()} className="books-table"> {/* Apply table class */}
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSizeTable(Number(e.target.value));
                    }}
                >
                    {[10, 20, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default BooksTable;
