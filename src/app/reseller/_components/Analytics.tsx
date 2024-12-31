"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar, ChevronDown, Clock } from 'lucide-react'

// Datos de ejemplo para el gráfico
const data = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}h`,
  'acme-site': Math.floor(Math.random() * 50000) + 30000,
  'acme-labs': Math.floor(Math.random() * 30000) + 20000,
  'acme-api': Math.floor(Math.random() * 20000) + 10000,
  'acme-docs': Math.floor(Math.random() * 10000) + 5000,
}))

const projects = [
  { name: 'acme-site', color: '#c084fc', requests: '1,234,324' },
  { name: 'acme-labs', color: '#86efac', requests: '900,232' },
  { name: 'acme-api', color: '#93c5fd', requests: '654,765' },
  { name: 'acme-docs', color: '#fdba74', requests: '432,123' },
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState('3d')

  return (
    <div className="min-h-screen  text-black p-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-normal">Request by Project</CardTitle>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="outline" className="bg-gray-800 border-gray-700">
              <ChevronDown className="h-4 w-4 mr-2" />
              Edit Query
            </Button>
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="3d">Last 3 days</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-gray-800 border-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              2/19 11:51AM - 2/22 11:51 AM
            </Button>
            <Button variant="outline" className="bg-gray-800 border-gray-700">
              <Clock className="h-4 w-4 mr-2" />
              1 hour
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#333' }}
                />
                <YAxis 
                  stroke="#666" 
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#333' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Bar dataKey="acme-site" stackId="a" fill="#c084fc" />
                <Bar dataKey="acme-labs" stackId="a" fill="#86efac" />
                <Bar dataKey="acme-api" stackId="a" fill="#93c5fd" />
                <Bar dataKey="acme-docs" stackId="a" fill="#fdba74" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            {projects.map((project) => (
              <div key={project.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-gray-400">{project.name}</span>
                </div>
                <span className="text-gray-400">{project.requests}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

