import { useRef } from "react";

export function useDragScroll() {
  const scrollRef = useRef(null);
  const state = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  // Mouse events
  const onMouseDown = (e) => {
    state.current.isDown = true;
    state.current.startX = e.pageX - scrollRef.current.offsetLeft;
    state.current.startY = e.pageY - scrollRef.current.offsetTop;
    state.current.scrollLeft = scrollRef.current.scrollLeft;
    state.current.scrollTop = scrollRef.current.scrollTop;
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseLeave = () => {
    state.current.isDown = false;
    scrollRef.current.style.cursor = "grab";
  };
  const onMouseUp = () => {
    state.current.isDown = false;
    scrollRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e) => {
    if (!state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;
    const walkX = x - state.current.startX;
    const walkY = y - state.current.startY;
    scrollRef.current.scrollLeft = state.current.scrollLeft - walkX;
    scrollRef.current.scrollTop = state.current.scrollTop - walkY;
  };

  // Touch events
  const onTouchStart = (e) => {
    state.current.isDown = true;
    state.current.startX = e.touches[0].pageX - scrollRef.current.offsetLeft;
    state.current.startY = e.touches[0].pageY - scrollRef.current.offsetTop;
    state.current.scrollLeft = scrollRef.current.scrollLeft;
    state.current.scrollTop = scrollRef.current.scrollTop;
  };
  const onTouchEnd = () => {
    state.current.isDown = false;
  };
  const onTouchMove = (e) => {
    if (!state.current.isDown) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const y = e.touches[0].pageY - scrollRef.current.offsetTop;
    const walkX = x - state.current.startX;
    const walkY = y - state.current.startY;
    scrollRef.current.scrollLeft = state.current.scrollLeft - walkX;
    scrollRef.current.scrollTop = state.current.scrollTop - walkY;
  };

  return {
    scrollRef,
    eventHandlers: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
    },
  };
}