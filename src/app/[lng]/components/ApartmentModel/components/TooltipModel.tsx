import { Html } from '@react-three/drei';

import type { ITooltip } from '../interfaces/IApartmentModel';

import styles from '../sass/ApartmentModel.module.scss';

function Tooltip({ position, text, className = '' }: ITooltip) {
  return (
    <Html position={position} center>
      <div className={`${styles.tooltip} ${className ? styles[className] : ''}`}>
        {text}
      </div>
    </Html>
  );
}

export default Tooltip;
