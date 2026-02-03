import React from "react";

const Hero = () => {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Find World Class Coffee
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                No 1. Coffee store, World. Serving the best coffee in the world.
                90+ countries. and 1B people tested our coffee and has over
                1000+ reviews. We are the best coffee store in the world.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-400 mt-1">Coffee Shops</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-gray-400 mt-1">Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-400 mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square bg-white/5 border border-white/10 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop"
                alt="Coffee shop management"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
