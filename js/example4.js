/**
 * Created by thoryachev on 22.11.2018.
 */
(function(document, mpl) {

  // Cache DOM Nodes ---------------------------------------------------------------------------------------------------

  const cardProvider = document.getElementById('card-provider4');

  const form = document.getElementById('checkout-form4');
  const submitButton = document.getElementById('submit-button4');
  const openModalButton = document.getElementById('open-payment-modal-button');

  const errorsMessages = document.getElementById('errors4');
  const backFormButton = document.querySelector('.back-on-form4');
  const successQuery = document.querySelector('.fourth-example .success');

  const numberGroup = document.getElementById('card-number-group4');
  const expirationGroup = document.getElementById('card-expiration-group4');
  const cvcGroup = document.getElementById('card-cvv-group4');

  const firstNameInput = document.getElementById('first-name-input4');
  const lastNameInput = document.getElementById('last-name-input4');
  const emailInput = document.getElementById('email-input4');
  const phoneInput = document.getElementById('phone-input4');
  const socialIdInput = document.getElementById('social-id-input4');

  const firstNameGroup = document.getElementById('first-name-group4');
  const lastNameGroup = document.getElementById('last-name-group4');
  const emailGroup = document.getElementById('email-group4');
  const phoneGroup = document.getElementById('phone-group4');
  const socialIdGroup = document.getElementById('social-id-group4');

  // Helpers -----------------------------------------------------------------------------------------------------------

  const errorsFromField = {};

  function tokenizationStarted() {
    form.classList.add('fadeOut');
    form.style.display = 'none';
    successQuery.style.display = 'block';
    successQuery.querySelector('.wrap-loading').style.display = 'block';
    successQuery.classList.add('fadeIn');
    submitButton.disabled = true;
    console.log('Tokenization started!');
  }

  function tokenizationFinished(error) {
    successQuery.querySelector('.wrap-loading').style.display = 'none';
    submitButton.disabled = false;
    console.log('Tokenization finished!');

    if(error) {
      console.error(error);

      const failedValidation = {
        field: PayMe.fields.NONE, isValid: false, message: ''
      };

      // Checking is tokenization processing error
      if(error.type && error.type === 'tokenize-error') {
        // Handle tokenization processing error
        const [ firstErrorMessage ] = Object.values(error.errors);
        failedValidation.message = firstErrorMessage;
      } else {
        // Handle other errors from PayMe
        failedValidation.message = error.message;
      }

      toggleValidationMessages(null, failedValidation);
    } else {
      firstNameInput.value = lastNameInput.value = emailInput.value = phoneInput.value = socialIdInput.value = '';
    }
  }

  function showErrors(validationState) {

    errorsMessages.classList.remove('fadeOutDown');

    if (!validationState.message) {
      errorsMessages.innerText = errorsFromField[Object.keys(errorsFromField).pop()];
    } else {
      errorsMessages.innerText = validationState.message;
    }
  }

  function toggleValidationMessages(wrapper, validationState) {
    if (validationState.isValid) {

      if(wrapper) {
        wrapper.classList.remove('has-error');
      }

      errorsMessages.classList.remove('fadeInUp');
      errorsMessages.classList.add('fadeOutDown');
      delete errorsFromField[validationState.field]; // delete error from the object that passed validation
      if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
        showErrors(validationState);
        errorsMessages.classList.remove('fadeOutDown');
        errorsMessages.classList.add('fadeInUp');
      }
    } else {
      errorsFromField[validationState.field] = validationState.message; // write errors to the object

      if(wrapper) {
        wrapper.classList.add('has-error');
      }

      errorsMessages.classList.remove('fadeOutDown');
      errorsMessages.classList.add('fadeInUp');
      if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
        showErrors(validationState); // and show its
      }
    }
  }

  function runNativeFieldValidator(value, field, messages) {
    const validator = PayMe.validators[field];
    const errors = validator.test(value);
    let message;
    if (errors && errors.required) {
      message = messages.required;
    }
    if (errors && errors.invalid) {
      message = messages.invalid;
    }

    return { isValid: !errors, field: field, message: message };
  }

  function createFieldValidatorHandler(fieldName, messagesObject, fieldWrapper) {
    return function(ev) {
      const inputNode = this;
      const validation = runNativeFieldValidator(ev.target.value, fieldName, messagesObject);

      toggleValidationMessages(fieldWrapper, validation);
    };
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

    for (let i = cardProvider.classList.length - 1; i >= 0; i--) {
      cardProvider.classList.remove(cardProvider.classList[i]);
    }
    let item = vendorsToClasses[cardVendor] || vendorsToClasses['unknown'];
    item.forEach(el => {
      cardProvider.classList.add(el);
    });
  }

  function showSuccessQuery(data) {
    successQuery.querySelector('.name').innerHTML = '<span>Name:</span> ' + data.payerName;
    successQuery.querySelector('.email').innerHTML = '<span>Email:</span> ' + data.payerEmail;
    successQuery.querySelector('.phone').innerHTML = '<span>Phone:</span> ' + data.payerPhone;
    successQuery.querySelector('.socialId').innerHTML = '<span>Social Id:</span> ' + data.payerSocialId;
    successQuery.querySelector('.token').innerHTML = '<span>Token:</span> ' + data.token;
  }

  // Misc --------------------------------------------------------------------------------------------------------------

  const allFieldsReady = [];

  const DEFAULT_SETTINGS = {
    styles: {
      base: {
        'font-size': '16px',
        '::placeholder': { 'color': '#D3DAE2' },
      },
      invalid: {
        'color': '#FF0000',
      },
      valid: {
        'color': '#000',
      },
    },
  };

  // Main --------------------------------------------------------------------------------------------------------------

  function init() {
    // Disable submit button until protected fields initialization
    submitButton.disabled = openModalButton.disabled = true;

    // Getting hosted fields integration manager
    PayMe.create(mpl, { testMode: true, }).then((instance) => {

      const fields = instance.hostedFields();

      // Protected fields ------------------------------------------------------

      // Card Number
      const cardNumberSettings = Object.assign({}, DEFAULT_SETTINGS, {
        placeholder: '1234 1234 1234 1234',
        messages: {
          invalid: 'Bad credit card number',
          required: 'Field "Card Number" is mandatory',
        },
      });
      const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
      allFieldsReady.push(
        cardNumber.mount('#card-number-container4'),
      );
      cardNumber.on('card-type-changed', state => changeCardProviderIcon(state.cardType));
      cardNumber.on('keyup', state => toggleValidationMessages(numberGroup, state));
      cardNumber.on('validity-changed', state => toggleValidationMessages(numberGroup, state));

      // Expiry Date
      const expirationField = Object.assign({}, DEFAULT_SETTINGS, {
        messages: {
          invalid: 'Invalid Expiration',
          required: 'Field "Expiration" is mandatory',
        },
      });
      const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
      allFieldsReady.push(
        expiration.mount('#card-expiration-container4'),
      );
      expiration.on('keyup', state => toggleValidationMessages(expirationGroup, state));
      expiration.on('validity-changed', state => toggleValidationMessages(expirationGroup, state));

      // CVC/CVV
      const cvcField = Object.assign({}, DEFAULT_SETTINGS, {
        placeholder: 'CVC',
        messages: {
          invalid: 'Invalid CVC',
          required: 'Field "CVC" is mandatory'
        },
      });
      const cvc = fields.create(PayMe.fields.CVC, cvcField);
      allFieldsReady.push(
        cvc.mount('#card-cvv-container4'),
      );
      cvc.on('keyup', state => toggleValidationMessages(cvcGroup, state));
      cvc.on('validity-changed', state =>  toggleValidationMessages(cvcGroup, state));

      // Protected fields ------------------------------------------------------

      // First Name
      const firstNameMessages = {
        invalid: 'Letters only for field "First name"', required: 'Field "First name" is mandatory',
      };
      firstNameInput.addEventListener('keyup', createFieldValidatorHandler(PayMe.fields.NAME_FIRST, firstNameMessages, firstNameGroup));

      // Last Name
      const lastNameMessages = {
        invalid: 'Letters only for field "Last name"', required: 'Field "Last name" is mandatory',
      };
      lastNameInput.addEventListener('keyup', createFieldValidatorHandler(PayMe.fields.NAME_LAST, lastNameMessages, lastNameGroup));

      // Email
      const emailMessages = {
        invalid: 'Invalid Email', required: 'Field "Email" is mandatory',
      };
      emailInput.addEventListener('keyup', createFieldValidatorHandler(PayMe.fields.EMAIL, emailMessages, emailGroup));

      // Phone Number
      const phoneMessages = {
        invalid: 'Invalid Phone', required: 'Field "Phone" is mandatory',
      };
      phoneInput.addEventListener('keyup', createFieldValidatorHandler(PayMe.fields.PHONE, phoneMessages, phoneGroup));

      // Social Id
      const socialIdMessages = {
        invalid: 'Invalid Phone', required: 'Field "Social Id" is mandatory',
      };
      socialIdInput.addEventListener('keyup', createFieldValidatorHandler(PayMe.fields.SOCIAL_ID, socialIdMessages, socialIdGroup));

      // Wait for fields initialization ----------------------------------------

      Promise.all(allFieldsReady).then(() => {
        submitButton.disabled = openModalButton.disabled = false
      });

      // Form submission handler -----------------------------------------------

      const formSubmit = ev => {
        ev.preventDefault();

        const sale = {

          payerFirstName: firstNameInput.value,
          payerLastName: lastNameInput.value,
          payerEmail: emailInput.value,
          payerPhone: phoneInput.value,
          payerSocialId: socialIdInput.value,

          total: {
            label: '🚀 Rubber duck',
            amount: {
              currency: 'ILS',
              value: '55.00',
            },
          },
        };


        tokenizationStarted();

        instance.tokenize(sale)
          .then(data => {
            console.log('Tokenization result::: ', data);
            showSuccessQuery(data);
            tokenizationFinished();
          })
          .catch(err => {

            alert('Tokenization failed');

            successQuery.style.display = 'none';
            form.style.display = 'block';
            form.classList.remove('fadeOut');

            tokenizationFinished(err);
          });
      };

      // Return and recreate handler -------------------------------------------

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

})(document, 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V');
