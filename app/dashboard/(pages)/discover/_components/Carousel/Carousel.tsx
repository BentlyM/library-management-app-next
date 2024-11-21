'use client';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Children,
  cloneElement,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import scrollTo from './scrollHelper';

const Carousel = ({
  children,
  stepSize = 1,
  cardDist = 13,
  navOnTop = true,
}: {
  children: JSX.Element[];
  stepSize?: number;
  cardDist?: number;
  navOnTop?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [visibleChildren, setVisibleChildren] = useState<Set<number>>(
    new Set()
  );
  const [atLeftEdge, setAtLeftEdge] = useState(true);
  const [atRightEdge, setAtRightEdge] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef<number>(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current?.children[0]) {
        cardWidthRef.current = containerRef.current.children[0].clientWidth;
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute('data-index') || '-1'
          );
          if (index === -1) return;

          setVisibleChildren((prev) => {
            const updated = new Set(prev);
            if (entry.isIntersecting) {
              updated.add(index);
            } else {
              updated.delete(index);
            }
            return updated;
          });
        });
      },
      {
        root: containerRef.current,
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const cards = containerRef.current?.querySelectorAll('.card');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCardWidth);
    };
  }, [children]);

  // Function to handle scrolling with proper refs
  const handleScroll = (isForward: boolean) => {
    if (!containerRef.current) return;

    const scrollWidth = stepSize * cardWidthRef.current;
    const scrollTime = Math.min(stepSize * 300, 600);
    const currentScroll = containerRef.current.scrollLeft;
    const newPosition =
      currentScroll + (isForward ? scrollWidth : -scrollWidth);

    scrollTo({
      element: containerRef.current,
      to: newPosition,
      duration: scrollTime,
      scrollDirection: 'scrollLeft',
      callback: checkIfAtEdge,
      context: this,
    });
  };

  const checkIfAtEdge = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;

    setAtLeftEdge(scrollLeft <= 0);
    setAtRightEdge(Math.abs(scrollLeft - maxScroll) < 1);
  };

  const handleGoForward = (e: React.MouseEvent) => {
    e.preventDefault();
    handleScroll(true);
  };

  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    handleScroll(false);
  };

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const wrapCard = (baseCard: React.JSX.Element, index: number) => {
    const isVisible = visibleChildren.has(index);

    return (
      <div
        key={index}
        data-index={index}
        style={{
          paddingRight:
            index === children.length - 1 ? undefined : `${cardDist}px`,
          zIndex: children.length - index,
          minHeight: !isVisible ? 'fit-content' : undefined,
          minWidth: !isVisible ? cardWidthRef.current : undefined,
        }}
        className="card"
      >
        {isVisible ? (
          cloneElement(baseCard, {
            expanded,
            setExpand: toggleExpansion,
          })
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        paddingRight: navOnTop ? '0' : undefined,
        overflow: 'hidden',
        padding: '0 21px',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {navOnTop && (
          <ArrowNavigator
            onLeftClick={handleGoBack}
            onRightClick={handleGoForward}
            atLeftEdge={atLeftEdge}
            atRightEdge={atRightEdge}
          />
        )}
        <div
          style={{
            overflow: 'hidden',
            zIndex: 0,
            width: '100%',
          }}
        >
          <div
            ref={containerRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              flexGrow: 1,
              position: 'relative',
              height: '100%',
              marginBottom: '-20px',
              paddingBottom: '20px',
              zIndex: 1,
            }}
            onScroll={checkIfAtEdge}
          >
            {Children.map(children, (child, index) => wrapCard(child, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowNavigator = ({
  atLeftEdge,
  atRightEdge,
  onLeftClick,
  onRightClick,
}: {
  onRightClick: MouseEventHandler<SVGSVGElement>;
  onLeftClick: MouseEventHandler<SVGSVGElement>;
  atLeftEdge: boolean;
  atRightEdge: boolean;
}) => {
  const baseArrowStyle = {
    cursor: 'pointer',
    padding: 0,
    outline: 'none',
    transition: 'opacity .2s ease-in-out',
    position: 'absolute',
    top: '50%',
    margin: '-12px',
    zIndex: 3,
    border: '1px solid black',
  };

  const leftArrowStyle = {
    ...baseArrowStyle,
    left: 0,
  };

  const rightArrowStyle = {
    ...baseArrowStyle,
    right: 0,
  };

  const buttonStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px 0 #cdced9',
    border: 'solid 1px #ececec',
    padding: '2px',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 2,
        width: '100%',
      }}
    >
      <ArrowBack
        sx={{
          ...leftArrowStyle,
          '& .MuiSvgIcon-root': buttonStyle,
        }}
        onClick={onLeftClick}
        className={`arrow left ${atLeftEdge ? 'hide' : ''}`}
      />
      <ArrowForward
        sx={{
          ...rightArrowStyle,
          '& .MuiSvgIcon-root': buttonStyle,
        }}
        onClick={onRightClick}
        className={`arrow right ${atRightEdge ? 'hide' : ''}`}
      />
    </div>
  );
};

export default Carousel;
