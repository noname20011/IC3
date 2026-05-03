import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface PopUpProps {
  showPopup: boolean;
  setShowPopup: (popup: boolean) => void;
  children?: React.ReactNode;
}

const PopUp = ({ showPopup, setShowPopup, children }: PopUpProps) => {
  return (
    <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm -top-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-md p-8 relative z-10 space-y-2 md:space-y-6 -mt-[120px] md:-mt-[112px]"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  )
}

export default PopUp