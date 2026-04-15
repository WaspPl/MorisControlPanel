import { motion } from 'framer-motion';
import BackgroundBlur from '../common/BackgroundBlur';

type Props = {};

function Loading({}: Props) {
	return (
		<motion.div
			className='loader-wrapper'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
		>
			<span className='loader'></span>
			<BackgroundBlur active={true} onClick={() => {}} />
		</motion.div>
	);
}

export default Loading;
