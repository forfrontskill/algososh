import React from "react";
import { ElementStates } from "../../../types/element-states";
import { Circle, CircleProps } from "../circle/circle";
import { ArrowIcon } from "../icons/arrow-icon";

import styles from './circle-extended.module.css'

type TCircleExtended = { top?: CircleProps, main: CircleProps, bottom?: CircleProps, arrow?: ElementStates }

const CircleExtended: React.FC<TCircleExtended> = ({ top, main, bottom, arrow }) => {
    return (
        <>
            <div className={styles.SmallCircleContainer}>
                {top && <Circle {...top} extraClass={styles.TopCircle} isSmall={true} />}
            </div>
            <div className={styles.CircleExtended}>
                <div className={styles.CircleWirhArrow}>
                    <Circle
                        {...main}
                        extraClass={styles.MainCircle}
                        head={top ? '' : main.head}
                        tail={bottom ? '' : main.tail}
                    />
                    <div className={styles.Arrow}>
                        {arrow && <ArrowIcon fill={arrow === ElementStates.Changing ? '#D252E1' : '#0032FF'} />}
                    </div>
                </div>
                <div className={styles.SmallCircleContainer}>
                    {bottom && <Circle {...bottom} extraClass={styles.BottomCircle} isSmall={true} />}
                </div>
            </div>
        </>

    )
}

export default CircleExtended;


