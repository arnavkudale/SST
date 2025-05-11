import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Convert image URL to WebP format if using Cloudinary
  const getWebPUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  // Generate srcset for responsive images
  const generateSrcSet = (url: string) => {
    if (!url.includes('cloudinary.com')) return url;
    
    const sizes = [320, 640, 960, 1280, 1920];
    return sizes
      .map(size => `${url.replace('/upload/', `/upload/w_${size},c_scale/`)} ${size}w`)
      .join(', ');
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        !isLoaded && 'animate-pulse bg-gray-200',
        className
      )}
      style={{ width, height }}
    >
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Image failed to load</span>
        </div>
      ) : (
        <img
          src={getWebPUrl(src)}
          srcSet={generateSrcSet(src)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 