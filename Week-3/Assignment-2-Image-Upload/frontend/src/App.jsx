import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [message, setMessage] = useState('')

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]

    if (selectedImage) {
      setImage(selectedImage)
      setPreview(URL.createObjectURL(selectedImage))
      setUploadedImage(null)
      setMessage('')
    }
  }

  const handleUpload = async () => {
    if (!image) {
      setMessage('Please select an image first!')
      return
    }

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post(
          'http://localhost:5002/api/upload',
          formData
      )

      setUploadedImage(
          `http://localhost:5002${response.data.image.path}`
      )

      setMessage('Image uploaded successfully!')
    } catch (error) {
      setMessage('Image upload failed!')
    }
  }

  return (
      <div className="container">
        <h1>Image Upload App</h1>
        <p>Select, preview and upload your image</p>

        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        />

        {preview && (
            <div>
              <h3>Image Preview</h3>
              <img src={preview} alt="Preview" />
            </div>
        )}

        <button onClick={handleUpload}>
          Upload Image
        </button>

        {message && <p>{message}</p>}

        {uploadedImage && (
            <div>
              <h3>Uploaded Image</h3>
              <img src={uploadedImage} alt="Uploaded" />
            </div>
        )}
      </div>
  )
}

export default App