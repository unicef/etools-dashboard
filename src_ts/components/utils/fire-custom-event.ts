export const fireEvent = (el: any, eventName: string, eventDetail?: object | string): void => {
  if (typeof el.dispatchEvent !== 'function') {
    throw new Error('fireEvent: cannot dispatch event, "el" param has no dispatchEvent method');
  }
  el.dispatchEvent(new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    detail: eventDetail
  }));
};
