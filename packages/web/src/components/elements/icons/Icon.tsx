import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconEnum } from './Icons';

export const Icons = IconEnum;

export type IconProps = {
  icon: any;
  hoverColor?: string | null;
  onClick?: any | null;
  size?: string | number | undefined;
  position?: string;
  top?: string | number | undefined;
  left?: string | number | undefined;
  right?: string | number | undefined;
  zIndex?: number | void;
  margin?: string | number | undefined;
  tip?: string;
  transitionDuration?: string;
  rotation?: number;
  active?: boolean | null;
  activeColor?: string | null;
  inactiveColor?: string | null;
};

export default function Icon({
  icon,
  hoverColor = null,
  onClick,
  size,
  top,
  left,
  right,
  position = "relative" as any,
  zIndex,
  margin,
  tip,
  transitionDuration,
  rotation,
  activeColor = "",
  inactiveColor ="",
  active
}: IconProps) {
  const cursor: string = onClick ? "pointer" : "";
  const color = active ? activeColor : inactiveColor;
  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={onClick}
      style={{
        color: "",
        top,
        left,
        right,
        position: position as any,
        zIndex: zIndex as any,
        fontSize: size,
        transition: 'all 0.3s',
        cursor,
        margin
      }}
    />
  );
}
