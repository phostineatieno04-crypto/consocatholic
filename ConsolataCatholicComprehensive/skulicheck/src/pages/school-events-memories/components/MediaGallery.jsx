import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaGallery = ({ media, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const galleryRef = useRef(null);

  const currentMedia = media[currentIndex];

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case ' ':
          e.preventDefault();
          if (currentMedia?.type === 'video') {
            togglePlayPause();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, currentMedia]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    if (currentMedia?.type === 'image') {
      setIsZoomed(!isZoomed);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentMedia.title,
        text: currentMedia.description,
        url: currentMedia.url
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(currentMedia.url);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentMedia.url;
    link.download = currentMedia.filename || `media-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !currentMedia) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-modal animate-fade-in">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
            <div>
              <h3 className="font-semibold text-foreground">{currentMedia.title}</h3>
              <p className="text-sm text-muted-foreground">
                {currentIndex + 1} of {media.length}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              title="Share"
            >
              <Icon name="Share2" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              title="Download"
            >
              <Icon name="Download" size={18} />
            </Button>
            {currentMedia.type === 'image' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleZoom}
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
              </Button>
            )}
          </div>
        </div>

        {/* Media Display */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          {/* Navigation Buttons */}
          {media.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                disabled={media.length <= 1}
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                disabled={media.length <= 1}
              >
                <Icon name="ChevronRight" size={24} />
              </Button>
            </>
          )}

          {/* Media Content */}
          <div className="max-w-full max-h-full flex items-center justify-center">
            {currentMedia.type === 'image' ? (
              <Image
                src={currentMedia.url}
                alt={currentMedia.title}
                className={`max-w-full max-h-full object-contain cursor-pointer transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={toggleZoom}
              />
            ) : currentMedia.type === 'video' ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={currentMedia.url}
                  className="max-w-full max-h-full"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  poster={currentMedia.thumbnail}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Media Info */}
        <div className="p-4 border-t border-border bg-surface/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                {currentMedia.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{currentMedia.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={12} />
                  <span>{currentMedia.uploadedBy}</span>
                </div>
                {currentMedia.tags && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Tag" size={12} />
                    <span>{currentMedia.tags.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {media.length > 1 && (
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {media.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? 'border-primary ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={item.thumbnail || item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="Play" size={12} className="text-white drop-shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;