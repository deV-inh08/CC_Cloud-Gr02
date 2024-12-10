import React, {useState, useRef, useId, ElementType} from 'react'
import { useFloating , FloatingPortal, arrow} from '@floating-ui/react'
import { motion, AnimatePresence} from "framer-motion"


interface Props {
    children: React.ReactNode
    renderPopover: React.ReactNode
    className ?: string
    as ?: ElementType
}

const Popover = ({children, className, renderPopover, as: Element="div"}: Props) => {
    const id = useId()
    const [open, setOpen] = useState(false);
    const arrowRef = useRef<HTMLElement>(null);
    const {x, y, refs, strategy, middlewareData} = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [arrow({element : arrowRef})]
    });

    const showPopover = () => {
        setOpen(true)
    };

    const hidePopover = () => {
        setOpen(false)
    };
  return (
            <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                    
                    {children}
                    <FloatingPortal id={id}>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    ref={refs.setFloating}
                                    style={{
                                        position: strategy,
                                        top: y ?? 0,
                                        left: x ?? 0,
                                    }}
                                    initial= {{opacity: 0, transform: "scale(0)"}}
                                    animate={{opacity: 1, transform: "scale(1)"}}
                                    exit={{opacity: 0, transform: "scale(0)"}}
                                    transition={{duration: 0.25}}
                                >
                                    <span ref={arrowRef} className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute z-1 -translate-y-[99%]' style={{
                                        left: middlewareData.arrow?.x ?? "auto",
                                        top: middlewareData.arrow?.y ?? "auto"
                                    }}></span>
                                    {renderPopover}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </FloatingPortal>
            </Element>
  )
}

export default Popover;