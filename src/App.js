import React, { useState, useEffect } from "react";
import { API_URL } from "./config";

function App() {
  const [logs, setLogs] = useState(0);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLogs(currentPage, searchTerm, startDate, endDate, logsPerPage);
    }, 100);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentPage, searchTerm, startDate, endDate, logsPerPage]);

  const fetchLogs = async (
    currentPage,
    searchTerm,
    startDate,
    endDate,
    logsPerPage
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/filter-logs?search=${searchTerm}&start_date=${startDate}&end_date=${endDate}&page=${currentPage}&per_page=${logsPerPage}`
      );
      const data = await response.json();
      setLogs(data.total);
      setFilteredLogs(data.rows);
    } catch (error) {
      console.log(error);
      setLogs(0);
      setFilteredLogs([]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/*
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Text
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search transcripts, phone numbers, labels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        */}
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No logs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or date range.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
                <table className="rounded-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <caption className="rounded-t-lg p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <Pagination
                      totalCounts={logs}
                      currentPageCount={filteredLogs.length}
                      currentPage={currentPage}
                      logsPerPage={logsPerPage}
                      totalPages={Math.ceil(logs / logsPerPage)}
                      onPageChange={setCurrentPage}
                    />
                  </caption>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-1 py-3"></th>
                      <th scope="col" className="px-1 py-3"></th>
                      <th scope="col" className="px-1 py-3"></th>
                      <th scope="col" className="px-1 py-3">
                        Transcript
                      </th>
                      <th scope="col" className="px-1 py-3">
                        Audio
                      </th>
                      <th scope="col" className="pl-1 pr-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      >
                        <td className="pl-6 pr-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </td>
                        <td className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white space-y-1">
                          <p>
                            {log.phone_number ? log.phone_number : "No Phone"}
                          </p>
                          <p>{log.call_uuid}</p>
                        </td>
                        <td className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white space-y-1">
                          <p className="px-2 border border-gray-500 rounded-full text-center">
                            {log.direction}
                          </p>
                          <p className="px-2 border border-gray-500 rounded-full text-center">
                            {log.label === "unknown" ? "Human" : log.label}
                          </p>
                        </td>
                        <td className="px-1 py-4 font-medium text-gray-900 dark:text-white">
                          {log.transcript}
                        </td>
                        <td className="px-1 py-4 font-medium text-gray-900 dark:text-white min-w-24">
                          {log.audio_file ? log.audio_file : "No Audio File"}
                        </td>
                        <td className="pl-1 pr-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          <p>{new Date(log.timestamp).toLocaleDateString()}</p>
                          <p>{new Date(log.timestamp).toLocaleTimeString()}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalCounts,
  currentPageCount,
  logsPerPage,
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-center space-x-2 py-6">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {`<<`}
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {`<`}
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              page === "..."
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {`>`}
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {`>>`}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing{" "}
          {currentPageCount === 0 ? 0 : (currentPage - 1) * logsPerPage + 1}-
          {(currentPage - 1) * logsPerPage + currentPageCount} of {totalCounts}{" "}
          logs
          {currentPageCount > 0 && (
            <span className="ml-2 text-gray-500">
              (Page {currentPage} of {Math.ceil(totalCounts / logsPerPage)})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
