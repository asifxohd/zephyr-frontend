import { useState } from "react";
import { X, Upload, MapPin, Type } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactDOM from "react-dom";
import { handleUpdateIndividualPost } from "@/src/services/api/feed";




const EditPostModal = ({ showEditModal, setShowEditModal, post, handleSaveEdit }) => {
    const [editedPost, setEditedPost] = useState({
      caption: post.caption,
      location: post.location,
      image: post.image,
    });
  
    const [imagePreview, setImagePreview] = useState(
      post.image instanceof File ? URL.createObjectURL(post.image) : post.image
    );
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedPost((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setEditedPost((prev) => ({
          ...prev,
          image: file,
        }));
        setImagePreview(URL.createObjectURL(file));
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        setEditedPost((prev) => ({
          ...prev,
          image: file,
        }));
        setImagePreview(URL.createObjectURL(file));
      }
    };
  

    const saveEditAndUpdatePost = async () => {
        try {
            const formData = new FormData();
            formData.append("caption", editedPost.caption);
            formData.append("location", editedPost.location);
    
            // Check if there's a file to upload
            if (editedPost.image instanceof File) {
                formData.append("image", editedPost.image);
            }
    
            await handleUpdateIndividualPost(post.id, formData);  // Pass FormData object
            setShowEditModal(false);
            handleSaveEdit();
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };




    const modalContent = (
      <>
        {/* Backdrop */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        )}
  
        {/* Modal */}
        <Dialog
          className="fixed inset-0 z-50"
          open={showEditModal}
          onOpenChange={setShowEditModal}
        >
          <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-xl bg-white p-4 rounded-lg shadow-lg z-50">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-md font-semibold">Edit Post</DialogTitle>
            </DialogHeader>
  
            <div className="space-y-4">
              {/* Image Upload Area */}
              <div
                className="relative group cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
  
                {imagePreview ? (
                  <div className="relative aspect-[16/9] max-h-64 w-full overflow-hidden rounded-lg">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                        onClick={() => document.getElementById('image').click()}
                      >
                        <Upload size={14} />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center py-8 cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Drop your image here or click to upload
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 10MB
                    </span>
                  </label>
                )}
              </div>
  
              {/* Caption Input */}
              <div className="space-y-1">
                <Label htmlFor="caption" className="flex items-center gap-2">
                  <Type size={14} />
                  Caption
                </Label>
                <Textarea
                  id="caption"
                  name="caption"
                  value={editedPost.caption}
                  onChange={handleInputChange}
                  placeholder="Write a caption..."
                  className="resize-none"
                  rows={2}
                />
              </div>
  
              {/* Location Input */}
              <div className="space-y-1">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin size={14} />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={editedPost.location}
                  onChange={handleInputChange}
                  placeholder="Add location"
                />
              </div>
  
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveEditAndUpdatePost}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("portel-one")
    );
  };
  
  export default EditPostModal;
  