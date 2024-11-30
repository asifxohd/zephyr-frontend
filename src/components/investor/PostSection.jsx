import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Heart,
    MessageCircle,
    MoreHorizontal,
    Send,
    Camera,
    Image as ImageIcon,
    Smile,
    MapPin,
    AlertCircle
} from "lucide-react";

import PostModal from '../business/PostModal';
import { getPosts, sendCommentToServer, toggleLikePost } from '@/src/services/api/feed';
import { BASE_URL_IMG } from '@/src/constents';
import { getCommentsOfThePost } from '@/src/services/api/feed';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import RefereshSpinner from '../Other/ReloadSpinner';
import { UserContext } from '../Common/UserContext';

const NoPosts = () => (
    <Card className="border-0 rounded-sm transition-all duration-300 overflow-hidden bg-white">
        <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-blue-50 p-3 rounded-full">
                    <AlertCircle className="w-8 h-8 text-blue-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">No Posts Yet</h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                        Be the first one to share your thoughts and moments with the community!
                    </p>
                </div>

            </div>
        </CardContent>
    </Card>
);

const AdvancedPostCard = () => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
    const [change, setChange] = useState(false);
    const [com, setCom] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const {userInformations} = useContext(UserContext)

    const observer = useRef();
    const authUser = useCurrentUser()
    const navigate = useNavigate()

    const lastPostElementRef = useCallback(node => {
        if (isLoadingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        }, {
            rootMargin: '200px' 
        });

        if (node) observer.current.observe(node);
    }, [isLoadingMore, hasMore]);


    const fetchPosts = useCallback(async (page) => {
        
        if (!hasMore) return;

        try {
            setIsLoadingRefresh(!isLoadingRefresh)
            const response = await getPosts(page);
            console.log();
            
            if (response.results.length === 0) {
                setHasMore(false);
                return;
            }

            setPosts(prevPosts => [...prevPosts, ...response.results]);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }finally{
            setIsLoadingRefresh(!isLoadingRefresh)
            setIsLoadingMore(false);

        }
    }, [hasMore, isLoadingRefresh]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            
            if (hasMore ) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);


    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };

    const onOpenModal = () => setIsModalOpen(true);
    const onCloseModal = () => setIsModalOpen(false);

    const handleCommentToggle = async (postId) => {
        if (!postId) {
            setShowComments(null);
        } else {
            setShowComments(postId)
            try {
                const response = await getCommentsOfThePost(postId);
                console.log(response);
                setComments(response)
            } catch (error) {
                console.log(error);

            }
        }
    };

    const handleLike = async (postId) => {
        const data = {
            user: authUser.user_id,
            post: postId,
        };
        console.log(data);

        try {
            const response = await toggleLikePost(data)
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            is_liked: !post.is_liked,
                            total_likes: response.total_likes,
                        }
                        : post
                )
            );
        } catch (error) {
            console.error('Error toggling like:', error);

        }
    }


    const handleSendComment = async (postId) => {
        if (!com.trim()) return;

        const data = {
            user: authUser.user_id,
            post: postId,
            text: com,
        }
        try {
            const response = await sendCommentToServer(data)
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            const response = await getCommentsOfThePost(postId);
            setComments(response)
            setCom('')
        }
    }
    const handleNavigateToProfile = (user) => {

		navigate(`user/profile/${user}`);
	};


    return (
        <div className="w-full max-w-2xl mx-auto space-y-2">
            {/* Create Post Section */}
            
            <Card className="bg-white rounded-sm border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 md:p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-blue-100">
                            <img src={BASE_URL_IMG+userInformations.avatar_image} alt="User Profile" />
                            <AvatarFallback className="bg-blue-50 text-blue-600">US</AvatarFallback>
                        </Avatar>

                        <div
                            onClick={onOpenModal}
                            className="flex-1 px-4 py-2.5 bg-gray-50 rounded-full cursor-pointer 
                                    hover:bg-gray-100 transition-all duration-200
                                    border border-gray-100 hover:border-gray-200"
                        >
                            <span className="text-gray-500 text-sm md:text-base">What's on your mind?</span>
                        </div>

                        <div className="flex gap-1 md:gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="rounded-full w-8 h-8 md:w-10 md:h-10 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <Camera className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="rounded-full w-8 h-8 md:w-10 md:h-10 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <ImageIcon className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="rounded-full w-8 h-8 md:w-10 md:h-10 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <Smile className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
            
            {isModalOpen && (
                <PostModal isOpen={isModalOpen} onClose={onCloseModal} onUpdate={() => setChange(!change)} />
            )}

            {/* Loading State */}
            {isLoading && (
                <Card className="border-0 rounded-sm animate-pulse bg-white">
                    <CardContent className="p-6">
                        <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {!isLoading && posts.length === 0 && <NoPosts />}

            {/* Posts List */}
            {!isLoading && posts.map((post, index) => (
                
                
                <Card 
                    key={post.id}
                    ref={index === posts.length - 1 ? lastPostElementRef : null}
                    className="border-0 rounded-sm transition-all duration-300 overflow-hidden bg-white">
                    <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12  ring-4 ring-blue-100">
                                    <img src={post.user.image ? BASE_URL_IMG + post?.user?.image : post?.user?.image} alt={post.user.name} />
                                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <h3 onClick={()=> handleNavigateToProfile(post?.user?.id)} className="font-semibold text-gray-900">{post.user.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{formatDate(post.created_at)}</span>
                                        {post.location && (
                                            <>
                                                <span>•</span>
                                                <div className="flex items-center">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    <span>{post.location}</span>
                                                </div>
                                            </>
                                        )}
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
                            {post.caption && (
                                <div className="space-y-2">
                                    <p className="text-gray-800 text-base">{post.caption}</p>
                                </div>
                            )}

                            {post.image && (
                                <div className="relative rounded-xl overflow-hidden group">
                                    <div className="aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] relative">
                                        <img
                                            src={post.image}
                                            alt="Post content"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="p-6 border-t bg-gray-50">
                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-2 hover:text-red-500 transition-all duration-200"
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <Heart
                                            className={`h-5 w-5 transition-transform duration-200 hover:scale-110 ${post.is_liked ? 'fill-red-500 text-red-500' : ''}`}
                                        />
                                        <span className={`font-medium ${post.is_liked ? 'text-red-500' : ''}`}>
                                            {post.total_likes}
                                        </span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                                        onClick={() => { showComments && post?.id == showComments ? handleCommentToggle(null) : handleCommentToggle(post.id) }}
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="font-medium">{post?.total_comments}</span>
                                    </Button>

                                    {/* <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-2 hover:text-green-500 transition-colors"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        <span className="font-medium">{post.total_shares}</span>
                                    </Button> */}
                                </div>
                                {/* <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`hover:text-blue-500 transition-colors ${isSaved ? 'text-blue-500' : ''
                                        }`}
                                    onClick={() => handleLike(post.id)}
                                >
                                </Button> */}
                            </div>

                            {showComments && comments && post?.id == showComments && (
                                <div className="flex flex-col gap-4 mb-2">
                                    {comments.map((comment, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={comment?.user?.image ? BASE_URL_IMG + comment?.user?.image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'} alt={comment.user.name} />
                                                <AvatarFallback className="" >{comment?.user?.name}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 ">
                                                <div className="font-semibold text-xs">{comment?.user?.name}  <span className='text-xs pl-1 font-light'>{formatDate(comment.created_at)}</span></div>
                                                <div className=" text-xs">{comment?.text}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/api/placeholder/32/32" alt="Current user" />
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={com}
                                        onChange={(e) => setCom(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleSendComment(post.id)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-blue-100 text-blue-500"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default AdvancedPostCard;