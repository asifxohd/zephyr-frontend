import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Globe } from 'lucide-react';
import { getIndividualBusinessInfo } from '@/src/services/api/admin/businessInfoapis';
import { useParams } from 'react-router-dom';
import { BASE_URL_IMG } from '@/src/constents';

const BusinessProfile = () => {
  const [businessData, setBusinessData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIndividualBusinessInfo(id);
        setBusinessData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!businessData) return <div>Loading...</div>;

  const { business_preferences: prefs = {}, documents = [], video_pitch: video = {}, user = {} } = businessData;

  console.log("Business Preferences:", prefs);
  console.log("Documents:", documents);
  console.log("Video Pitch:", video);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Cover Image */}
        <div className="relative h-48 md:h-48 lg:h-56 w-full bg-blue-900">
          <img
            src={BASE_URL_IMG + prefs?.cover_image || "Not given"}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="relative -mt-32 sm:-mt-16 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 pt-4">
              <img
                src={BASE_URL_IMG + prefs?.avatar_image || "Not given"}
                alt="Company Logo"
                className="w-32 h-32 rounded-lg border-4 border-white shadow-xl bg-white"
              />
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-black">
                  {prefs?.company_name || "Not given"}
                </h1>
                <div className="flex flex-wrap justify-center pt-1.5 sm:justify-start gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {prefs?.industry || "Not given"}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {user?.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {prefs?.company_description || "Not given"}
                </p>
              </div>

              {/* Documents Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
                <div className="space-y-4">
                  {documents.length ? (
                    documents.map((doc) => (
                      <div key={doc.id} className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={doc.image_url || "https://img.freepik.com/free-vector/document-vector-colorful-design_341269-1262.jpg?w=360"}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover md:w-16 md:h-16"
                        />
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-gray-900">{doc.document_title || "Not given"}</h3>
                          <p className="text-gray-500 text-sm mt-1">{doc.document_description || "Not given"}</p>
                          {/* Open Document button */}
                          <button
                            onClick={() => window.open(BASE_URL_IMG + doc.document_file, "_blank")}
                            className="mt-2 text-blue-500 underline text-sm"
                          >
                            Open Document
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Not given</p>
                  )}
                </div>


              </div>

              {/* Video Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Pitch</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{video?.video_title ? video?.video_title : "not given"}</h3>
                  <p className="text-gray-500 text-sm mt-1">{video?.video_description ? video?.video_description : "Not given"}</p>
                  {/* Video tag */}
                  {video?.video_file ? (
                    <video controls autoPlay className="mt-2 w-full h-auto rounded-lg">
                      <source src={BASE_URL_IMG + video?.video_file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p className="text-gray-500 mt-2">Not given</p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>{businessData.email || "Not given"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{businessData.phone_number || "Not given"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{prefs?.location || "Not given"}</span>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h2>
                <div className="space-y-3">
                  {[
                    ["Business Type", prefs?.business_type],
                    ["Company Stage", prefs?.company_stage],
                    ["Employee Count", prefs?.employee_count],
                    ["Seeking Amount", prefs?.seeking_amount ? `$${parseFloat(prefs.seeking_amount).toLocaleString()}` : null],
                    ["Annual Revenue", prefs?.annual_revenue ? `$${parseFloat(prefs.annual_revenue).toLocaleString()}` : null]
                  ].map(([label, value]) => (
                    <div className="flex justify-between text-gray-600" key={label}>
                      <span>{label}</span>
                      <span className="font-medium text-gray-900">{value || "Not given"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h2>
                <div className="flex flex-wrap gap-4">
                  <a href={prefs?.linkedIn || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a href={prefs?.facebook || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                  <a href={prefs?.twitter || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </a>
                  <a href={prefs?.website || "#"} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Globe className="w-5 h-5" />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
