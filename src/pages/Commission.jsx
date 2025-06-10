import { Link } from 'react-router-dom';
import { useState } from "react";
import emailjs from 'emailjs-com';



const Commission = () => {
  const [submitting, setSubmitting] = useState(false);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [errors, setErrors] = useState({
  image: '',
});


  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    sketchType: '',
    size: '',
    framing: false,
    courier: false,
    distance: '',
    image: null,
    imagePreview: null,
    imageUrl: '', // This is the final Cloudinary URL to send in EmailJS
    specialRequests: ''
  });
  

  const [estimatedCost, setEstimatedCost] = useState(0);

  const sketchTypes = [
    { id: 'single', name: 'Single Portrait', price: 800, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop' },
    { id: 'double', name: 'Double Portrait', price: 1500, image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&h=200&fit=crop' },
    { id: 'wedding', name: 'Wedding Sketch', price: 2000, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop' },
    { id: 'family', name: 'Family Portrait', price: 2500, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop' },
    { id: 'other', name: 'Custom Commission', price: 0, image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop' }
  ];

  const sizeOptions = [
    { id: 'a4', name: 'A4 (8.3 x 11.7 inches)', multiplier: 1 },
    { id: 'a3', name: 'A3 (11.7 x 16.5 inches)', multiplier: 1.5 },
    { id: 'custom', name: 'Custom Size', multiplier: 1.2 }
  ];

  const calculateCost = (data = formData) => {
    const selectedType = sketchTypes.find(type => type.id === data.sketchType);
    const selectedSize = sizeOptions.find(size => size.id === data.size);
    
    if (!selectedType || !selectedSize) return 0;
    
    let baseCost = selectedType.price * selectedSize.multiplier;
    
    if (data.framing) baseCost += 400;
    if (data.courier) {
      const distance = parseInt(data.distance) || 0;
      baseCost += Math.max(150, distance * 5);
    }
    
    return Math.round(baseCost);
  };

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setEstimatedCost(calculateCost(newData));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: "File size exceeds 10MB limit",
        }));
        return;
      }
  
      // Check file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: "Only JPEG and PNG files are allowed",
        }));
        return;
      }
  
      try {
        // Upload to Cloudinary
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', file);
        formDataCloudinary.append('upload_preset', 'unsigned_upload');
        formDataCloudinary.append('cloud_name', 'dk8dr8v2r');
  
        const response = await fetch(`https://api.cloudinary.com/v1_1/dk8dr8v2r/image/upload`, {
          method: 'POST',
          body: formDataCloudinary,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
  
        const data = await response.json();
  
        // Set state with Cloudinary URL
        const reader = new FileReader();
        reader.onload = () => {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result,
            imageUrl: data.secure_url,
          }));
        };
        reader.readAsDataURL(file);
  
        setErrors(prev => ({
          ...prev,
          image: '',
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrors(prev => ({
          ...prev,
          image: "Failed to upload image. Please try again.",
        }));
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      const selectedSketchType = sketchTypes.find(type => type.id === formData.sketchType);
      const selectedSize = sizeOptions.find(size => size.id === formData.size);
  
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        sketchType: selectedSketchType?.name || 'N/A',
        size: selectedSize?.name || 'N/A',
        frame: formData.framing ? 'Yes' : 'No',
        courier: formData.courier ? 'Yes' : 'No',
        distance: formData.distance || '0',
        notes: formData.specialRequests || 'None',
        totalCost: `₹${estimatedCost}`,
        imageUrl: formData.imageUrl || 'No image uploaded',
      };
  
      console.log('Sending email with params:', templateParams);
  
      const response = await emailjs.send(
        'service_xqnh8hy',
        'template_x6c242q',
        templateParams,
        'GHAseR6OhmUrNUn3l'
      );
  
      console.log('Email sent successfully:', response);
      setSnackbarOpen(true);
  
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          sketchType: '',
          size: '',
          framing: false,
          courier: false,
          distance: '',
          uploadedFile: null,
          specialRequests: ''
        });
        setCurrentStep(1);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  



  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content fade-in">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Complete Address *</label>
              <textarea
                className="form-textarea"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                rows="3"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content fade-in">
            <h3>Choose Sketch Type</h3>
            <div className="sketch-types-grid">
              {sketchTypes.map((type) => (
                <div
                  key={type.id}
                  className={`sketch-type-card ${formData.sketchType === type.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('sketchType', type.id)}
                >
                  <img src={type.image} alt={type.name} />
                  <h4>{type.name}</h4>
                  <p className="price">
                    {type.price > 0 ? `₹${type.price}` : 'Quote on Request'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content fade-in">
            <h3>Select Size</h3>
            <div className="size-options-grid">
              {sizeOptions.map((size) => (
                <div
                  key={size.id}
                  className={`size-option-card ${formData.size === size.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('size', size.id)}
                >
                  <h4>{size.name}</h4>
                  <p className="multiplier">
                    {size.multiplier === 1 ? 'Base Price' : `${Math.round((size.multiplier - 1) * 100)}% additional`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content fade-in">
            <h3>Framing & Delivery Options</h3>
            <div className="options-grid">
              <div className="option-card">
                <div className="option-header">
                  <h4>Professional Framing</h4>
                  <div className="option-toggle">
                    <input
                      type="checkbox"
                      id="framing"
                      checked={formData.framing}
                      onChange={(e) => handleInputChange('framing', e.target.checked)}
                    />
                    <label htmlFor="framing">₹400</label>
                  </div>
                </div>
                <p>High-quality wooden frame with glass protection</p>
              </div>

              <div className="option-card">
                <div className="option-header">
                  <h4>Courier Delivery</h4>
                  <div className="option-toggle">
                    <input
                      type="checkbox"
                      id="courier"
                      checked={formData.courier}
                      onChange={(e) => handleInputChange('courier', e.target.checked)}
                    />
                    <label htmlFor="courier">From ₹150</label>
                  </div>
                </div>
                <p>Secure delivery to your doorstep</p>
                {formData.courier && (
                  <div className="form-group">
                    <label className="form-label">Distance from Mumbai (km)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.distance}
                      onChange={(e) => handleInputChange('distance', e.target.value)}
                      placeholder="Enter approximate distance"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

        case 5:
          return (
            <div className="step-content fade-in">
              <h3>Upload Reference Image</h3>
              <div className="upload-section">
                <div className="upload-area">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="imageUpload" className="upload-label">
                    {formData.imagePreview ? (
                      <>
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover rounded"
                        />
                        <p className="text-sm mt-2">Click to replace</p>
                      </>
                    ) : (
                      <div className="upload-placeholder">
                        <p>📤 Click to upload image</p>
                        <p>Max size: 10MB | Formats: JPEG, PNG</p>
                      </div>
                    )}
                  </label>
                  {errors.image && <p className="text-red-500 mt-1">{errors.image}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Special Requests (Optional)</label>
                  <textarea
                    className="form-textarea"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Any special instructions, style preferences, or details you'd like to highlight..."
                    rows="4"
                  />
                </div>
              </div>
            </div>
          );
        

          case 6:
            return (
              <div className="step-content fade-in">
                <h3>Order Summary</h3>
                <div className="summary-card">
                  <div className="summary-section">
                    <h4>Personal Details</h4>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                  </div>
                  
                  <div className="summary-section">
                    <h4>Order Details</h4>
                    <p><strong>Sketch Type:</strong> {sketchTypes.find(t => t.id === formData.sketchType)?.name}</p>
                    <p><strong>Size:</strong> {sizeOptions.find(s => s.id === formData.size)?.name}</p>
                    {formData.framing && <p><strong>Framing:</strong> Yes (+₹400)</p>}
                    {formData.courier && <p><strong>Delivery:</strong> Yes (₹{Math.max(150, (parseInt(formData.distance) || 0) * 5)})</p>}
                  </div>
          
                  {/* 🔽 Image Preview Section */}
                  {formData.imagePreview && (
                    <div className="summary-section">
                      <h4>Reference Image</h4>
                      <img
                        src={formData.imagePreview}
                        alt="Reference Preview"
                        className="mt-2 w-32 h-32 object-cover rounded"
                      />
                      {formData.imageUrl && (
                        <p className="text-sm mt-1">
                          <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer">
                            View Full Image ↗
                          </a>
                        </p>
                      )}
                    </div>
                  )}
          
                  <div className="summary-total">
                    <h4>Estimated Total: ₹{estimatedCost}</h4>
                  </div>
          
                  <button onClick={handleSubmit} className="btn btn-primary submit-btn">
                    Submit Commission Request
                  </button>
                </div>
              </div>
            );
          

      default:
        return null;
    }
  };

  return (
    <div className="commission-page">
        {submitting && <p>Submitting your request...</p>}
{snackbarOpen && (
  <div className="snackbar success" onClick={handleSnackbarClose}>
    ✅ Your commission request has been submitted!
  </div>
)}
      <div className="container">
        <div className="commission-header">
          <h1 className="fade-in-up">Commission Your Sketch</h1>
          <p className="fade-in-up">Let's create something beautiful together</p>
        </div>

        <div className="commission-layout">
          {/* Form Section */}
          <div className="form-section">
            {/* Progress Bar */}
            <div className="progress-bar">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                >
                  <div className="step-circle">{step}</div>
                  <div className="step-label">
                    {step === 1 && 'Info'}
                    {step === 2 && 'Type'}
                    {step === 3 && 'Size'}
                    {step === 4 && 'Options'}
                    {step === 5 && 'Upload'}
                    {step === 6 && 'Review'}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <form className="commission-form">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="btn btn-secondary">
                    Previous
                  </button>
                )}
                {currentStep < 6 && (
                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className="btn btn-primary"
                    disabled={
                      (currentStep === 1 && (!formData.name || !formData.email || !formData.phone || !formData.address)) ||
                      (currentStep === 2 && !formData.sketchType) ||
                      (currentStep === 3 && !formData.size) ||
                      (currentStep === 5 && !formData.imageUrl)
                    }
                    
                  >
                    Next Step
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Live Preview Section */}
          <div className="preview-section">
            <div className="preview-card">
              <h3>Live Preview</h3>
              
              {/* Sketch Visualization */}
              <div className="sketch-preview">
                <div className="preview-frame">
                  {formData.sketchType && (
                    <img 
                      src={sketchTypes.find(t => t.id === formData.sketchType)?.image}
                      alt="Preview"
                      className="preview-image"
                    />
                  )}
                  {formData.framing && <div className="frame-overlay"></div>}
                </div>
                
                <div className="preview-details">
                  {formData.sketchType && (
                    <p><strong>Type:</strong> {sketchTypes.find(t => t.id === formData.sketchType)?.name}</p>
                  )}
                  {formData.size && (
                    <p><strong>Size:</strong> {sizeOptions.find(s => s.id === formData.size)?.name}</p>
                  )}
                  {formData.framing && <p><strong>Framing:</strong> Included</p>}
                  {formData.courier && <p><strong>Delivery:</strong> Courier</p>}
                </div>
              </div>

              {formData.imagePreview && (
  <div className="preview-uploaded-image mt-2">
    <p><strong>Reference:</strong></p>
    <img
      src={formData.imagePreview}
      alt="Uploaded Reference"
      className="w-24 h-24 object-cover rounded mt-1"
    />
  </div>
)}

              {/* Cost Breakdown */}
              <div className="cost-breakdown">
                <h4>Cost Breakdown</h4>
                {formData.sketchType && formData.size && (
                  <>
                    <div className="cost-line">
                      <span>Base Cost:</span>
                      <span>₹{(sketchTypes.find(t => t.id === formData.sketchType)?.price || 0) * (sizeOptions.find(s => s.id === formData.size)?.multiplier || 1)}</span>
                    </div>
                    {formData.framing && (
                      <div className="cost-line">
                        <span>Framing:</span>
                        <span>₹400</span>
                      </div>
                    )}
                    {formData.courier && (
                      <div className="cost-line">
                        <span>Delivery:</span>
                        <span>₹{Math.max(150, (parseInt(formData.distance) || 0) * 5)}</span>
                      </div>
                    )}
                    <div className="cost-total">
                      <span>Total:</span>
                      <span>₹{estimatedCost}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
       .commission-page > p {
  text-align: center;
  font-weight: bold;
  color: #333;
}

/* No changes needed in position */
.snackbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #4BB543;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
  cursor: pointer;
}

/* Optional: style for the text "Submitting..." */
.submitting-msg {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
  z-index: 9999;
}



        .commission-page {
          padding-top: 100px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .commission-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .commission-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .commission-header p {
          font-size: 1.2rem;
          color: #5a6c7d;
        }

        .commission-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .form-section {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .progress-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
          position: relative;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e1e8ed;
          z-index: 1;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e1e8ed;
          color: #5a6c7d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-circle {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .step-label {
          font-size: 0.8rem;
          color: #5a6c7d;
          font-weight: 500;
        }

        .progress-step.active .step-label {
          color: #667eea;
          font-weight: 600;
        }

        .step-content {
          min-height: 400px;
        }

        .step-content h3 {
          margin-bottom: 2rem;
          color: #34495e;
          font-size: 1.8rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .sketch-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .sketch-type-card {
          border: 2px solid #e1e8ed;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .sketch-type-card:hover {
          border-color: #667eea;
          transform: translateY(-5px);
        }

        .sketch-type-card.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
        }

        .sketch-type-card img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .sketch-type-card h4 {
          margin-bottom: 0.5rem;
          color: #34495e;
        }

        .sketch-type-card .price {
          font-weight: 700;
          color: #667eea;
          margin: 0;
        }

        .size-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .size-option-card {
          border: 2px solid #e1e8ed;
          border-radius: 15px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .size-option-card:hover,
        .size-option-card.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
        }

        .size-option-card h4 {
          margin-bottom: 1rem;
          color: #34495e;
        }

        .multiplier {
          color: #667eea;
          font-weight: 600;
          margin: 0;
        }

        .options-grid {
          display: grid;
          gap: 2rem;
        }

        .option-card {
          border: 2px solid #e1e8ed;
          border-radius: 15px;
          padding: 2rem;
          background: white;
        }

        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .option-header h4 {
          margin: 0;
          color: #34495e;
        }

        .option-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .option-toggle input[type="checkbox"] {
          width: 20px;
          height: 20px;
        }

        .option-toggle label {
          font-weight: 600;
          color: #667eea;
        }

        .upload-section {
          max-width: 500px;
          margin: 0 auto;
        }

        .upload-area {
          margin-bottom: 2rem;
        }

        .upload-label {
          display: block;
          border: 2px dashed #667eea;
          border-radius: 15px;
          padding: 3rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .upload-label:hover {
          background: #667eea10;
          border-color: #764ba2;
        }

        .upload-placeholder,
        .uploaded-file {
          color: #5a6c7d;
        }

        .uploaded-file {
          color: #667eea;
        }

        .summary-card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .summary-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e1e8ed;
        }

        .summary-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
        }

        .summary-section h4 {
          margin-bottom: 1rem;
          color: #34495e;
        }

        .summary-section p {
          margin-bottom: 0.5rem;
          color: #5a6c7d;
        }

        .summary-total {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 2rem;
        }

        .summary-total h4 {
          margin: 0;
          color: white;
          font-size: 1.5rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e1e8ed;
        }

        .preview-section {
          position: sticky;
          top: 120px;
        }

        .preview-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .preview-card h3 {
          margin-bottom: 2rem;
          color: #34495e;
          text-align: center;
        }

        .sketch-preview {
          margin-bottom: 2rem;
        }

        .preview-frame {
          position: relative;
          background: #f8f9fa;
          border-radius: 10px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .frame-overlay {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 10px solid #8b4513;
          border-radius: 20px;
          pointer-events: none;
        }

        .preview-details {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 10px;
        }

        .preview-details p {
          margin-bottom: 0.5rem;
          color: #5a6c7d;
          font-size: 0.9rem;
        }

        .cost-breakdown {
          border-top: 1px solid #e1e8ed;
          padding-top: 2rem;
        }

        .cost-breakdown h4 {
          margin-bottom: 1rem;
          color: #34495e;
        }

        .cost-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: #5a6c7d;
        }

        .cost-total {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 1.2rem;
          color: #34495e;
          padding-top: 1rem;
          border-top: 1px solid #e1e8ed;
          margin-top: 1rem;
        }

        @media (max-width: 1024px) {
          .commission-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .preview-section {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .commission-page {
            padding-top: 80px;
          }

          .commission-header h1 {
            font-size: 2.5rem;
          }

          .form-section {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .sketch-types-grid {
            grid-template-columns: 1fr;
          }

          .progress-bar {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .step-circle {
            width: 30px;
            height: 30px;
            font-size: 0.8rem;
          }

          .step-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Commission;
