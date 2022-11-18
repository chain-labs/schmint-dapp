import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

function FadeInReveal({ children, delay }) {
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial="hidden"
			transition={{ duration: 1, delay: `${delay}` }}
			variants={{
				visible: { opacity: 1 },
				hidden: { opacity: 0 },
			}}
		>
			{children}
		</motion.div>
	);
}

export default FadeInReveal;
