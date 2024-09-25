import React, { useState, useEffect } from 'react'
import Header from './Header'
import WelcomeSlider from './WelcomeSlider'
import Map from './Map'
import Filters from './Filters'
import Legend from './Legend'
import PriceHistory from './PriceHistory'
import Cards from './Cards'
import QuoteVault from './QuoteVault'
import UploadQuoteButton from './UploadQuoteButton'
import FindInstallerButton from './FindInstallerButton'
import QuoteInfoOverlay from './QuoteInfoOverlay'
import QuoteImageModal from './QuoteImageModal'
import UploadQuoteModal from './UploadQuoteModal'
import FindInstallerModal from './FindInstallerModal'
import Footer from './Footer'

export interface Quote {
  id: number
  service: string
  company: string
  price: number
  saleTeamRating: number
  installationTeamRating: number
  cleanlinessRating: number
  overallRating: number
  lat: number
  lng: number
  date: Date
  quoteCreationDate: Date
  validityPeriod: number
}

export default function App() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filters, setFilters] = useState({
    service: 'all',
    price: 'all',
    rating: 'all',
  })
  const [showQuoteInfo, setShowQuoteInfo] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showInstallerModal, setShowInstallerModal] = useState(false)

  useEffect(() => {
    // Generate initial random quotes
    setQuotes(generateRandomQuotes(50))
  }, [])

  const addQuote = (quote: Quote) => {
    setQuotes(prevQuotes => [...prevQuotes, quote])
  }

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-4 pb-24">
        <WelcomeSlider />
        <Map quotes={quotes} filters={filters} onMarkerClick={(quote) => {
          setSelectedQuote(quote)
          setShowQuoteInfo(true)
        }} />
        <Filters filters={filters} updateFilters={updateFilters} />
        <Legend />
        <PriceHistory quotes={quotes} />
        <Cards />
        <QuoteVault quotes={quotes} />
        <UploadQuoteButton onClick={() => setShowUploadModal(true)} />
        <FindInstallerButton onClick={() => setShowInstallerModal(true)} />
      </main>
      <QuoteInfoOverlay
        show={showQuoteInfo}
        quote={selectedQuote}
        onClose={() => setShowQuoteInfo(false)}
      />
      <QuoteImageModal />
      <UploadQuoteModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={addQuote}
      />
      <FindInstallerModal
        show={showInstallerModal}
        onClose={() => setShowInstallerModal(false)}
      />
      <Footer />
    </div>
  )
}

function generateRandomQuotes(count: number): Quote[] {
  const services = ['Hot Water Heat Pumps', 'Solar Installation', 'Home Battery Installations', 'Reverse Cycle Split System Installations']
  const companies = ['SolarTech', 'EcoEnergy', 'GreenPower', 'SustainableSolutions', 'EnergyWise']
  
  return Array.from({ length: count }, (_, i) => {
    const service = services[Math.floor(Math.random() * services.length)]
    const company = companies[Math.floor(Math.random() * companies.length)]
    const price = Math.floor(Math.random() * 15000) + 1000
    const saleTeamRating = Math.floor(Math.random() * 10) + 1
    const installationTeamRating = Math.floor(Math.random() * 10) + 1
    const cleanlinessRating = Math.floor(Math.random() * 10) + 1
    const overallRating = ((saleTeamRating + installationTeamRating + cleanlinessRating) / 3) / 2
    const lat = -37.8136 + (Math.random() - 0.5) * 0.5
    const lng = 144.9631 + (Math.random() - 0.5) * 0.5
    const date = new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000))
    const quoteCreationDate = new Date(date.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
    const validityPeriod = Math.floor(Math.random() * 30) + 1

    return {
      id: i + 1,
      service,
      company,
      price,
      saleTeamRating,
      installationTeamRating,
      cleanlinessRating,
      overallRating,
      lat,
      lng,
      date,
      quoteCreationDate,
      validityPeriod
    }
  })
}
