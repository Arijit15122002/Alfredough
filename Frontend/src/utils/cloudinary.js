import axios from "axios";
const uploadURL = import.meta.env.CLOUDINARY_UPLOAD_URL;

const uploadOnCloudinary = ({data}) => {
			const formData = new FormData()
			formData.append('file', data)
			formData.append('upload_preset', import.meta.env.UPLOAD_PRESET)
			axios.post(uploadURL, formData).then((response) => {
				setImageAfterCrop(response.data.url); // Update image state with uploaded image URL
				setCurrentPage('image-cropped');
			  }).catch((error) => {
				console.error('Error uploading image:', error);
			  })
}

export default uploadOnCloudinary