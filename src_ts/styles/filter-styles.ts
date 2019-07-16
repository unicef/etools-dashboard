import '@polymer/polymer/polymer-element';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="filter-styles">
  <template>
    <style>
      .filters-divider {
        height: calc(100% - 16px);
        margin: 0 8px;
        border-left: 2px solid var(--dark-divider-color);
      }
    
      #filterMenu {
        max-width: 126px;
      }
    
      #filterMenu .button {
        color: var(--accent-color);
      }

      #filterMenu .button iron-icon {
        margin-right: 5px;
      }
    
      #filterMenu paper-icon-item {
        --paper-item: {
          cursor: pointer;
        };
        --paper-item-selected: {
          font-weight: normal !important;
        };
      
        --paper-item-focused-before: {
          background: none;
          opacity: 0;
        };
        --paper-item-focused-after: {
          background: none;
          opacity: 0;
        }
      }

      #filterMenu paper-icon-item {
        --paper-item-selected: {
            background-color: rgb(220, 220, 220);
        };
        --paper-item-focused: {
            background-color: rgb(198, 198, 198);
        };   
      }

      etools-dropdown-multi {
        min-width: 160px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
