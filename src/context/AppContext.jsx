import { createContext, useContext, useEffect, useState } from 'react';

const AppStateContext = createContext();

function extractOnlyValueFromPixelValue(pixelValue) {
  pixelValue ??= 0;

  if (pixelValue === 0) return 0;

  return parseFloat(pixelValue.slice(0, -2));
}

const AppStateContextComponent = ({ children }) => {
  const [valuesBasedOnDeviceDimensions, setValuesBasedOnDeviceDimensions] =
    useState(() => ({
      isMobileView: false,
      rootFontSize: 16,
    }));

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const alterStateBasedOnDeviceDimensions = () => {
      const htmlStyles = getComputedStyle(document.body.parentNode);

      setValuesBasedOnDeviceDimensions((prev) => ({
        ...prev,
        isMobileView: window.innerWidth < 768,
        rootFontSize: extractOnlyValueFromPixelValue(htmlStyles.fontSize),
      }));
    };

    alterStateBasedOnDeviceDimensions();

    window.addEventListener('resize', alterStateBasedOnDeviceDimensions);
    return () => {
      window.removeEventListener('resize', alterStateBasedOnDeviceDimensions);
    };
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        isMobileView: valuesBasedOnDeviceDimensions.isMobileView,
        rootFontSize: valuesBasedOnDeviceDimensions.rootFontSize,

        currentPageIndex,
        setCurrentPageIndex,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const getAppStateContext = function () {
  return useContext(AppStateContext);
};

export default AppStateContextComponent;
