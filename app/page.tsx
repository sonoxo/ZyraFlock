'use client';

import React, { useState } from 'react';

export default function Home() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedAge, setAgreedAge] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleStartSearch = () => {
    if (!agreedTerms || !agreedAge || !selectedImage) return;
    setIsScanning(true);
    // Trigger search API call here
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between font-sans">
      {/* Header */}
      <header className="border-b border-neutral-800 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white">
            P
          </div>
          <span className="text-xl font-bold tracking-tight">FaceSearch</span>
        </div>
        <nav className="flex space-x-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-white transition">How to use</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
          <a href="#" className="hover:text-white transition">Opt-Out</a>
        </nav>
      </header>

      {/* Hero / Main Upload Area */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-center flex-grow flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Face Search Engine & Reverse Image Search
        </h1>
        <p className="text-neutral-400 max-w-xl mb-8">
          Find your face on the web and protect your online privacy. Upload an image to search publicly available websites.
        </p>

        {/* Upload Box */}
        <div className="w-full max-w-lg bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-indigo-500 rounded-2xl p-8 transition flex flex-col items-center justify-center relative">
          {selectedImage ? (
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={selectedImage} 
                alt="Selected Face" 
                className={`w-32 h-32 object-cover rounded-full border-2 border-indigo-500 ${isScanning ? 'animate-pulse' : ''}`}
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-xs text-neutral-400 underline hover:text-white"
              >
                Choose a different photo
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4 text-neutral-400">
                📷
              </div>
              <p className="text-sm text-neutral-300 font-medium mb-1">
                Drag and drop your photo here, or browse
              </p>
              <p className="text-xs text-neutral-500 mb-6">Supports JPG, PNG, WEBP</p>
              
              <label className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-6 py-2.5 rounded-lg cursor-pointer transition">
                Upload Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </label>
            </>
          )}
        </div>

        {/* Compliance Checkboxes */}
        <div className="mt-8 text-left max-w-lg space-y-3">
          <label className="flex items-start space-x-3 text-xs text-neutral-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-0" 
            />
            <span>I accept the Terms of Service and Privacy Policy, and confirm I am searching for my own face or have explicit authorization.</span>
          </label>
          <label className="flex items-start space-x-3 text-xs text-neutral-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={agreedAge}
              onChange={(e) => setAgreedAge(e.target.checked)}
              className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-0" 
            />
            <span>I confirm I am at least 18 years old.</span>
          </label>
        </div>

        {/* Search Action Button */}
        <button
          onClick={handleStartSearch}
          disabled={!agreedTerms || !agreedAge || !selectedImage || isScanning}
          className={`mt-6 w-full max-w-lg py-3 rounded-lg font-semibold text-sm transition ${
            agreedTerms && agreedAge && selectedImage && !isScanning
              ? 'bg-neutral-100 text-neutral-900 hover:bg-white cursor-pointer'
              : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
          }`}
        >
          {isScanning ? 'Scanning Web Databases...' : 'Start Face Search'}
        </button>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} ZyraFlock Face Analytics. All rights reserved.
      </footer>
    </div>
  );
}
