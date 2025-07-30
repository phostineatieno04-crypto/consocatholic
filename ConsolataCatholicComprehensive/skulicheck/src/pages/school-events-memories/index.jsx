import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EventCard from './components/EventCard';
import MediaGallery from './components/MediaGallery';
import EventFilters from './components/EventFilters';
import UploadModal from './components/UploadModal';
import EventTimeline from './components/EventTimeline';
import MemoryHighlights from './components/MemoryHighlights';

const SchoolEventsMemories = () => {
  const [currentUser] = useState({ role: 'Admin', name: 'John Smith' });
  const [viewMode, setViewMode] = useState('grid'); // grid, timeline, highlights
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Mock events data
  const [events] = useState([
    {
      id: 1,
      title: "Annual Sports Day Championship",
      description: `Our students showcased incredible athletic prowess during the annual sports day. The event featured track and field competitions, team sports, and individual challenges.\n\nHighlights included record-breaking performances in the 100m sprint and an exciting basketball tournament that went into overtime.`,
      coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      category: "Sports",
      date: "2024-03-15",
      location: "Main Sports Ground",
      participants: 450,
      mediaCount: 156,
      hasVideo: true,
      likes: 89,
      comments: 23,
      isLiked: false,
      tags: ["sports", "competition", "athletics", "teamwork"],
      uploadedBy: "Coach Martinez",
      privacy: "school-only"
    },
    {
      id: 2,
      title: "Science Fair Innovation Showcase",
      description: `Students from grades 6-12 presented their innovative science projects, demonstrating creativity and scientific thinking.\n\nProjects ranged from renewable energy solutions to robotics and environmental conservation initiatives.`,
      coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
      category: "Academic",
      date: "2024-02-28",
      location: "Science Laboratory",
      participants: 120,
      mediaCount: 89,
      hasVideo: true,
      likes: 67,
      comments: 15,
      isLiked: true,
      tags: ["science", "innovation", "projects", "STEM"],
      uploadedBy: "Dr. Sarah Johnson",
      privacy: "public"
    },
    {
      id: 3,
      title: "Cultural Heritage Festival",
      description: `A vibrant celebration of diversity where students shared their cultural traditions through dance, music, and traditional costumes.\n\nThe event featured performances from over 15 different cultural backgrounds, creating a beautiful tapestry of our school community.`,
      coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      category: "Cultural",
      date: "2024-01-20",
      location: "Main Auditorium",
      participants: 380,
      mediaCount: 203,
      hasVideo: true,
      likes: 142,
      comments: 34,
      isLiked: false,
      tags: ["culture", "diversity", "performance", "tradition"],
      uploadedBy: "Ms. Elena Rodriguez",
      privacy: "school-only"
    },
    {
      id: 4,
      title: "Grade 5 Field Trip to Natural History Museum",
      description: `An educational adventure where Grade 5 students explored the wonders of natural history, from dinosaur fossils to interactive science exhibits.\n\nStudents engaged with hands-on learning experiences and participated in guided tours led by museum experts.`,
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      category: "Field Trip",
      date: "2024-04-10",
      location: "Natural History Museum",
      participants: 85,
      mediaCount: 67,
      hasVideo: false,
      likes: 45,
      comments: 12,
      isLiked: true,
      tags: ["field-trip", "education", "museum", "grade-5"],
      uploadedBy: "Mrs. Thompson",
      privacy: "class-only"
    },
    {
      id: 5,
      title: "High School Graduation Ceremony 2024",
      description: `A momentous occasion celebrating the achievements of our graduating class. Students received their diplomas and awards for academic excellence.\n\nThe ceremony featured inspiring speeches from valedictorians and a special performance by the school choir.`,
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
      category: "Graduation",
      date: "2024-06-15",
      location: "Main Auditorium",
      participants: 150,
      mediaCount: 245,
      hasVideo: true,
      likes: 198,
      comments: 56,
      isLiked: false,
      tags: ["graduation", "ceremony", "achievement", "milestone"],
      uploadedBy: "Principal Davis",
      privacy: "public"
    },
    {
      id: 6,
      title: "Art Exhibition: Student Creativity Showcase",
      description: `Our talented art students displayed their creative works in various mediums including paintings, sculptures, and digital art.\n\nThe exhibition featured over 100 pieces from students across all grade levels, showcasing the incredible artistic talent within our school.`,
      coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      category: "Cultural",
      date: "2024-05-08",
      location: "Art Gallery",
      participants: 95,
      mediaCount: 78,
      hasVideo: false,
      likes: 73,
      comments: 18,
      isLiked: true,
      tags: ["art", "creativity", "exhibition", "talent"],
      uploadedBy: "Mr. Anderson",
      privacy: "school-only"
    }
  ]);

  // Mock media data for gallery
  const mockMedia = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      title: 'Sports Day Opening Ceremony',
      description: 'Students marching in the opening ceremony parade',
      date: '2024-03-15',
      uploadedBy: 'Coach Martinez',
      tags: ['sports', 'ceremony', 'parade']
    },
    {
      id: 2,
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      title: '100m Sprint Final',
      description: 'Exciting final race of the 100m sprint competition',
      date: '2024-03-15',
      uploadedBy: 'Coach Martinez',
      tags: ['sports', 'sprint', 'competition']
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=800&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop',
      title: 'Science Project Presentations',
      description: 'Students presenting their innovative science projects',
      date: '2024-02-28',
      uploadedBy: 'Dr. Sarah Johnson',
      tags: ['science', 'projects', 'innovation']
    }
  ];

  // Filter events based on current filters
  useEffect(() => {
    let filtered = [...events];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters.dateRange) {
      const now = new Date();
      const eventDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filtered = filtered.filter(event => {
            const eDate = new Date(event.date);
            return eDate.toDateString() === now.toDateString();
          });
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(event => {
            const eDate = new Date(event.date);
            return eDate >= weekAgo && eDate <= now;
          });
          break;
        case 'month':
          filtered = filtered.filter(event => {
            const eDate = new Date(event.date);
            return eDate.getMonth() === now.getMonth() && eDate.getFullYear() === now.getFullYear();
          });
          break;
      }
    }

    // Sort events
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'most-photos':
        filtered.sort((a, b) => b.mediaCount - a.mediaCount);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredEvents(filtered);
  }, [filters, events]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setGalleryMedia(mockMedia);
    setGalleryIndex(0);
    setGalleryOpen(true);
  };

  const handleShare = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${event.title} - ${window.location.href}`);
    }
  };

  const handleUpload = (uploadData) => {
    console.log('New upload:', uploadData);
    // In real app, this would add the new event to the events list
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const canUpload = ['Admin', 'Teacher'].includes(currentUser.role);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>School Events & Memories - SkuliCheck</title>
        <meta name="description" content="Browse and share photos and videos from school events, creating lasting memories of our educational community." />
      </Helmet>

      <RoleBasedHeader />
      <DashboardNavigation userRole={currentUser.role} />

      <main className={`pt-16 ${['Admin', 'Teacher'].includes(currentUser.role) ? 'lg:pl-64' : 'lg:pl-64'} pb-20 lg:pb-8`}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">School Events & Memories</h1>
              <p className="text-muted-foreground mt-1">
                Discover and share the special moments that make our school community unique
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <NotificationCenter />
              
              {canUpload && (
                <Button
                  variant="default"
                  onClick={() => setUploadModalOpen(true)}
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={18}
                >
                  Upload Event
                </Button>
              )}

              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'highlights' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('highlights')}
                  iconName="Star"
                  iconSize={16}
                  className="px-3"
                >
                  <span className="hidden sm:inline ml-2">Highlights</span>
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16}
                  className="px-3"
                >
                  <span className="hidden sm:inline ml-2">Grid</span>
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                  iconName="Clock"
                  iconSize={16}
                  className="px-3"
                >
                  <span className="hidden sm:inline ml-2">Timeline</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Memory Highlights View */}
          {viewMode === 'highlights' && (
            <div className="space-y-6">
              <MemoryHighlights onViewAll={() => setViewMode('grid')} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EventFilters 
                    onFiltersChange={handleFiltersChange}
                    totalEvents={filteredEvents.length}
                  />
                </div>
                <QuickActionPanel userRole={currentUser.role} />
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <EventFilters 
                  onFiltersChange={handleFiltersChange}
                  totalEvents={filteredEvents.length}
                />

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <EventCard
                        event={event}
                        onViewDetails={handleEventSelect}
                        onShare={() => handleShare(event)}
                      />
                    </div>
                  ))}
                </div>

                {/* Load More */}
                {filteredEvents.length > 0 && (
                  <div className="text-center pt-6">
                    <Button
                      variant="outline"
                      iconName="ChevronDown"
                      iconPosition="right"
                      iconSize={16}
                      onClick={() => console.log('Load more events')}
                    >
                      Load More Events
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <QuickActionPanel userRole={currentUser.role} />
                
                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-lg p-6 card-elevation">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Events</span>
                      <span className="font-medium text-foreground">{events.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Photos</span>
                      <span className="font-medium text-foreground">
                        {events.reduce((sum, event) => sum + event.mediaCount, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-medium text-foreground">
                        {events.filter(event => {
                          const eventDate = new Date(event.date);
                          const now = new Date();
                          return eventDate.getMonth() === now.getMonth() && 
                                 eventDate.getFullYear() === now.getFullYear();
                        }).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline View */}
          {viewMode === 'timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <EventFilters 
                  onFiltersChange={handleFiltersChange}
                  totalEvents={filteredEvents.length}
                  className="mb-6"
                />
                <EventTimeline
                  events={filteredEvents}
                  onEventSelect={handleEventSelect}
                  onShare={handleShare}
                />
              </div>
              <div>
                <QuickActionPanel userRole={currentUser.role} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Media Gallery Modal */}
      <MediaGallery
        media={galleryMedia}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryIndex}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default SchoolEventsMemories;