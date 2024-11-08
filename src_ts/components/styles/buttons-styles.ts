import {css} from 'lit';

// language=HTML
export const buttonsStyles = css`
  etools-button.default,
  etools-button.primary,
  etools-button.info,
  etools-button.success,
  etools-button.error {
    padding: 6px 8px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  etools-button.default.left-icon,
  etools-button.primary.left-icon,
  etools-button.info.left-icon,
  etools-button.success.left-icon,
  etools-button.error.left-icon {
    padding-inline-end: 12px;
  }

  etools-button.default.right-icon,
  etools-button.primary.right-icon,
  etools-button.info.right-icon,
  etools-button.success.right-icon,
  etools-button.error.right-icon {
    padding-inline-start: 12px;
  }

  etools-button.default.left-icon etools-icon,
  etools-button.primary.left-icon etools-icon,
  etools-button.success.left-icon etools-icon,
  etools-button.error.left-icon etools-icon {
    margin-inline-end: 10px;
  }

  etools-button.info.left-icon etools-icon {
    margin-inline-end: 4px;
  }

  etools-button.default.right-icon etools-icon,
  etools-button.primary.right-icon etools-icon,
  etools-button.info.right-icon etools-icon,
  etools-button.success.right-icon etools-icon,
  etools-button.error.right-icon etools-icon {
    margin-inline-start: 10px;
  }

  etools-button.default {
    color: var(--default-btn-color, #ffffff);
    background-color: var(--default-btn-bg-color, rgba(0, 0, 0, 0.45));
  }

  etools-button.primary {
    color: var(--primary-btn-color, #ffffff);
    background-color: var(--primary-btn-bg-color, var(--primary-color));
  }

  etools-button.info {
    color: var(--primary-color, #0099ff);
    align-self: center;
  }

  etools-button.success {
    color: var(--success-btn-color, #ffffff);
    background-color: var(--success-btn-bg-color, var(--success-color));
  }

  etools-button.error {
    color: var(--error-btn-color, #ffffff);
    background-color: var(--error-btn-bg-color, var(--error-color));
  }
`;
