const VideoCard = ({ videoId, title }) => (
  <div className="group bg-gray-200 relative overflow-hidden cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
    <div className="flex items-center mb-6 aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <div className="block">
      <h4 className="text-black text-2xl md:text-3xl font-medium leading-8">
        {title}
      </h4>
    </div>
  </div>
);

const videos = [
  {
    videoId: "i9V1tYJoqFE", // Replace with your actual YouTube video IDs
    title:
      "ना कोई कोचिंग, ना कोई गाइडेंस -Google को बनाय अपना हथियार और बन गई IAS I| HARSHITA SHARMA,AIR 214",
  },
  {
    videoId: "u4GtKDCOWf8", // Replace with your actual YouTube video IDs
    title:
      "SHRUTI SHARMA RANK 1|| Shruti Sharma ने बताया,किस स्ट्रेटजी ने दिलाई उन्हें RANK-1,Strategies & Tips",
  },
  {
    videoId: "97aKwDK5ptI", // Replace with your actual YouTube video IDs
    title:
      "ना कोई कोचिंग ना कोई गाइडेंस Youtube को बनाय अपना हथियार और बन गई IAS I Shurbhi Goyal AIR 78 UPSC 21",
  },
];

const YoutubeVideos = () => {
  return (
    <section className="py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 text-center">
          Watch My Most Popular Videos
        </h2>
        <div className="flex justify-center my-16 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
        <a
          href="https://www.youtube.com/@WeTooMedia-IAS"
          target="_blank"
          className="cursor-pointer border border-gray-300 bg-primary text-white hover:bg-primary/90 hover:text-white shadow-sm rounded-full py-2.5 px-7 w-52 flex justify-center items-center font-semibold mx-auto transition-all duration-300 hover:bg-gray-100"
        >
          Watch More Videos
        </a>
      </div>
    </section>
  );
};

export default YoutubeVideos;
