/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------
(function () {
  const mpl = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';

  const form = document.getElementById('checkout-form');
  const cardProvider = document.getElementById('card-provider');
  const errorsMessages = document.getElementById('errors');
  const numberGroup = document.getElementById('card-number-group');
  const expirationGroup = document.getElementById('card-expiration-group');
  const cvcGroup = document.getElementById('card-cvv-group');
  const firstNameGroup = document.getElementById('first-name-group');
  const lastNameGroup = document.getElementById('last-name-group');
  const emailGroup = document.getElementById('email-group');
  const phoneGroup = document.getElementById('phone-group');
  const socialIdGroup = document.getElementById('social-id-group');
  const successQuery = document.querySelector('.first-example .success');
  const backFormButton = document.querySelector('.back-on-form1')
// -----------------------------------------------------------------------------------------------------------------

  const submitButton = document.getElementById('submit-button');
  submitButton.disabled = true;

  function tokenizationStarted() {
    form.classList.add('fadeOut');
    form.style.display = 'none';
    successQuery.style.display = 'block';
    successQuery.querySelector('.wrap-loading').style.display = 'block';
    successQuery.classList.add('fadeIn');
    submitButton.disabled = true;
    console.log('Tokenization started!');
  }

  function tokenizationFinished() {
    successQuery.querySelector('.wrap-loading').style.display = 'none';
    submitButton.disabled = false;
    console.log('Tokenization finished!');
  }

  const errorsFromField = {};

  function showErrors(errorsFromField, el, ev) {
    let lastElement = errorsFromField[Object.keys(errorsFromField).pop()];
    el.classList.remove('fadeOutDown');
    if (!ev.message) {
      el.innerText = lastElement;
    } else {
      el.innerText = ev.message;
    }
  }

  function toggleValidationMessages(wrapper, ev) {
    if (ev.isValid) {
      wrapper.classList.remove('has-error');
      this.classList.remove('fadeInUp');
      this.classList.add('fadeOutDown');
      delete errorsFromField[ev.field]; // delete error from the object that passed validation

      if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
        showErrors(errorsFromField, this, ev);
        this.classList.remove('fadeOutDown');
        this.classList.add('fadeInUp');
      }
    } else {
      errorsFromField[ev.field] = ev.message; // write errors to the object
      wrapper.classList.add('has-error');
      this.classList.remove('fadeOutDown');
      this.classList.add('fadeInUp');
      if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
        showErrors(errorsFromField, this, ev); // and show its
      }
    }
  }

  function changeCardProviderIcon(cardVendor) {

    const vendorsToClasses = {
      'unknown': ['fas', 'fa-credit-card'],

      'amex': ['fab', 'fa-cc-amex'],
      'diners': ['fab', 'fa-cc-diners-club'],
      'jcb': ['fab', 'fa-cc-jcb'],
      'visa': ['fab', 'fa-cc-visa'],
      'mastercard': ['fab', 'fa-cc-mastercard'],
      'discover': ['fab', 'fa-cc-discover'],
    };

    cardProvider.classList.remove(...cardProvider.classList);
    cardProvider.classList.add(...(vendorsToClasses[cardVendor] ? vendorsToClasses[cardVendor] : vendorsToClasses['unknown']));
  }

  function addClass(fieldId, className) {
    document.getElementById(fieldId).classList.add(className);
  }

  function removeClass(fieldId, className) {
    document.getElementById(fieldId).classList.remove(className);
  }

  function showSuccessQuery(data) {
    successQuery.querySelector('.name').innerHTML = "<span>Name:</span> " + data.payerName;
    successQuery.querySelector('.email').innerHTML = "<span>Email:</span> " + data.payerEmail;
    successQuery.querySelector('.phone').innerHTML = "<span>Phone:</span> " + data.payerPhone;
    successQuery.querySelector('.socialId').innerHTML = "<span>Social Id:</span> " + data.payerSocialId;
    successQuery.querySelector('.token').innerHTML = "<span>Token:</span> " + data.token;
  }

// -----------------------------------------------------------------------------------------------------------------

  const allFieldsReady = [];

  const DEFAULT_SETTINGS = {
    styles: {
      base: {
        'font-size': '16px',
        '::placeholder': {'color': '#ACD7E4'}
      },
      invalid: {
        'color': '#FF0000',
      },
      valid: {
        'color': '#fff',
      },
    }
  };

  function init() {
    PayMe.create(mpl, {
      testMode: true
    }).then((instance) => {

      const fields = instance.hostedFields();

      const cardNumberSettings = {
        ...DEFAULT_SETTINGS,
        placeholder: 'Credit Card Number',
        messages: {
          invalid: 'Bad credit card number',
          required: 'Field "Card Number" is mandatory'
        },
      };

      const firstNameField = {
        ...DEFAULT_SETTINGS,
        placeholder: 'First name',
        messages: {
          invalid: 'Letters only for field "First name"',
          required: 'Field "First name" is mandatory'
        },
      };

      const lastNameField = {
        ...DEFAULT_SETTINGS,
        placeholder: 'Last name',
        messages: {
          invalid: 'Letters only for field "Last name"',
          required: 'Field "Last name" is mandatory'
        },
      };

      const emailField = {
        ...DEFAULT_SETTINGS,
        messages: {
          invalid: 'Invalid Email',
          required: 'Field "Email" is mandatory'
        },
      };

      const phoneField = {
        ...DEFAULT_SETTINGS,
        messages: {
          invalid: 'Invalid Phone',
          required: 'Field "Phone" is mandatory'
        },
      };

      const socialIdField = {
        ...DEFAULT_SETTINGS,
        messages: {
          invalid: 'Invalid Phone',
          required: 'Field "Social Id" is mandatory'
        },
      };
      const cvcField = {
        ...DEFAULT_SETTINGS,
        placeholder: 'CVV',
        messages: {
          invalid: 'Invalid CVV',
          required: 'Field "CVV" is mandatory'
        },
      };
      const expirationField = {
        ...DEFAULT_SETTINGS,
        messages: {
          invalid: 'Invalid Expiration',
          required: 'Field "Expiration" is mandatory'
        },
      };
      const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
      allFieldsReady.push(
        cardNumber.mount('#card-number-container')
      );
      cardNumber.on('card-type-changed', ev => changeCardProviderIcon(ev.cardType));
      cardNumber.on('keyup', toggleValidationMessages.bind(errorsMessages, numberGroup));
      cardNumber.on('keyup', (e) => {
        if (e.isValid) {
          expiration.focus();
        }
        e.isEmpty ? removeClass('card-expiration-group', 'animate-card-option') : addClass('card-expiration-group', 'animate-card-option');
        e.isEmpty ? removeClass('card-cvv-group', 'animate-card-option') : addClass('card-cvv-group', 'animate-card-option');
      });


      const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
      allFieldsReady.push(
        expiration.mount('#card-expiration-container')
      );
      expiration.on('keyup', toggleValidationMessages.bind(errorsMessages, expirationGroup));
      expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages, expirationGroup));
      expiration.on('keyup', (e) => {
        if (e.isValid) {
          cvc.focus();
        }
      });


      const cvc = fields.create(PayMe.fields.CVC, cvcField);
      allFieldsReady.push(
        cvc.mount('#card-cvv-container')
      );
      cvc.on('keyup', toggleValidationMessages.bind(errorsMessages, cvcGroup));
      cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages, cvcGroup));


      const phone = fields.create(PayMe.fields.PHONE, phoneField);
      allFieldsReady.push(
        phone.mount('#phone-container')
      );
      phone.on('keyup', toggleValidationMessages.bind(errorsMessages, phoneGroup));
      phone.on('validity-changed', toggleValidationMessages.bind(errorsMessages, phoneGroup));


      const email = fields.create(PayMe.fields.EMAIL, emailField);
      allFieldsReady.push(
        email.mount('#email-container')
      );
      email.on('keyup', toggleValidationMessages.bind(errorsMessages, emailGroup));
      email.on('validity-changed', toggleValidationMessages.bind(errorsMessages, emailGroup));


      const firstName = fields.create(PayMe.fields.NAME_FIRST, firstNameField);
      allFieldsReady.push(
        firstName.mount('#first-name-container')
      );
      firstName.on('keyup', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
      firstName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, firstNameGroup));


      const lastName = fields.create(PayMe.fields.NAME_LAST, lastNameField);
      allFieldsReady.push(
        lastName.mount('#last-name-container')
      );
      lastName.on('keyup', toggleValidationMessages.bind(errorsMessages, lastNameGroup));
      lastName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, lastNameGroup));


      const socialId = fields.create(PayMe.fields.SOCIAL_ID, socialIdField);
      allFieldsReady.push(
        socialId.mount('#social-id-container')
      );
      socialId.on('keyup', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
      socialId.on('validity-changed', toggleValidationMessages.bind(errorsMessages, socialIdGroup));

      Promise.all(allFieldsReady).then(() => submitButton.disabled = false);

      const formSubmit = ev => {
        ev.preventDefault();

        const sale = {
          // payerFirstName: 'Vladimir',
          // payerLastName: 'kondratiev',
          // payerEmail: 'trahomoto@mailforspam.com',
          // payerPhone: '1231231',

          payerSocialId: '65656',

          total: {
            label: '🚀 Rubber duck',
            amount: {
              currency: 'ILS',
              value: '55.00',
            }
          }
        };

        tokenizationStarted();

        instance.tokenize(sale)
          .then(data => {
            console.log('Tokenization result::: ', data);

            showSuccessQuery(data);

            tokenizationFinished();
          })
          .catch(err => {
            console.error(err);
            alert('Tokenization failed');
            successQuery.style.display = 'none';
            form.style.display = 'block';
            form.classList.remove('fadeOut');
            tokenizationFinished();
          });
      };

      const clickToBackOnForm = () => {
        successQuery.style.display = 'none';

        instance.teardown();

        form.removeEventListener('submit', formSubmit);
        backFormButton.removeEventListener('click', clickToBackOnForm);

        form.classList.remove('fadeOut');
        form.classList.add('fadeIn');
        form.style.display = 'block';
        init();
      };

      form.addEventListener('submit', formSubmit);
      backFormButton.addEventListener('click', clickToBackOnForm);

    });
  }

  init();

})();


