/* eslint-disable react/prop-types */

const ParallaxBanner = ({ title, subtitle, backgroundImage, buttonText }) => {
  return (
    <div
      className="relative w-full h-[80vh] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        {/* Banner Content */}
      <div className="relative text-center text-white px-6 animate-fadeIn">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-6 opacity-90 drop-shadow-md">
          {subtitle}
        </p>
        {buttonText && (
          <a
            href="#explore"
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default ParallaxBanner;
