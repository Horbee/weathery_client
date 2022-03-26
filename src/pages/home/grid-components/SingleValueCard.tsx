import { motion } from 'framer-motion'

interface SingleValueCardProps {
  className: string;
}

export const SingleValueCard: React.FC<SingleValueCardProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotateX: -180 }}
      animate={{ opacity: [0, 0, 0.5, 1], rotateX: [-180, -90, -30, 0] }}
    >
      {children}
    </motion.div>
  );
};
