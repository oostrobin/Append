class FormSubmitter {
  constructor(formSelector, url) {
    this.form = document.querySelector(formSelector);
    this.url = url;
    this.loadingElement = this.form.querySelector('.loading');
    this.errorMessageElement = this.form.querySelector('.error-message');
    this.sentMessageElement = this.form.querySelector('.sent-message');

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.showLoading();

    const formData = new FormData(this.form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          this.showSentMessage();
        } else {
          throw new Error('Failed to send form data');
        }
      })
      .catch(error => {
        this.showError(error.message);
      })
      .finally(() => {
        this.hideLoading();
      });
  }

  showLoading() {
    this.loadingElement.style.display = 'block';
    this.errorMessageElement.style.display = 'none';
    this.sentMessageElement.style.display = 'none';
  }

  showError(message) {
    this.loadingElement.style.display = 'none';
    this.errorMessageElement.textContent = message;
    this.errorMessageElement.style.display = 'block';
    this.sentMessageElement.style.display = 'none';
  }

  showSentMessage() {
    this.loadingElement.style.display = 'none';
    this.errorMessageElement.style.display = 'none';
    this.sentMessageElement.style.display = 'block';
  }

  hideLoading() {
    this.loadingElement.style.display = 'none';
  }
}

const formSubmitter = new FormSubmitter('.php-email-form', 'https://zb-mailserver.adaptable.app/api/v1/send');

