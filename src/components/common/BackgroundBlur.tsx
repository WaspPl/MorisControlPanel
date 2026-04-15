import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	active: boolean;
	onClick: () => void;
};

function BackgroundBlur({ active, onClick }: Props) {
	return (
		<AnimatePresence>
			{active && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='background-blur'
					onClick={onClick}
				/>
			)}
		</AnimatePresence>
	);
}

export default BackgroundBlur;
