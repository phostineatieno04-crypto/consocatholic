import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventFilters = ({ onFiltersChange, totalEvents }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateRange: '',
    grade: '',
    sortBy: 'newest'
  });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Academic', label: 'Academic Events' },
    { value: 'Sports', label: 'Sports & Athletics' },
    { value: 'Cultural', label: 'Cultural Programs' },
    { value: 'Field Trip', label: 'Field Trips' },
    { value: 'Graduation', label: 'Graduation & Ceremonies' },
    { value: 'Workshop', label: 'Workshops & Training' },
    { value: 'Competition', label: 'Competitions' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const gradeOptions = [
    { value: '', label: 'All Grades' },
    { value: 'kindergarten', label: 'Kindergarten' },
    { value: 'grade-1', label: 'Grade 1' },
    { value: 'grade-2', label: 'Grade 2' },
    { value: 'grade-3', label: 'Grade 3' },
    { value: 'grade-4', label: 'Grade 4' },
    { value: 'grade-5', label: 'Grade 5' },
    { value: 'middle-school', label: 'Middle School' },
    { value: 'high-school', label: 'High School' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'most-photos', label: 'Most Photos' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      dateRange: '',
      grade: '',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.search || filters.category || filters.dateRange || filters.grade || filters.sortBy !== 'newest';

  return (
    <div className="bg-card border border-border rounded-lg p-4 card-elevation">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Filter Events</h3>
            <p className="text-sm text-muted-foreground">
              {totalEvents} events found
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
            className="text-xs lg:hidden"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search events, descriptions, or tags..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filter Controls */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Quick Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Select category"
          />

          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            placeholder="Select date range"
          />

          <Select
            label="Grade Level"
            options={gradeOptions}
            value={filters.grade}
            onChange={(value) => handleFilterChange('grade', value)}
            placeholder="Select grade"
          />

          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>

        {/* Advanced Filters */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Advanced Filters
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Media Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Media Type
              </label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Photos', 'Videos', 'Mixed'].map((type) => (
                  <Button
                    key={type}
                    variant={filters.mediaType === type.toLowerCase() ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('mediaType', type.toLowerCase())}
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Participation Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Participation
              </label>
              <div className="flex flex-wrap gap-2">
                {['All', 'My Child', 'My Class', 'School Wide'].map((participation) => (
                  <Button
                    key={participation}
                    variant={filters.participation === participation.toLowerCase().replace(' ', '-') ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('participation', participation.toLowerCase().replace(' ', '-'))}
                    className="text-xs"
                  >
                    {participation}
                  </Button>
                ))}
              </div>
            </div>

            {/* Privacy Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Privacy Level
              </label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Public', 'School Only', 'Class Only'].map((privacy) => (
                  <Button
                    key={privacy}
                    variant={filters.privacy === privacy.toLowerCase().replace(' ', '-') ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('privacy', privacy.toLowerCase().replace(' ', '-'))}
                    className="text-xs"
                  >
                    {privacy}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">Active Filters</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs text-error hover:text-error"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  Search: "{filters.search}"
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFilterChange('search', '')}
                    className="ml-1 w-4 h-4 hover:bg-primary-foreground/20"
                  >
                    <Icon name="X" size={10} />
                  </Button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  {categoryOptions.find(opt => opt.value === filters.category)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFilterChange('category', '')}
                    className="ml-1 w-4 h-4 hover:bg-secondary-foreground/20"
                  >
                    <Icon name="X" size={10} />
                  </Button>
                </span>
              )}
              {filters.dateRange && (
                <span className="inline-flex items-center px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                  {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFilterChange('dateRange', '')}
                    className="ml-1 w-4 h-4 hover:bg-accent-foreground/20"
                  >
                    <Icon name="X" size={10} />
                  </Button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilters;