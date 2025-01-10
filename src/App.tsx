import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Download, Loader2, Info, CheckCircle, AlertCircle } from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setSelectedImage(file);
      setProcessedImage(null);
      setError(null);
      setSuccess('Image uploaded successfully!');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate processing for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll just use the original image
      // In production, replace this with actual API call
      setProcessedImage(previewUrl);
      setSuccess('Background removed successfully! (Demo Mode)');
    } catch (err) {
      console.error(err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'removed-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess('Image downloaded successfully!');
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-purple-400">
            Background Remover Pro
          </h1>
          <p className="text-center text-gray-400 mt-2">
            Professional Background Removal Tool (Demo Mode)
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-800/50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
              <CheckCircle className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-400">Remove backgrounds in seconds with our advanced AI technology</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
              <CheckCircle className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Quality</h3>
              <p className="text-gray-400">Get professional-grade results with precise edge detection</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
              <CheckCircle className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-400">Simple drag-and-drop interface for quick image processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-lg text-gray-300">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-200">How to use:</h4>
                <ol className="list-decimal list-inside text-gray-400 mt-2 space-y-1">
                  <li>Upload your image (PNG or JPG format)</li>
                  <li>Click "Remove Background" to process</li>
                  <li>Download your processed image</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Preview and Result Section */}
          {(previewUrl || processedImage) && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-200">
                  <ImageIcon className="w-5 h-5 mr-2 text-purple-400" />
                  Original Image
                </h2>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-900">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Processed Image */}
              <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-200">
                  <ImageIcon className="w-5 h-5 mr-2 text-purple-400" />
                  Processed Image
                </h2>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-900">
                  {processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {isLoading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                          <p className="mt-4">Processing your image...</p>
                        </div>
                      ) : (
                        <p>Processed image will appear here</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {selectedImage && !isLoading && (
              <button
                onClick={removeBackground}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  'Remove Background'
                )}
              </button>
            )}
            {processedImage && (
              <button
                onClick={downloadImage}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Result
              </button>
            )}
          </div>

          {/* Status Messages */}
          {success && (
            <div className="mt-4 p-4 bg-green-900/50 text-green-400 rounded-lg border border-green-700 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {success}
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 text-red-400 rounded-lg border border-red-700 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Created with ❤️ by <span className="text-purple-400 font-semibold">Rafly Azwar</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © {new Date().getFullYear()} Background Remover Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;