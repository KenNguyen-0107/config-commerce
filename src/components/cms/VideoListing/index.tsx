import { VideoPlayer } from "@/components/common/VideoPlayer";

export default function VideoListing() {
  return (
    <div className="min-h-screen bg-muted-background py-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Fence Panel Videos Section */}
        <section>
          <h2 className="text-blue text-2xl lg:text-3xl font-bold text-center uppercase tracking-wide mb-2">
            WHAT OUR FENCE PANEL VIDEOS
          </h2>
          <p className="text-muted text-center mb-12 container mx-auto text-lg font-lora">
            The following videos will help explain the various panels we manufacture. Our Semi-Solid Fence Panel video explores our slatted fence panel range which are manufactured with gaps between the slates or pales (this doesn't always mean privacy is compromised). We also have a video that highlights the options in our solid panel range.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10 container">
            <VideoPlayer 
              thumbnail="/images/HeroBanner.jpg"
              videoUrl="https://www.jacksons-fencing.co.uk/-/media/jacksons/product-master/brand-video/standard--jacksons-fencing--timber-process-video-master-compressed.mp4"
            />
            <VideoPlayer 
              thumbnail="/images/HeroBanner.jpg"
              videoUrl="https://www.jacksons-fencing.co.uk/-/media/jacksons/product-master/brand-video/standard--jacksons-fencing--timber-process-video-master-compressed.mp4"
            />
          </div>
        </section>

        {/* Installing Fence Panels Section */}
        <section>
          <h2 className="text-blue text-3xl font-bold text-center uppercase tracking-wide mb-8">
            INSTALLING OUR FENCE PANELS
          </h2>
          <p className="text-muted text-center mb-12 container mx-auto text-lg leading-relaxed">
            We have an Approved Installer network available to assist with the installation of our fence panels in your local area. The following videos provide detailed demonstrations on how to install our fence panels and posts.
          </p>
          <div className="container mx-auto">
            <VideoPlayer 
              thumbnail="/images/HeroBanner.jpg"
              videoUrl="https://www.jacksons-fencing.co.uk/-/media/jacksons/product-master/brand-video/standard--jacksons-fencing--timber-process-video-master-compressed.mp4"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

