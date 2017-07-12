/**
 * Created by reddy on 2017/6/28.
 */
import './popup.scss';

class Popup {
  constructor(type, options) {
    if (type === 'toast') {
      if (typeof options === 'object') {
        this.message = options.message || '';
        this.timeout = options.timeout || 1000;
        this.position = options.position || 'middle';
      } else {
        this.message = options;
        this.timeout = 1000;
        this.position = 'middle';
      }
    } else if (type === 'alert') {
      if (typeof options === 'object') {
        this.title = options.title || '提示';
        this.message = options.message || '';
        this.okText = options.okText || '确定';
        this.okColor = options.okColor || 'blue';
        this.callback = options.callback || '';
      } else {
        this.message = options;
      }
    }
    this.show(type);
  }

  static toast(options) {
    return new Popup('toast', options);
  }

  static alert(options) {
    return new Popup('alert', options);
  }

  show(type) {
    if (type === 'toast') {
      let wrapperDiv = document.createElement('div');
      wrapperDiv.className = `popup-wrapper ${this.position}`;
      let toastDiv = document.createElement('div');
      toastDiv.className = `toast`;
      toastDiv.innerHTML = this.message;
      wrapperDiv.appendChild(toastDiv);
      document.body.appendChild(wrapperDiv);
      setTimeout(() => {
        wrapperDiv.classList.add('show');
        setTimeout(() => {
          wrapperDiv.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(wrapperDiv);
          }, 400);
        }, this.timeout);
      }, 0);
    } else if (type === 'alert') {
      let wrapperDiv = document.createElement('div');
      wrapperDiv.className = `popup-wrapper mask`;
      let dialogDiv = document.createElement('div');
      dialogDiv.className = 'dialog alert';

      let dialogHeadDiv = document.createElement('div');
      dialogHeadDiv.className = 'dialog-head';
      dialogHeadDiv.innerText = this.title;

      let dialogBodyDiv = document.createElement('div');
      dialogBodyDiv.className = 'dialog-body';
      dialogBodyDiv.innerText = this.message;

      let dialogButtonsDiv = document.createElement('div');
      dialogButtonsDiv.className = 'dialog-buttons';

      let button = document.createElement('button');
      button.className = `button ${this.okColor}`;
      button.innerText = this.okText;
      dialogButtonsDiv.appendChild(button);

      let okClick = () => {
        this.callback && this.callback();
        wrapperDiv.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(wrapperDiv);
          button.removeEventListener('click', okClick);
        }, 400);
      };

      button.addEventListener('click', okClick);

      dialogDiv.appendChild(dialogHeadDiv);
      dialogDiv.appendChild(dialogBodyDiv);
      dialogDiv.appendChild(dialogButtonsDiv);

      wrapperDiv.appendChild(dialogDiv);

      document.body.appendChild(wrapperDiv);
      setTimeout(() => {
        wrapperDiv.classList.add('show');
      }, 100);
    }
  }
}

export default Popup;