import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

function BottomToUp({ children, delay }) {
	const controls = useAnimation();
	const [ref, inView] = useInView();
	const variants = {
		hidden: { opacity: 0, x: 0, y: 50 },
		visible: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: 0 },
	};

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			variants={variants} // Pass the variant object into Framer Motion
			initial="hidden" // Set the initial state to variants.hidden
			animate={controls} // Animated state to variants.enter
			exit="exit" // Exit state (used later) to variants.exit
			transition={{ type: 'linear', delay: `${delay}`, duration: 0.8 }}
		>
			{children}
		</motion.div>
	);
}

export default BottomToUp;
