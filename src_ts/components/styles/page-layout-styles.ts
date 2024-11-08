import {css} from 'lit';
// language=CSS
export const pageLayoutStyles = css`
  .page-content {
    margin: 24px;
  }

  section.page-content:not(.filters) {
    padding: 18px 24px;
  }

  section.page-content.filters {
    padding: 8px 24px;
  }

  section.page-content.no-padding {
    padding: 0;
  }

  @media (max-width: 576px) {
    section.page-content.filters {
      padding: 5px;
    }
    .page-content {
      margin: 5px;
    }
  }
`;
