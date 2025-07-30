import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MemoryHighlights = ({ onViewAll }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const highlights = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      description: "Students showcased their athletic talents in various sports competitions, creating unforgettable moments of teamwork and achievement.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      date: "March 15, 2024",
      category: "Sports",
      stats: { photos: 156, videos: 12, participants: 450 },
      featured: true
    },
    {
      id: 2,
      title: "Science Fair Excellence",
      description: "Young scientists presented innovative projects, demonstrating creativity and scientific thinking that impressed judges and parents alike.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop",
      date: "February 28, 2024",
      category: "Academic",
      stats: { photos: 89, videos: 8, participants: 120 },
      featured: true
    },
    {
      id: 3,
      title: "Cultural Heritage Festival",
      description: "A vibrant celebration of diversity where students shared their cultural traditions through dance, music, and traditional costumes.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop",
      date: "January 20, 2024",
      category: "Cultural",
      stats: { photos: 203, videos: 15, participants: 380 },
      featured: true
    },
    {
      id: 4,
      title: "Graduation Ceremony 2024",
      description: "A proud moment as our graduating class celebrated their achievements and prepared for their next educational journey.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
      date: "June 15, 2024",
      category: "Graduation",
      stats: { photos: 245, videos: 20, participants: 85 },
      featured: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-primary text-primary-foreground',
      'Sports': 'bg-accent text-accent-foreground',
      'Cultural': 'bg-secondary text-secondary-foreground',
      'Graduation': 'bg-error text-error-foreground'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden card-elevation">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Star" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Memory Highlights</h3>
            <p className="text-sm text-muted-foreground">Featured moments from our school community</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Main Slide */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <Image
            src={highlights[currentSlide].image}
            alt={highlights[currentSlide].title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(highlights[currentSlide].category)}`}>
                    {highlights[currentSlide].category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {highlights[currentSlide].date}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {highlights[currentSlide].title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {highlights[currentSlide].description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Images" size={12} />
                    <span>{highlights[currentSlide].stats.photos} photos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Video" size={12} />
                    <span>{highlights[currentSlide].stats.videos} videos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{highlights[currentSlide].stats.participants} participants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {highlights.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-primary w-6' :'bg-background/50 hover:bg-background/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {highlights.map((highlight, index) => (
            <button
              key={highlight.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentSlide
                  ? 'border-primary ring-2 ring-primary/20' :'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 bg-muted/10 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {highlights.reduce((sum, h) => sum + h.stats.photos, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Photos</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {highlights.reduce((sum, h) => sum + h.stats.videos, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Videos</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {highlights.length}
            </p>
            <p className="text-xs text-muted-foreground">Featured Events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryHighlights;