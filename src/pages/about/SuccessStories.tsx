import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useSuccessStoriesStore } from '../../stores/successStoriesStore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SuccessStories() {
  const { stories } = useSuccessStoriesStore();

  if (!stories?.length) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Success Stories
        </h2>
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(story.date).toLocaleDateString()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        story.category === 'member' ? 'bg-blue-100 text-blue-800' :
                        story.category === 'chapter' ? 'bg-green-100 text-green-800' :
                        story.category === 'project' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}