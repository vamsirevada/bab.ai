'use client'

import { useMemo } from 'react'
import { CreditCard, Wallet, Activity, Package } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'

export default function DashboardPage() {
  // Placeholder demo data; in a real app fetch from your APIs/db
  const data = useMemo(
    () => ({
      creditEligible: 750000, // INR
      creditAvailed: 210000, // INR
      transactions: [
        {
          id: 'TXN-0041',
          type: 'Drawdown',
          amount: 80000,
          date: '2025-07-02',
          status: 'Settled',
        },
        {
          id: 'TXN-0040',
          type: 'Repayment',
          amount: 25000,
          date: '2025-06-20',
          status: 'Settled',
        },
        {
          id: 'TXN-0039',
          type: 'Drawdown',
          amount: 50000,
          date: '2025-06-14',
          status: 'Settled',
        },
        {
          id: 'TXN-0038',
          type: 'Repayment',
          amount: 20000,
          date: '2025-06-01',
          status: 'Settled',
        },
      ],
      orders: [
        {
          id: 'ORD-1027',
          vendor: 'Acme Industrial',
          amount: 120000,
          date: '2025-07-08',
          status: 'Delivered',
        },
        {
          id: 'ORD-1026',
          vendor: 'Delta Supplies',
          amount: 85000,
          date: '2025-06-18',
          status: 'Shipped',
        },
        {
          id: 'ORD-1025',
          vendor: 'Omni Tools',
          amount: 45000,
          date: '2025-06-03',
          status: 'Completed',
        },
      ],
    }),
    []
  )

  const utilizationPct = Math.min(
    100,
    Math.round((data.creditAvailed / Math.max(1, data.creditEligible)) * 100)
  )

  const formatINR = (n) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <main className="relative z-10">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Your credit insights, activity, and orders at a glance
            </p>
          </div>

          {/* Top KPI cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Eligible Limit
                  </p>
                  <p className="text-xl font-semibold text-brand-dark">
                    {formatINR(data.creditEligible)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Wallet size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Availed Credit
                  </p>
                  <p className="text-xl font-semibold text-brand-dark">
                    {formatINR(data.creditAvailed)}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-blue-600"
                    style={{ width: `${utilizationPct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Utilization: {utilizationPct}%
                </p>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Active Transactions
                  </p>
                  <p className="text-xl font-semibold text-brand-dark">
                    {
                      data.transactions.filter((t) => t.status !== 'Settled')
                        .length
                    }
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Open Orders
                  </p>
                  <p className="text-xl font-semibold text-brand-dark">
                    {
                      data.orders.filter((o) =>
                        ['Shipped', 'Processing'].includes(o.status)
                      ).length
                    }
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Transactions and Orders */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transactions */}
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-brand-dark">
                  Recent Transactions
                </h2>
                <span className="text-xs text-gray-500">Last 30 days</span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 pr-4 font-medium">ID</th>
                      <th className="py-2 pr-4 font-medium">Type</th>
                      <th className="py-2 pr-4 font-medium">Amount</th>
                      <th className="py-2 pr-4 font-medium">Date</th>
                      <th className="py-2 pr-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.transactions.map((t) => (
                      <tr key={t.id} className="text-gray-800">
                        <td className="py-2 pr-4">{t.id}</td>
                        <td className="py-2 pr-4">{t.type}</td>
                        <td className="py-2 pr-4">{formatINR(t.amount)}</td>
                        <td className="py-2 pr-4">{t.date}</td>
                        <td className="py-2 pr-4">
                          <Badge
                            variant={
                              t.status === 'Settled' ? 'success' : 'warning'
                            }
                          >
                            {t.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Orders */}
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-brand-dark">
                  Past Orders
                </h2>
                <span className="text-xs text-gray-500">Recent</span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 pr-4 font-medium">Order</th>
                      <th className="py-2 pr-4 font-medium">Vendor</th>
                      <th className="py-2 pr-4 font-medium">Amount</th>
                      <th className="py-2 pr-4 font-medium">Date</th>
                      <th className="py-2 pr-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.orders.map((o) => (
                      <tr key={o.id} className="text-gray-800">
                        <td className="py-2 pr-4">{o.id}</td>
                        <td className="py-2 pr-4">{o.vendor}</td>
                        <td className="py-2 pr-4">{formatINR(o.amount)}</td>
                        <td className="py-2 pr-4">{o.date}</td>
                        <td className="py-2 pr-4">
                          <Badge
                            variant={
                              ['Delivered', 'Completed'].includes(o.status)
                                ? 'success'
                                : 'info'
                            }
                          >
                            {o.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/orders/review-order">Place New Order</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/onboarding/credit">Re-check Credit Eligibility</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
