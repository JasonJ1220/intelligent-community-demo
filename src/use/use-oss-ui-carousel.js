import { useCallback, useMemo } from 'react';

// 抽象走马灯actions
function useOssUiCarouselActions(carouselRef) {
    const carouselPauseHandle = useCallback(() => {
        carouselRef.current?.innerSlider?.pause('pause');
    }, [carouselRef]);
    const carouselPlayHandle = useCallback(() => {
        carouselRef.current?.autoPlay();
    }, [carouselRef]);
    const carouseGoto = useCallback(
        (slideNumber, dotAnimate) => {
            carouselRef.current?.goTo(slideNumber, dotAnimate);
        },
        [carouselRef]
    );

    const actions = useMemo(() => {
        return {
            pause: carouselPauseHandle,
            play: carouselPlayHandle,
            goTo: carouseGoto,
        };
    }, [carouseGoto, carouselPauseHandle, carouselPlayHandle]);

    return actions;
}

export { useOssUiCarouselActions };
