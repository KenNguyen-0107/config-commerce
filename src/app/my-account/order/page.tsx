"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Link from "next/link"

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(8)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Sample order data - expanded to 20 items
  const orders = [
    {
      orderNumber: "WEB0001230",
      date: "02/22/2025",
      total: "£129.10",
      status: "Confirmed",
      shipTo: "Address 1 London Greater",
      poNumber: "321",
    },
    {
      orderNumber: "WEB0002145",
      date: "01/15/2025",
      total: "£245.75",
      status: "Shipped",
      shipTo: "Address 2 Manchester",
      poNumber: "PO-567",
    },
    {
      orderNumber: "WEB0003789",
      date: "12/05/2024",
      total: "£78.50",
      status: "Delivered",
      shipTo: "Address 3 Birmingham",
      poNumber: "PO-890",
    },
    {
      orderNumber: "WEB0004321",
      date: "11/30/2024",
      total: "£352.25",
      status: "Processing",
      shipTo: "Address 4 Liverpool",
      poNumber: "PO-123",
    },
    {
      orderNumber: "WEB0005432",
      date: "10/25/2024",
      total: "£189.99",
      status: "Delivered",
      shipTo: "Address 5 Edinburgh",
      poNumber: "PO-456",
    },
    {
      orderNumber: "WEB0006543",
      date: "09/18/2024",
      total: "£67.25",
      status: "Confirmed",
      shipTo: "Address 6 Glasgow",
      poNumber: "PO-789",
    },
    {
      orderNumber: "WEB0007654",
      date: "08/12/2024",
      total: "£425.00",
      status: "Shipped",
      shipTo: "Address 7 Cardiff",
      poNumber: "PO-234",
    },
    {
      orderNumber: "WEB0008765",
      date: "07/30/2024",
      total: "£112.50",
      status: "Processing",
      shipTo: "Address 8 Belfast",
      poNumber: "PO-567",
    },
    {
      orderNumber: "WEB0009876",
      date: "06/22/2024",
      total: "£299.99",
      status: "Delivered",
      shipTo: "Address 9 Leeds",
      poNumber: "PO-890",
    },
    {
      orderNumber: "WEB0010987",
      date: "05/15/2024",
      total: "£149.50",
      status: "Confirmed",
      shipTo: "Address 10 Sheffield",
      poNumber: "PO-123",
    },
    {
      orderNumber: "WEB0011098",
      date: "04/10/2024",
      total: "£89.99",
      status: "Shipped",
      shipTo: "Address 11 Newcastle",
      poNumber: "PO-456",
    },
    {
      orderNumber: "WEB0012109",
      date: "03/28/2024",
      total: "£199.50",
      status: "Processing",
      shipTo: "Address 12 Bristol",
      poNumber: "PO-789",
    },
    {
      orderNumber: "WEB0013210",
      date: "02/14/2024",
      total: "£59.99",
      status: "Delivered",
      shipTo: "Address 13 Oxford",
      poNumber: "PO-234",
    },
    {
      orderNumber: "WEB0014321",
      date: "01/05/2024",
      total: "£399.99",
      status: "Confirmed",
      shipTo: "Address 14 Cambridge",
      poNumber: "PO-567",
    },
    {
      orderNumber: "WEB0015432",
      date: "12/20/2023",
      total: "£149.99",
      status: "Shipped",
      shipTo: "Address 15 Southampton",
      poNumber: "PO-890",
    },
    {
      orderNumber: "WEB0016543",
      date: "11/15/2023",
      total: "£79.50",
      status: "Processing",
      shipTo: "Address 16 Portsmouth",
      poNumber: "PO-123",
    },
    {
      orderNumber: "WEB0017654",
      date: "10/10/2023",
      total: "£249.99",
      status: "Delivered",
      shipTo: "Address 17 Leicester",
      poNumber: "PO-456",
    },
    {
      orderNumber: "WEB0018765",
      date: "09/05/2023",
      total: "£129.99",
      status: "Confirmed",
      shipTo: "Address 18 Nottingham",
      poNumber: "PO-789",
    },
    {
      orderNumber: "WEB0019876",
      date: "08/22/2023",
      total: "£89.50",
      status: "Shipped",
      shipTo: "Address 19 Hull",
      poNumber: "PO-234",
    },
    {
      orderNumber: "WEB0020987",
      date: "07/15/2023",
      total: "£179.99",
      status: "Processing",
      shipTo: "Address 20 Plymouth",
      poNumber: "PO-567",
    },
  ]

  // Sort and paginate orders
  const sortedAndPaginatedOrders = useMemo(() => {
    // First sort the orders
    const sorted = [...orders].sort((a, b) => {
      let comparison = 0

      if (sortColumn === "date") {
        // Parse dates in MM/DD/YYYY format
        const [monthA, dayA, yearA] = a.date.split("/")
        const [monthB, dayB, yearB] = b.date.split("/")

        // Create date objects (year, month-1, day)
        const dateA = new Date(Number.parseInt(yearA), Number.parseInt(monthA) - 1, Number.parseInt(dayA))
        const dateB = new Date(Number.parseInt(yearB), Number.parseInt(monthB) - 1, Number.parseInt(dayB))

        comparison = dateA.getTime() - dateB.getTime()
      } else if (sortColumn === "total") {
        // Remove currency symbol and convert to number
        const totalA = Number.parseFloat(a.total.replace("£", ""))
        const totalB = Number.parseFloat(b.total.replace("£", ""))
        comparison = totalA - totalB
      } else if (sortColumn === "poNumber") {
        // String comparison for PO numbers
        comparison = a.poNumber.localeCompare(b.poNumber)
      }

      // Reverse the comparison if sorting in descending order
      return sortDirection === "asc" ? comparison : -comparison
    })

    // Then paginate
    const startIndex = (currentPage - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    return sorted.slice(startIndex, endIndex)
  }, [orders, sortColumn, sortDirection, currentPage, resultsPerPage])

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / resultsPerPage)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to descending
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleResultsPerPageChange = (value: number) => {
    setResultsPerPage(value)
    // Reset to first page when changing results per page
    setCurrentPage(1)
    setIsDropdownOpen(false)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-duck text-4xl font-bold mb-2">ORDER HISTORY</div>
            <p className="text-duck text-xl font-medium">{orders.length} ORDERS</p>
          </div>
          <button className="text-duck">
            <Filter size={24} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-secondary-background rounded-t-md">
          {/* Table Header */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-4 text-left">
                  <div className="flex items-center">
                    <span className="text-duck font-bold">ORDER#</span>
                    <div className="ml-2 text-duck">
                      <ChevronUp size={16} className="mb-[-5px]" />
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </th>
                <th className="px-4 py-4 text-left md:table-cell">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("date")}>
                    <span className="text-duck font-bold">DATE</span>
                    <div className="ml-2 text-duck">
                      {sortColumn === "date" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-4 py-4 text-left">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("total")}>
                    <span className="text-duck font-bold">TOTAL</span>
                    <div className="ml-2 text-duck hidden md:block">
                      {sortColumn === "total" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      ) : (
                        <>
                          <ChevronUp size={16} className="mb-[-5px]" />
                          <ChevronDown size={16} />
                        </>
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-4 py-4 text-left hidden md:table-cell">
                  <div className="flex items-center">
                    <span className="text-duck font-bold">STATUS</span>
                    <div className="ml-2 text-duck">
                      <ChevronUp size={16} className="mb-[-5px]" />
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </th>
                <th className="px-4 py-4 text-left hidden md:table-cell">
                  <div className="flex items-center">
                    <span className="text-duck font-bold">SHIP TO/PICK UP</span>
                    <div className="ml-2 text-duck">
                      <ChevronUp size={16} className="mb-[-5px]" />
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </th>
                <th className="px-4 py-4 text-left hidden md:table-cell">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("poNumber")}>
                    <span className="text-duck font-bold">PO#</span>
                    <div className="ml-2 text-duck">
                      {sortColumn === "poNumber" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      ) : (
                        <>
                          <ChevronUp size={16} className="mb-[-5px]" />
                          <ChevronDown size={16} />
                        </>
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-4 py-4 text-right hidden md:table-cell"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedAndPaginatedOrders.map((order, index) => (
                <Link key={index} href={`/my-account/order/${index}`}>
                   <tr className="border-b border-gray-200">
                  <td className="px-4 py-4 text-left">
                    <span className="font-lora text-tertiary text-sm lg:text-base">{order.orderNumber}</span>
                  </td>
                  <td className="px-4 py-4 text-left md:table-cell">
                    <span className="font-lora text-tertiary text-sm lg:text-base">{order.date}</span>
                  </td>
                  <td className="px-4 py-4 text-left">
                    <span className="font-lora text-tertiary text-sm lg:text-base">{order.total}</span>
                  </td>
                  <td className="px-4 py-4 text-left hidden md:table-cell">
                    <span className="font-lora text-tertiary text-sm lg:text-base">{order.status}</span>
                  </td>
                  <td className="px-4 py-4 text-left hidden md:table-cell">
                    <span className="font-lora text-tertiary text-sm lg:text-base">{order.shipTo}</span>
                  </td>
                  <td className="px-4 py-4 text-left hidden md:table-cell">
                    <span className="font-lora text-tertiary text-sm lg:text-base">{order.poNumber}</span>
                  </td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    <button className="bg-duck text-white font-bold py-2 px-6">RE-ORDER</button>
                  </td>
                </tr>
                </Link>
             
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 mb-4">
          <div className="flex items-center mb-4 md:mb-0 order-2 md:order-1">
            <span className="text-gray-700 font-lora text-tertiary text-sm lg:text-base mr-4">Results per page</span>
            <div className="relative">
              <button
                className="border border-gray-300 rounded px-4 py-2 flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="mr-2 font-lora text-tertiary text-sm lg:text-base">{resultsPerPage}</span>
                <ChevronDown size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                  {[4, 8, 12, 16].map((num) => (
                    <button
                      key={num}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleResultsPerPageChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center order-1 md:order-2">
            <button className="mx-1 text-duck" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              <ChevronsLeft size={24} />
            </button>
            <button
              className="mx-1 text-duck"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show current page, first page, last page, and pages around current
                return page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)
              })
              .map((page, index, array) => {
                // Add ellipsis if there are gaps
                const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1
                const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1

                return (
                  <div key={page} className="flex items-center">
                    {showEllipsisBefore && <span className="mx-1">...</span>}
                    <button
                      className={`mx-1 w-10 h-10 flex items-center justify-center ${
                        currentPage === page ? "bg-duck text-white" : "text-duck"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                    {showEllipsisAfter && <span className="mx-1">...</span>}
                  </div>
                )
              })}

            <button
              className="mx-1 text-duck"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={24} />
            </button>
            <button
              className="mx-1 text-duck"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

