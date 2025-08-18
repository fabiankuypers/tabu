import React, { useState } from 'react';

interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const getVariantStyles = () => {
    if (disabled) {
      return {
        backgroundColor: 'rgb(71 85 105)',
        color: 'rgb(148 163 184)',
        cursor: 'not-allowed',
        opacity: 0.6
      };
    }

    switch (variant) {
      case 'primary':
        return {
          background: isPressed 
            ? 'var(--color-accent-dark)' 
            : isHovered 
              ? 'linear-gradient(135deg, var(--color-accent-light), var(--color-accent-primary))'
              : 'var(--bg-gradient-accent)',
          color: 'var(--color-text-on-accent)',
          boxShadow: isHovered 
            ? 'var(--shadow-accent-lg), 0 0 30px var(--color-accent-glow)' 
            : 'var(--shadow-accent)',
          transform: isPressed 
            ? 'translateY(1px) scale(0.98)' 
            : isHovered 
              ? 'translateY(-2px) scale(1.02)' 
              : 'translateY(0) scale(1)'
        };
      
      case 'secondary':
        return {
          backgroundColor: isPressed 
            ? 'rgba(71, 85, 105, 0.8)' 
            : isHovered 
              ? 'rgba(71, 85, 105, 0.6)' 
              : 'rgba(71, 85, 105, 0.4)',
          color: isHovered ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
          border: `1px solid ${isHovered ? 'var(--color-accent-border)' : 'var(--border-color-muted)'}`,
          transform: isPressed 
            ? 'translateY(1px) scale(0.98)' 
            : isHovered 
              ? 'translateY(-1px) scale(1.01)' 
              : 'translateY(0) scale(1)'
        };
      
      case 'ghost':
        return {
          backgroundColor: isPressed 
            ? 'var(--color-accent-muted)' 
            : isHovered 
              ? 'rgba(212, 175, 55, 0.08)' 
              : 'transparent',
          color: isHovered ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
          transform: isPressed 
            ? 'scale(0.95)' 
            : isHovered 
              ? 'scale(1.05)' 
              : 'scale(1)'
        };
      
      default:
        return {};
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-lg transition-all duration-300 ${sizeClasses[size]} ${className}`}
      style={{
        ...getVariantStyles(),
        ...style,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        fontWeight: '600',
        letterSpacing: '0.025em'
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Shimmer effect */}
      {variant === 'primary' && isHovered && (
        <div
          className="absolute inset-0 -translate-x-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s infinite'
          }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default LuxuryButton;