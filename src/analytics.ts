import ReactGA from "react-ga4";

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId) {
    ReactGA.initialize(measurementId);
    console.log("Google Analytics initialized with ID:", measurementId);
  } else {
    console.warn("Google Analytics Measurement ID not found");
  }
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
