import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
  Bookmark,
  Camera,
  Image as ImageIcon,
  Smile,
  MapPin,
  TrendingUp,
  Award
} from "lucide-react";

const AdvancedPostCard = ({ openModal }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Create Post Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 ring-4 ring-blue-100">
              <AvatarImage src="/api/placeholder/48/48" alt="Profile" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div 
              onClick={openModal}
              className="flex-1 px-6 py-3 bg-white rounded-full cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow group"
            >
              <span className="text-gray-500 group-hover:text-gray-700">Share your thoughts...</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="ghost"
                className="rounded-full hover:bg-blue-100 transition-colors duration-200"
              >
                <Camera className="h-5 w-5 text-blue-600" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                className="rounded-full hover:bg-blue-100 transition-colors duration-200"
              >
                <ImageIcon className="h-5 w-5 text-blue-600" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                className="rounded-full hover:bg-blue-100 transition-colors duration-200"
              >
                <Smile className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Post Card */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-12 h-12 ring-4 ring-blue-100">
                  <AvatarImage src="/api/placeholder/48/48" alt="User" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600">
                  <Award className="h-3 w-3" />
                </Badge>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">Alice Smith</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Pro</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>2 hours ago</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pt-0 pb-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-gray-800 text-lg">Just wrapped up an incredible product strategy session! 🚀</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  #ProductStrategy
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  #Innovation
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  #TechLife
                </Badge>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden group">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/89/738/559/models-kylie-jenner-american-blonde-brown-eyes-hd-wallpaper-preview.jpg"
                alt="Post content"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <Avatar key={i} className="w-6 h-6 border-2 border-white">
                    <AvatarImage src={`/api/placeholder/${20+i}/20`} />
                  </Avatar>
                ))}
                <span className="ml-4 text-sm text-gray-600">
                  Liked by <span className="font-semibold">John Doe</span> and <span className="font-semibold">1,023 others</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Trending in <span className="font-semibold">Technology</span></span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 border-t bg-gray-50">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2 hover:text-red-500 transition-all duration-200"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart 
                    className={`h-5 w-5 transition-transform duration-200 hover:scale-110 ${
                      isLiked ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                  <span className={`font-medium ${isLiked ? 'text-red-500' : ''}`}>
                    {isLiked ? '1,024' : '1,023'}
                  </span>
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">86</span>
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2 hover:text-green-500 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="font-medium">24</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className={`hover:text-blue-500 transition-colors ${
                  isSaved ? 'text-blue-500' : ''
                }`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {showComments && (
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Commenter" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <p className="font-semibold text-sm">John Doe</p>
                      <p className="text-sm text-gray-700">Amazing work! Looking forward to seeing the results 🎉</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 ml-2">
                      <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                      <span className="text-xs text-gray-400">2m ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Current user" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-blue-100 text-blue-500"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdvancedPostCard;