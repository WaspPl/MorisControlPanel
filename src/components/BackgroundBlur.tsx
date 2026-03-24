import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	onClick: () => void;
};

function BackgroundBlur({ onClick }: Props) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='BackgroundBlur'
				onClick={onClick}
			/>
		</AnimatePresence>
	);
}

export default BackgroundBlur;
