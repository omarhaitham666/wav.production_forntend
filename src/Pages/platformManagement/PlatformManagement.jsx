import React from 'react'

const PlatformManagement = () => {
    return (
        <div className=" p-6 flex justify-center">
          <div className="max-w-6xl mt-22 h-[100%] bg-white p-10 rounded-lg shadow-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">platforms management</h1>
                <p className="text-gray-600 mb-6">
                  Empowering Businesses with Innovative Solutions for Success and Growth. 
                  Streamline workflows, foster collaboration, and unlock your true potential with TechVantage. 
                  Experience the future of work today.
                </p>
                <div className="flex gap-4">
                  <button className="bg-indigo-600 hover:bg-white hover:text-black border border-indigo-600 transition-all duration-300 ease-in-out text-white px-6 py-2 rounded-lg font-semibold">
                    Start Your Free Trial Now
                  </button>
                  <button className="border border-gray-400  hover:text-white  hover:bg-indigo-600  border-indigo-600 transition-all duration-300 ease-in-out  px-6 py-2 rounded-lg font-semibold">
                    Request a demo
                  </button>
                </div>
              </div>
              
              
              <div className="relative flex justify-center">
                <img 
                  src="/your-image.jpg" 
                  alt="Platform Illustration" 
                  className="w-64 h-64 object-cover rounded-lg" 
                />
              </div>
            </div>
            
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
              {[
                { title: "artist profile", desc: "Customize an artist profile on our platform" },
                { title: "Providing real job", desc: "Providing real job opportunities through our platform" },
                { title: "Direct download", desc: "Direct download with fast and secure access." },
                { title: "Data Security", desc: "Protecting content and intellectual property rights during the contract terms." },
                { title: "Ensuring successful", desc: "Ensuring the successful receipt of profits in a timely and secure manner." }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-4 shadow-md rounded-lg text-center">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default PlatformManagement;