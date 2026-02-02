import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollSpyOptions {
  activationPointRatio?: number;
}

export const useScrollSpy = (
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) => {
  const { activationPointRatio = 0.6 } = options;
  const [activeId, setActiveId] = useState("");
  const isScrollingProgrammatically = useRef(false);

  const scrollToId = useCallback((id: string) => {
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      isScrollingProgrammatically.current = true;
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const updateActiveSection = useCallback(() => {
    if (isScrollingProgrammatically.current) return;

    const activationPoint = window.innerHeight * activationPointRatio;
    let currentId: string | null = null;

    for (let i = 0; i < sectionIds.length; i++) {
      const id = sectionIds[i];
      if (!id) continue;

      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const nextId = sectionIds[i + 1];
      const nextRect = nextId
        ? document.getElementById(nextId)?.getBoundingClientRect()
        : null;

      if (
        rect.top <= activationPoint &&
        (!nextRect || nextRect.top > activationPoint)
      ) {
        currentId = id;
        break;
      }
    }

    if (currentId && currentId !== activeId) {
      setActiveId(currentId);
    }
  }, [sectionIds, activationPointRatio, activeId]);

  useEffect(() => {
    const handleScroll = () => {
      updateActiveSection();
    };

    const handleScrollEnd = () => {
      isScrollingProgrammatically.current = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [updateActiveSection]);

  useEffect(() => {
    updateActiveSection();
  }, [updateActiveSection]);

  return { activeId, scrollToId };
};
