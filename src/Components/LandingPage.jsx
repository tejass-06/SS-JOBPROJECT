import React, { useState, useEffect } from 'react'
import Banner from './Banner'
import About from './About'
import Services from './Services'
import Industries from './Industries'
import Insights from './Insights'
import Careers from './Careers'
import Contact from './Contact'

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Extract initial search parameters from URL if present (e.g. from redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const titleParam = params.get('title') || '';
    const locParam = params.get('location') || '';
    if (titleParam) setSearchQuery(titleParam);
    if (locParam) setSearchLocation(locParam);
  }, []);

  return (
    <>
      <Banner />
      <Careers 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation} 
      />
      <About/>
      <Services/>
      <Industries/>
      <Insights/>
      <Contact/>
    </>
  )
}

export default LandingPage