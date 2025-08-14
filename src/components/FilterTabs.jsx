import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange, filters }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter mentors by subject">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          role="tab"
          aria-selected={activeFilter === filter.value}
          aria-controls="mentors-grid"
          className={`
            px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-african_violet focus:ring-offset-2
            ${activeFilter === filter.value
              ? 'bg-eminence text-white shadow-lg shadow-eminence/30'
              : 'bg-white text-grape hover:bg-african_violet/10 border border-african_violet/20 hover:border-african_violet/40'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
