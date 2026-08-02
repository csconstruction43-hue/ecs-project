import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

function PricingCard({ name, price, period, features, isPopular, buttonText, buttonLink }) {
  return (
    <div className={`card text-center ${isPopular ? 'ring-2 ring-primary shadow-xl relative' : ''}`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-sm px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-primary">{price}</span>
        {period && <span className="text-gray-500">/{period}</span>}
      </div>
      <ul className="text-left space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <FaCheck className="text-primary text-sm flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to={buttonLink}
        className={`block text-center py-3 rounded-lg font-semibold transition ${
          isPopular
            ? 'bg-primary text-white hover:bg-secondary'
            : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  )
}

export default PricingCard